"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateProductMutation } from "@/Helper/Redux/features/api/productApiSlice";
import { useGetCategoriesQuery } from "@/Helper/Redux/features/api/categoryApiSlice";
import { useGetColorsQuery } from "@/Helper/Redux/features/api/colorApiSlice";
import { useGetSizesQuery } from "@/Helper/Redux/features/api/sizeApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";

export default function AddProductPage() {
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: colors } = useGetColorsQuery();
  const { data: sizes } = useGetSizesQuery();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [formData, setFormData] = useState({
    Name: "",
    CategoryId: [],
    Price: "",
    DiscountPrice: "",
    Rating: "",
    ProductDetail: {
      Description: "",
      Material: ""
    },
    ProductImages: [],
    FeatureImage: null,
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      ProductImages: files,
    }));
  };

  const handleFeatureImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      FeatureImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const fd = new FormData();

    // ====== BASIC FIELDS ======
    fd.append("Name", formData.Name);
    fd.append("Price", formData.Price);
    fd.append("DiscountPrice", formData.DiscountPrice);
    fd.append("Rating", formData.Rating);

    // ====== CATEGORY (Backend expects single long) ======
    if (formData.CategoryId.length > 0) {
      fd.append("CategoryId", formData.CategoryId[0]);
    }

    // ====== PRODUCT DETAIL (NESTED OBJECT) ======
    fd.append("ProductDetail.Description", formData.ProductDetail.Description);
    fd.append("ProductDetail.Material", formData.ProductDetail.Material);

    // ====== SIZE IDS ======
    formData.SizeIds.forEach((id, idx) => {
      fd.append(`SizeIds[${idx}]`, id);
    });

    // ====== COLOR IDS ======
    formData.ColorIds.forEach((id, idx) => {
      fd.append(`ColorIds[${idx}]`, id);
    });

    // ====== MULTIPLE PRODUCT IMAGES ======
formData.ProductImages.forEach(file => {
  fd.append("ProductImages", file); // ✅ correct
});

    // ====== SINGLE FEATURE IMAGE ======
    if (formData.FeatureImage) {
      fd.append("FeatureImage", formData.FeatureImage);
    }

    // ====== DEBUG CHECK ======
    console.log("FormData content:");
    for (let pair of fd.entries()) {
      console.log(pair[0], pair[1]);
    }

    // ====== API CALL ======
    await createProduct(fd).unwrap();

    toast.success("Product created successfully!");

    // ====== RESET FORM ======
    setFormData({
      Name: "",
      CategoryId: [],
      Price: "",
      DiscountPrice: "",
      Rating: "",
      ProductDetail: {
        Description: "",
        Material: ""
      },
      ProductImages: [],
      FeatureImage: null,
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
              <Select
                isMulti
                options={categories?.data?.data?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(selectedOptions) =>
                  handleMultiSelect(
                    "CategoryId",
                    selectedOptions?.map((option) => option.value) || []
                  )
                }
                placeholder="Select categories"
                className="w-full"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                    borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    "&:hover": {
                      borderColor: isDarkMode ? "#6b7280" : "#9ca3af",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? isDarkMode
                        ? "#4b5563"
                        : "#e5e7eb"
                      : state.isFocused
                      ? isDarkMode
                        ? "#4b5563"
                        : "#f3f4f6"
                      : isDarkMode
                      ? "#374151"
                      : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                    "&:hover": {
                      backgroundColor: isDarkMode ? "#6b7280" : "#d1d5db",
                    },
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#9ca3af" : "#6b7280",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ColorIds" className="text-sm font-medium">
                Colors
              </label>
              <Select
                isMulti
                options={colors?.data?.data?.map((color) => ({
                  value: color.id,
                  label: color.name,
                }))}
                onChange={(selectedOptions) =>
                  handleMultiSelect(
                    "ColorIds",
                    selectedOptions?.map((option) => option.value) || []
                  )
                }
                placeholder="Select colors"
                className="w-full"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                    borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    "&:hover": {
                      borderColor: isDarkMode ? "#6b7280" : "#9ca3af",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? isDarkMode
                        ? "#4b5563"
                        : "#e5e7eb"
                      : state.isFocused
                      ? isDarkMode
                        ? "#4b5563"
                        : "#f3f4f6"
                      : isDarkMode
                      ? "#374151"
                      : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                    "&:hover": {
                      backgroundColor: isDarkMode ? "#6b7280" : "#d1d5db",
                    },
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#9ca3af" : "#6b7280",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="SizeIds" className="text-sm font-medium">
                Sizes
              </label>
              <Select
                isMulti
                options={sizes?.data?.data?.map((size) => ({
                  value: size.id,
                  label: size.name,
                }))}
                onChange={(selectedOptions) =>
                  handleMultiSelect(
                    "SizeIds",
                    selectedOptions?.map((option) => option.value) || []
                  )
                }
                placeholder="Select sizes"
                className="w-full"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                    borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    "&:hover": {
                      borderColor: isDarkMode ? "#6b7280" : "#9ca3af",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? isDarkMode
                        ? "#4b5563"
                        : "#e5e7eb"
                      : state.isFocused
                      ? isDarkMode
                        ? "#4b5563"
                        : "#f3f4f6"
                      : isDarkMode
                      ? "#374151"
                      : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                    "&:hover": {
                      backgroundColor: isDarkMode ? "#6b7280" : "#d1d5db",
                    },
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#9ca3af" : "#6b7280",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }),
                }}
              />
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
              <label
                htmlFor="ProductDetail.Description"
                className="text-sm font-medium"
              >
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
              <label
                htmlFor="ProductDetail.Material"
                className="text-sm font-medium"
              >
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

            <div className="space-y-2">
              <label htmlFor="FeatureImage" className="text-sm font-medium">
                Feature Image
              </label>
              <Input
                id="FeatureImage"
                name="FeatureImage"
                type="file"
                onChange={handleFeatureImageChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ProductImages" className="text-sm font-medium">
                Product Images
              </label>
              <Input
                id="ProductImages"
                name="ProductImages"
                type="file"
                multiple
                onChange={handleFileChange}
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
