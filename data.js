// ...existing code...

import { request } from "@/Utils/Axios";


// Category 

const get_categories_url = "/api/v1/get-categories";
const get_category_by_id_url = "/api/v1/get-category";
const create_category_url = "/api/v1/create-category";
const update_category_url = "/api/v1/update-category";
const delete_category_url = "/api/v1/delete-category";

export const getCategories = async ({ pageSize, pageIndex, searchText = "a" }) => {
    const url = get_categories_url;
    return await request(
        {
            url,
            method: "GET",
            params: {
                pageSize: pageSize,
                pageIndex,
                searchText,
            },
        }
    );
};
export const getCategoryById = async (categoryId) => {
    const url = `${get_category_by_id_url}/${categoryId}`;
    return await request(
        {
            url,
            method: "GET",
        }
    );
};

export const createCategory = async (categoryData) => {
    const url = "/api/v1/create-category";
    return await request(
        {
            url,
            method: "POST",
            data: categoryData,
        }
    );
};

export const updateCategory = async (categoryId, categoryData) => {
    const url = `${update_category_url}/${categoryId}`;
    return await request(
        {
            url,
            method: "PUT",
            data: categoryData,
        }
    );
};

export const deleteCategory = async (categoryId) => {
    const url = `${delete_category_url}/${categoryId}`;
    return await request(
        {
            url,
            method: "DELETE",
        }
    );
}
