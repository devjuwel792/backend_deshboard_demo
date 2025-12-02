"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/app/Components/ui/button";
import { Input } from "@/app/Components/ui/input";
import { Textarea } from "@/app/Components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/Components/ui/card";
import { useCreateProductMutation } from "@/Helper/Redux/features/api/productApiSlice";
import { useGetCategoriesQuery } from "@/Helper/Redux/features/api/categoryApiSlice";
import { useGetColorsQuery } from "@/Helper/Redux/features/api/colorApiSlice";
import { useGetSizesQuery } from "@/Helper/Redux/features/api/sizeApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import { X, Upload, Image as ImageIcon } from "lucide-react";

export default function AddProductPage() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: colorsData } = useGetColorsQuery();
  const { data: sizesData } = useGetSizesQuery();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [formData, setFormData] = useState({
    Name: "",
    CategoryId:"",
    Price: "",
    DiscountPrice: "",
    Rating: "",
    ProductDetail: { Description: "", Material: "", Id: 1 },
    ProductImages: [],
    FeatureImage: null,
    SizeIds: [],
    ColorIds: [],
  });

  // Image previews (URL.createObjectURL)
  const [featureImagePreview, setFeatureImagePreview] = useState(null);
  const [productImagePreviews, setProductImagePreviews] = useState([]);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);

  const selectStyles = useMemo(
    () => ({
      control: (p) => ({
        ...p,
        backgroundColor: isDarkMode ? "#374151" : "#fff",
        borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
        color: isDarkMode ? "#fff" : "#000",
        "&:hover": { borderColor: isDarkMode ? "#6b7280" : "#9ca3af" },
      }),
      menu: (p) => ({ ...p, backgroundColor: isDarkMode ? "#374151" : "#fff" }),
      option: (p, { isSelected, isFocused }) => ({
        ...p,
        backgroundColor: isSelected
          ? isDarkMode
            ? "#4b5563"
            : "#e5e7eb"
          : isFocused
          ? isDarkMode
            ? "#4b5563"
            : "#f3f4f6"
          : "transparent",
        color: isDarkMode ? "#fff" : "#000",
      }),
      multiValue: (p) => ({ ...p, backgroundColor: isDarkMode ? "#4b5563" : "#dbeafe" }),
      multiValueLabel: (p) => ({ ...p, color: isDarkMode ? "#fff" : "#1e40af" }),
      multiValueRemove: (p) => ({
        ...p,
        color: isDarkMode ? "#fff" : "#1e40af",
        ":hover": { backgroundColor: "#ef4444", color: "white" },
      }),
      input: (p) => ({ ...p, color: isDarkMode ? "#fff" : "#000" }),
      placeholder: (p) => ({ ...p, color: isDarkMode ? "#9ca3af" : "#6b7280" }),
    }),
    [isDarkMode]
  );

  // Handle file selection (input or drag & drop)
  const handleFiles = (files, isFeature = false) => {
    if (isFeature) {
      const file = files[0];
      if (!file) return;

      setFormData((prev) => ({ ...prev, FeatureImage: file }));
      setFeatureImagePreview(URL.createObjectURL(file));
    } else {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((f) => URL.createObjectURL(f));

      setFormData((prev) => ({
        ...prev,
        ProductImages: [...prev.ProductImages, ...newFiles],
      }));
      setProductImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove Feature Image
  const removeFeatureImage = () => {
    if (featureImagePreview) URL.revokeObjectURL(featureImagePreview);
    setFeatureImagePreview(null);
    setFormData((prev) => ({ ...prev, FeatureImage: null }));
    document.getElementById("feature-input").value = "";
  };

  // Remove specific product image
  const removeProductImage = (index) => {
    URL.revokeObjectURL(productImagePreviews[index]);
    setProductImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      ProductImages: prev.ProductImages.filter((_, i) => i !== index),
    }));
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e, isFeature = false) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) handleFiles(files, isFeature);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Name.trim()) return toast.error("Product name is required");
    if (!formData.Price || isNaN(formData.Price)) return toast.error("Valid price is required");

    try {
      const formDataObj = new FormData();
      formDataObj.append("Name", formData.Name);
      formDataObj.append("Price", parseFloat(formData.Price) || 0);
      formDataObj.append("DiscountPrice", parseFloat(formData.DiscountPrice) || 0);
      formDataObj.append("Rating", parseFloat(formData.Rating) || 0);
      formDataObj.append("ProductDetail.Description", formData.ProductDetail.Description);
      formDataObj.append("ProductDetail.Material", formData.ProductDetail.Material);
      formDataObj.append("ProductDetail.Id", formData.ProductDetail.Id);

      formData.CategoryId.forEach((id) => formDataObj.append("CategoryId", id));
      formData.SizeIds.forEach((id) => formDataObj.append("SizeIds", id));
      formData.ColorIds.forEach((id) => formDataObj.append("ColorIds", id));

      formData.ProductImages.forEach((file) => formDataObj.append("ProductImages", file));
      if (formData.FeatureImage) formDataObj.append("FeatureImage", formData.FeatureImage);

      await createProduct(formDataObj).unwrap();
      toast.success("Product created successfully!");

      // Cleanup previews
      if (featureImagePreview) URL.revokeObjectURL(featureImagePreview);
      productImagePreviews.forEach((url) => URL.revokeObjectURL(url));

      // Reset everything
      setFormData({
        Name: "",
        CategoryId: [],
        Price: "",
        DiscountPrice: "",
        Rating: "",
        ProductDetail: { Description: "", Material: "", Id: 1 },
        ProductImages: [],
        FeatureImage: null,
        SizeIds: [],
        ColorIds: [],
      });
      setFeatureImagePreview(null);
      setProductImagePreviews([]);
      document.getElementById("feature-input").value = "";
      document.getElementById("product-images-input").value = "";
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create product");
    }
  };

  // Options
  const categoryOptions = categoriesData?.data?.data?.map((c) => ({ value: c.id, label: c.name })) || [];
  const colorOptions = colorsData?.data?.data?.map((c) => ({ value: c.id, label: c.name })) || [];
  const sizeOptions = sizesData?.data?.data?.map((s) => ({ value: s.id, label: s.name })) || [];

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill in the details and upload images</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <Input name="Name" value={formData.Name} onChange={handleInputChange} required />
            </div>

            {/* Categories, Colors, Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Categories</label>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={categoryOptions.filter((o) => formData.CategoryId.includes(o.value))}
                  onChange={(opts) => setFormData((p) => ({ ...p, CategoryId: opts ? opts.map((o) => o.value) : [] }))}
                  styles={selectStyles}
                  placeholder="Select..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Colors</label>
                <Select
                  isMulti
                  options={colorOptions}
                  value={colorOptions.filter((o) => formData.ColorIds.includes(o.value))}
                  onChange={(opts) => setFormData((p) => ({ ...p, ColorIds: opts ? opts.map((o) => o.value) : [] }))}
                  styles={selectStyles}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sizes</label>
                <Select
                  isMulti
                  options={sizeOptions}
                  value={sizeOptions.filter((o) => formData.SizeIds.includes(o.value))}
                  onChange={(opts) => setFormData((p) => ({ ...p, SizeIds: opts ? opts.map((o) => o.value) : [] }))}
                  styles={selectStyles}
                />
              </div>
            </div>

            {/* Price Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input name="Price" type="number" step="0.01" value={formData.Price} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount Price</label>
                <Input name="DiscountPrice" type="number" step="0.01" value={formData.DiscountPrice} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating (0-5)</label>
                <Input name="Rating" type="number" step="0.1" min="0" max="5" value={formData.Rating} onChange={handleInputChange} />
              </div>
            </div>

            {/* Description & Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea name="ProductDetail.Description" rows={4} value={formData.ProductDetail.Description} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Material</label>
                <Input name="ProductDetail.Material" value={formData.ProductDetail.Material} onChange={handleInputChange} />
              </div>
            </div>

            {/* Feature Image */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Feature Image (Main)</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, true)}
                onClick={() => document.getElementById("feature-input").click()}
              >
                <input
                  id="feature-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFiles(e.target.files, true)}
                />
                {featureImagePreview ? (
                  <div className="relative inline-block">
                    <img src={featureImagePreview} alt="Feature" className="mx-auto h-64 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFeatureImage(); }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Drop image here or click to upload
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Images */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Additional Images</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("product-images-input").click()}
              >
                <input
                  id="product-images-input"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
                />
                {productImagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {productImagePreviews.map((preview, i) => (
                      <div key={i} className="relative group">
                        <img src={preview} alt={`Product ${i + 1}`} className="h-32 w-full object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeProductImage(i); }}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Drop images here or click to upload multiple
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={isLoading} className="min-w-32">
                {isLoading ? "Creating..." : "Add Product"}
              </Button>
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}