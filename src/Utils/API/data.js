// ...existing code...

import { request } from "@/Utils/Axios";
// Category 
const get_categories_url = "/api/v1/get-categories";
const get_category_by_id_url = "/api/v1/get-category";
const create_category_url = "/api/v1/create-category";
const update_category_url = "/api/v1/category-update";
const delete_category_url = "/api/v1/delete-category";
const category_dropdown_url = "/api/v1/dropdown-category"

// color
const get_color_url = "/api/v1/get-colors";
const get_color_by_id_url = "/api/v1/get-colors";
const delete_color_url = "/api/v1/delete-color";
const create_color_url = "/api/v1/create-color"
const update_color_url = "/api/v1/update-color"
const color_dropdown_url = "/api/v1/dropdown-colors"

export const getCategories = async ({ pageSize, pageIndex, searchText = "" }) => {
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

export const categoryDropdown = async (categoryId, searchText = "") => {
    const url = category_dropdown_url;
    return await request(
        {
            url,
            method: "GET",
            params: {
                searchText,
                categoryId
            }
        }
    )
}

//color
export const createColor = async (colorData) => {
    const url = create_color_url;
    return await request({
        url,
        method: "POST",
        data: colorData,
    });
};

export const getColors = async ({ pageSize, pageIndex, searchText = "" }) => {
    const url = get_color_url;
    return await request({
        url,
        method: "GET",
        params: {
            pageSize,
            pageIndex,
            searchText,
        },
    });
};

export const getColorById = async (colorId) => {
    const url = `${get_color_by_id_url}/${colorId}`;
    return await request({
        url,
        method: "GET",
    });
};

export const updateColor = async (colorId, colorData) => {
    const url = `${update_color_url}/${colorId}`;
    return await request({
        url,
        method: "PUT",
        data: colorData,
    });
};

export const deleteColor = async (colorId) => {
    const url = `${delete_color_url}/${colorId}`;
    return await request({
        url,
        method: "DELETE",
    });
};

export const colorDropdown = async ( searchText = "") => {
    const url = color_dropdown_url;
    return await request(
        {
            url,
            method: "GET",
            params: {
                searchText
            }
        }
    )
}