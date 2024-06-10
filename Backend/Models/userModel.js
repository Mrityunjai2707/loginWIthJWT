const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name should be required'],
        trim: true,
        maxlength: [40, 'Name should be less than 40 characters'],
        minlength: [5, 'Name should be more than 5 characters'],
        validate: {
            validator: function (value) {
                return validator.isAlpha(value, 'en-US', { ignore: ' ' });
            },
            message: 'Name must contain only alphabets'
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, 'Email already exists'],
        required: [true, 'Email address is required'],
        validate: [validator.isEmail, 'Please fill a valid email address'],
    },
    photo: {
        type: String

    },
    active:{
        type: Boolean,
        default: true,
        select:false
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please Enter the Password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});
userSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
})
userSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}})
    next();
})

userSchema.methods.correctPassword = async function (candidatePass, userPassword) {
    return await bcrypt.compare(candidatePass, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    } else {
        return false;
    }
};
userSchema.methods.createPasswordToken =  function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;

}

const User = mongoose.model('User', userSchema);

module.exports = User;
