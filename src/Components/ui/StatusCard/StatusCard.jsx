import React from 'react';

const StatusCard = ({ icon, title, status }) => {
    return (
        <div className="flex-1 h-full">
            <div className="flex items-center gap-4 bg-[#fafaf7] dark:bg-lightBlack p-4 md:p-5 h-full">
                <div className=" xl:text-[44px] lg:text-[34px] md:text-[26px] sm:text-[22px] dark:text-white text-black">
                    {icon}
                </div>
                <div>
                    <h6 className="uppercase sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[12px] font-medium dark:text-[#999]">
                        {title}
                    </h6>
                    <h2 className="sm:text-[18px] md:text-[22px] lg:text-[26px] xl:text-[28px] font-semibold dark:text-white">
                        {status}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;