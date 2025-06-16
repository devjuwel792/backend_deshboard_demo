import React from 'react';

const Title = ({ title }) => {
    return (
        <div className='pb-[25px] text-black dark:text-white'>
            <h3 className='font-bold lg:text-2xl md:text-xl sm:text-lg'>{title}</h3>
        </div>
    );
};

export default Title;