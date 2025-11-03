'use client'
import * as React from "react";
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin5Line } from "react-icons/ri";

const MaterialTable = ({ data, columns, isLoading, onPagination, onSearch, onDelete, onUpdate, title }) => {
    console.log("🚀 ~ MaterialTable ~ data:", data)
    // Placeholder: Material UI has been uninstalled. Replace with a basic table implementation.

    return (
        <div className="shadow mt-4 p-4">
            <h2 className="mb-4 text-black dark:text-white font-bold lg:text-2xl md:text-xl sm:text-lg">
                {title}
            </h2>
            <p className="text-gray-500">Material UI table component has been removed. Please implement a custom table here.</p>
            {isLoading && <p>Loading...</p>}
            {!isLoading && data?.data && (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            {columns.map((col, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                                    {col.header}
                                </th>
                            ))}
                            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((row, rowIndex) => (
                            <tr key={row.id || rowIndex} className="hover:bg-gray-50">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                        {row[col.accessorKey]}
                                    </td>
                                ))}
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => onUpdate && onUpdate(row)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <CiEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => onDelete && onDelete(row.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <RiDeleteBin5Line size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MaterialTable;
