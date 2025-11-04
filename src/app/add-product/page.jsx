"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateProductMutation } from "@/Helper/Redux/features/api/productApiSlice";
import { useGetCategoriesQuery } from "@/Helper/Redux/features/api/categoryApiSlice";
import { useGetColorsQuery } from "@/Helper/Redux/features/api/colorApiSlice";
import { useGetSizesQuery } from "@/Helper/Redux/features/api/sizeApiSlice";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: colors } = useGetColorsQuery();
  const { data: sizes } = useGetSizesQuery();

  const [formData, setFormData] = useState({
    Name: "",
    CategoryId: "",
    Price: "",
    DiscountPrice: "",
    Rating: "",
    ProductDetail: {
      Description: "",
      Material: "",
      Id: 1,
    },
    ProductImages: [],
    SizeIds: [],
    ColorIds: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        Price: parseFloat(formData.Price),
        DiscountPrice: parseFloat(formData.DiscountPrice),
        Rating: parseFloat(formData.Rating),
        CategoryId: parseInt(formData.CategoryId),
        SizeIds: formData.SizeIds.map((id) => parseInt(id)),
        ColorIds: formData.ColorIds.map((id) => parseInt(id)),
      };
      await createProduct(productData).unwrap();
      toast.success("Product created successfully!");
      // Reset form
      setFormData({
        Name: "",
        CategoryId: "",
        Price: "",
        DiscountPrice: "",
        Rating: "",
        ProductDetail: {
          Description: "",
          Material: "",
          Id: 1,
        },
        ProductImages: [],
        SizeIds: [],
        ColorIds: [],
      });
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill in the details to add a new product to your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="Name" className="text-sm font-medium">
                Product Name
              </label>
              <Input
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="CategoryId" className="text-sm font-medium">
                Category
              </label>
              <Select onValueChange={(value) => handleSelectChange("CategoryId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.data?.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="Price" className="text-sm font-medium">
                  Price
                </label>
                <Input
                  id="Price"
                  name="Price"
                  type="number"
                  step="0.01"
                  value={formData.Price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="DiscountPrice" className="text-sm font-medium">
                  Discount Price
                </label>
                <Input
                  id="DiscountPrice"
                  name="DiscountPrice"
                  type="number"
                  step="0.01"
                  value={formData.DiscountPrice}
                  onChange={handleInputChange}
                  placeholder="Enter discount price"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="Rating" className="text-sm font-medium">
                Rating
              </label>
              <Input
                id="Rating"
                name="Rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.Rating}
                onChange={handleInputChange}
                placeholder="Enter rating (0-5)"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ProductDetail.Description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="ProductDetail.Description"
                name="ProductDetail.Description"
                value={formData.ProductDetail.Description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ProductDetail.Material" className="text-sm font-medium">
                Material
              </label>
              <Input
                id="ProductDetail.Material"
                name="ProductDetail.Material"
                value={formData.ProductDetail.Material}
                onChange={handleInputChange}
                placeholder="Enter material"
                className="w-full"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="default">
                Add Product
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
