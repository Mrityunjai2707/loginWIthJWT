import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './index.css';
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import axiosInstance from './api';
const AllTours = () => {
    const location = useLocation();
    const defaultUsername = "guest";
    console.log(location.state)
    const username = location.state ? location.state.username : defaultUsername;
    const navigate = useNavigate()
    const [tours, setTours] = useState([]);
    const [totalRecords, settotalRecord] = useState('')
    useEffect(() => {
        fetchTours();
    }, []);
    const fetchTours = async () => {
        try {
            const response = await axiosInstance.get('/users/alltours');
            setTours(response.data.data);
            console.log(response)
            settotalRecord(response.data.results)
            console.log(totalRecords)

        } catch (error) {
            console.error(error.response.data.message);
            toast.warning(error.response.data.message)
        }
    }
    const details = async (id) => {
        navigate(`/details/${id}`, { state: { username } });
    }
    const deleteData = async (id) => {

        try {
            const data = await axiosInstance.delete(`/tours/${id}`);
            fetchTours();
        } catch (error) {
            toast.warning(error.response.data.message);
        }
    };
    const handlefilter = async (event) => {
        try {
            const filter = event.target.value
            if (filter === 'all') {
                const data = await axiosInstance.get('/tours');
                setTours(data.data.data)
            }
            else {
                const filterData = await axiosInstance.get(`/tours/?difficulty=${filter}`)
                setTours(filterData.data.data)
            }
        } catch (error) {

        }
    };
    const del = async (id) => {
        try {
            const data = await axiosInstance.delete(`/tours/${id}`);
            console.log(data)
        } catch (error) {
            console.log(error)

        }

    }
    return (
        <>
            <PrimeReactProvider value={{ unstyled: false }}>
                {
                    (username === '!guest' && <Navbar userName={username} />)
                }
                <div className='container filter'>
                    {/* <label htmlFor="difficulty">Filter:</label>
                    <select className='select' id="difficulty" onChange={handlefilter}>
                        <option defaultChecked value="all">All</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="difficult">Difficult</option>
                    </select> */}
                </div>
                <div className='container hero'>
                    <div className="row">
                        {tours.map((data, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card">
                                    <div className="card__header">
                                        <div className="card__picture">
                                            <div className="card__picture-overlay">&nbsp;</div>
                                            <img
                                                src={`./src/assets/${data.imageCover}`}

                                                alt="Tour 1"
                                                className="card__picture-img"
                                            />
                                        </div>
                                        <h3 className="heading-tertirary">
                                            <span>{data.name}</span>
                                        </h3>
                                    </div>
                                    <div className="card__details">
                                        <h4 className="card__sub-heading">{data.difficulty} {data.duration}-day tour</h4>
                                        <p className="card__text">
                                            {data.summary}
                                        </p>
                                        <div className="card__data">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                            </svg>
                                            <span>{data.startLocation.description}</span>
                                        </div>
                                        <div className="card__data">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                            </svg>
                                            <span>10 July 2024</span>
                                        </div>
                                        <div className="card__data">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-flag" viewBox="0 0 16 16">
                                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z" />
                                            </svg>
                                            <span>{data.duration} stops</span>
                                        </div>
                                        <div className="card__data">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                            </svg>
                                            <span>{data.maxGroupSize} people</span>
                                        </div>
                                    </div>
                                    <div className="card__footer">
                                        <p>
                                            <span className="card__footer-value me-2">$ {data.price}</span>
                                            <span className="card__footer-text">per person</span>
                                        </p>
                                        <p className="card__ratings">
                                            <svg className='rating bi bi-star me-2 mb-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                            </svg>
                                            <span className="card__footer-value me-2">{data.ratingAverage}</span>
                                            <span className="card__footer-text ">rating({data.ratingQuantity})</span>
                                        </p>
                                        <button type='button' className="btn btn--green btn--small" onClick={() => details(data._id)} >Details</button>
                                        {/* <i className="fa-solid fa-trash" onClick={() => del(data._id)}></i> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="pagecard">
                    <Paginator className='page' first={page} rows={limit} totalRecords={totalRecords} rowsPerPageOptions={[3, 6, 9]} onPageChange={onPageChange} />
                </div> */}

            </PrimeReactProvider>
        </>
    );
}

export default AllTours;
