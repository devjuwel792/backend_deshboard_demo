import Image from 'next/image';

const Banner = () => {
    return (
        <div className="w-full">
        <Image
            src="/banner.jpg"
            alt="Banner Image"
            width={100}
            height={50}
            className="w-full h-auto object-cover"
            priority
        />
        <div className="p-4 bg-white dark:bg-darkGray">
            <h3 className="xs:text-[16px] sm:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold dark:text-white">
                Welcome Back Admin
            </h3>
            <p className="text-sm sm:text-base dark:text-[#999]">
                Manage application's data and operations with real time analytics, user management tools and customizable reports.
            </p>
        </div>
    </div>
    );
};

export default Banner;