import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
const Logout = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const handleLogout = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .post("http://fiterbarber.api/api/auth/logout")
            .then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('expires_in');
                history.push('/');
            })
            .catch(error => {
                // if (error.status === 401) {
                //     console.log('Berhasil Logout');
                // }
                // localStorage.removeItem('token');
                // localStorage.removeItem('expires_in');
                // history.push('/');
            });
    }
    useEffect(() => {
        handleLogout();
    }, [])
    return (
        <div>
            <img src="../images/loading1.gif" className="img img-fluid" />
        </div>
    )
}

export default Logout
