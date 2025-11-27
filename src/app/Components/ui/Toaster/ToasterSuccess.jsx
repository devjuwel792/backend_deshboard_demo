'use client'
import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import ToasterButton from './ToasterButton';

const ToasterSuccess = ({ onClick }) => {

    const handleClick = () => {
        {
            toast.info('Wow so easy !', {
                theme: "dark"
            })
            toast.error('Wow so easy !');
            toast.success('Wow so easy !', {
                theme: "dark"
            })
            toast.warning("Lorem ipsum dolor", {
                theme: "dark"
            })
        };
    };


    return (
        <div>
            <ToasterButton onClick={handleClick} title="SUCCESS" />
            <ToastContainer
                // theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                position="top-right"
                autoClose={50000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
            />
        </div>
    );
};

export default ToasterSuccess;