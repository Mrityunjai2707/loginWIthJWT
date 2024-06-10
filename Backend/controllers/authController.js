const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const Tour = require('../Models/toursModels');
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
const createSendToken=(user,statusCode,res)=>{
    const cookiesOption={
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true,
        secure:true
    }
    if(process.env.NODE_ENV==='production') cookiesOption.secure=true;
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    res.cookies('jwt',token,cookiesOption)
    user.password=undefined;
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })

}
exports.sigUp = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt,
            role: req.body.role
        });
                
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    } catch (errors) {
        res.status(400).send(
            {
                success: false,
                msg: errors
            });
    }

}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            })
        }
        const user = await User.findOne({ email: email }).select('+password');
        const correct = await user.correctPassword(password, user.password)
        if (!user||!correct) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        })

    } catch (error) {
        console.log(error)
    }
}
exports.protect = catchAsync(async (req, res, next) => {0
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in'
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token does no longer exist'
            });
        }
        req.user = currentUser;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token'
        });
    }
});
exports.getAllTours = async (req, res) => {
    try { 
        // EXECUTE QUERY
        const tours = await Tour.find(); 
  
        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: tours
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message 
        });
    }
}

