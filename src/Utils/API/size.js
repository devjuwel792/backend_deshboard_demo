import { request } from "../Axios";

//size
const get_size_url = "/api/v1/get-size";
const get_size_by_id_url = "/api/v1/get-size";
const delete_size_url = "/api/v1/delete-size";
const create_size_url = "/api/v1/create-size";
const update_size_url = "/api/v1/update-size";
const size_dropdown_url = "/api/v1/dropdown-size"

export const getSizes = async ({ pageSize, pageIndex, searchText = "a" }) => {
    const url = get_size_url;
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

export const getSizeById = async (sizeId) => {
    const url = `${get_size_by_id_url}/${sizeId}`
    return await request(
        {
            url,
            method: "GET"
        }
    )
}

export const createSize = async (sizeData) => {
    const url = create_size_url;
    return await request(
        {
            url,
            method: "POST",
            data: sizeData
        }
    )
}

export const updateSize = async (sizeId, sizeData) => {
    const url = `${update_size_url}/${sizeId}`
    return await request(
        {
            url,
            method: "PUT",
            data: sizeData
        }
    )
}

export const deleteSize = async (sizeId) => {
    const url = `${delete_size_url}/${sizeId}`
    return await request(
        {
            url,
            method: "DELETE"
        }
    )
}

export const sizeDropdown = async (searchText = " ") => {
    const url = size_dropdown_url;
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