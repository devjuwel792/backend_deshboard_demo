"use client";

import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import MaterialTable from "@/Components/ui/MaterialTable/MaterialTable";
import { useGetProductsQuery } from "@/Helper/Redux/features/api/productApiSlice";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    pageSize: 10,
    pageIndex: page - 1,
    searchText,
  });

  console.log("🚀 ~ ProductsPage ~ productsData:", productsData);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Price", accessorKey: "price" },
    { header: "Discount Price", accessorKey: "discountPrice" },
    { header: "Rating", accessorKey: "rating" },
    { header: "Category", accessorKey: "category.name" },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-500">
          Error loading products: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search products..."
            value={searchText}
            onChange={handleSearch}
            className="w-64"
          />
        </div>
      </div>
      <MaterialTable
        data={productsData?.data?.data || []}
        columns={columns}
        isLoading={isLoading}
        title="Products"
        onPagination={handlePagination}
      />
    </div>
  );
}
