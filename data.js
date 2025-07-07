// ...existing code...

import {  request } from "@/Utils/Axios";


// Category 

const get_categories_url = "/api/v1/get-categories";
export const getCategories = async ({ pageSize, pageindex, searchText }, router) => {
    return await request(
        {
            url: get_categories_url,
            method: "GET",
            params: {
                pageSize,
                pageindex,
                searchText,
            },
        },
        router
    );
};

export const createCategory = async (categoryData, router) => {
    const url = "/api/v1/create-category";
    return await request(
        {
            url,
            method: "POST",
            data: categoryData,
        },
        router
    );
};

// export const createCategory = async (categoryData, router) => {
//     const url = "/api/v1/create-category";
//     return await postRequest(url, categoryData, {}, router);
// };


// ...existing code...