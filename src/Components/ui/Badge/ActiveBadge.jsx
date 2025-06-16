import React from 'react';

const ActiveBadge = ({title}) => {
    return (
        <span className="uppercase bg-[#2F87331A] text-[12px] px-[10px] py-[5px] text-[#2f8733]">{title}</span>
    );
};

export default ActiveBadge;