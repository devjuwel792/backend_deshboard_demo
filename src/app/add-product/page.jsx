'use client'
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { categoryDropdown, colorDropdown, createProduct, deleteProduct, getProduct, updateCategory, updateProduct } from '@/Utils/API/data';
import { sizeDropdown } from '@/Utils/API/size';
import { Grid, TextField, Box, Paper, Autocomplete, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const page = () => {

    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");

    const [selectedColor, setSelectedColor] = useState([])
    const [colors, setColors] = useState([])
    const [colorLoading, setColorLoading] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);

    const [selectedSize, setSelectedSize] = useState([])
    const [size, setSize] = useState([])
    const [sizeLoading, setSizeLoading] = useState(false)

    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState(null);

    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    const [productDiscountPridce, setProductDiscountPrice] = useState(0)
    const [productRating, setProductRating] = useState(0)
    const [productMaterial, setProductMaterial] = useState("")
    const [productDetails, setProductDetails] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [post, setPost] = useState(true)


    const handlePageChange = (pagination) => {
        setPageIndex(pagination?.pageIndex || 0);
        setPageSize(pagination?.pageSize || 10);
    }
    const handleGlobalSearch = (searchText) => {
        setSearchText(searchText || "");
    }

    const fetchSizes = async (search = " ") => {
        setSizeLoading(true)
        const result = await sizeDropdown(search)
        if (result?.success) {
            setSize(result?.data)
        }
        setSizeLoading(false)
    }

    const fetchColors = async (search = "") => {
        setColorLoading(true);
        const result = await colorDropdown(search)
        console.log(result);
        if (result?.success) {
            setColors(result?.data);
        }
        setColorLoading(false);
    };

    const fetchCategories = async (search = "") => {
        setCategoryLoading(true)
        const result = await categoryDropdown(search)
        if (result?.success) {
            setCategories(result?.data)
        }
        setCategoryLoading(false)
    }

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        // Revoke the object URL to free memory
        URL.revokeObjectURL(images[index].preview);
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.preview));
        };
    }, [images]);

    const fetchProduct = async () => {


        setIsLoading(true);
        const result = await getProduct({
            pageSize: pageSize,
            pageIndex: pageIndex,
            searchText: searchText,
        });

        if (result?.success) {
            setProducts(result.data);

        }
        setIsLoading(false);

    }
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;
        const result = await deleteProduct(id);
        result?.success && fetchProduct();
    }
    const handleCreate = async () => {
        // if (!productName.trim()) {
        //     setError("category cannot be empty")
        //     return;
        // }
        // setError("")
        const result = await createProduct(
            {

                name: productName,
                categoryId: selectedCategory?.id,
                price: productPrice,
                discountPrice: productDiscountPridce,
                rating: productRating,
                productDetail: {

                    description: productDetails,
                    material: productMaterial
                },
                // "productImages": [
                //     {
                //         "id": 0,
                //         "image": "string",
                //         "imageUrl": "string",
                //         "imageType": "string",
                //         "productId": 0
                //     }
                // ],
                sizeIds: selectedSize.map((value) => value.id),
                colorIds: selectedColor.map((value) => value.id)
            }

        )

        if (result?.success) {
            fetchProduct()
        }
    }
    const handleUpdate = async () => {
        const result = await updateProduct(selectedProduct.id,
            {
                id: selectedProduct.id,
                name: productName,
                categoryId: selectedCategory?.id,
                price: productPrice,
                discountPrice: productDiscountPridce,
                rating: productRating,
                productDetail: {

                    description: productDetails,
                    material: productMaterial
                },
                // "productImages": [
                //     {
                //         "id": 0,
                //         "image": "string",
                //         "imageUrl": "string",
                //         "imageType": "string",
                //         "productId": 0
                //     }
                // ],
                sizeIds: selectedSize.map((value) => value.id),
                colorIds: selectedColor.map((value) => value.id)
            }

        )

        if (result?.success) {

            fetchProduct()
            setPost(true)

        }


    }
    const getProductData = (data) => {
        if (data) {
            setPost(false)
            setProductName(data.name)
            setProductPrice(data.price)
            setProductDiscountPrice(data.discountPrice)
            setProductRating(data.rating)
            setProductMaterial(data.productDetail.description)
            setProductDetails(data.productDetail.material)
            setSelectedCategory(data.category)
            setSelectedColor(data.productColors)
            setSelectedSize(data.productSizes)
            setSelectedProduct(data)
        }

        console.log("🚀 ~ getProductData ~ data:", data)

    }


    useEffect(() => {
        fetchCategories()
        fetchColors()
        fetchSizes()

    }, [])

    useEffect(() => {
        fetchProduct();
    }, [pageIndex, pageSize, searchText]);

    const Column = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'price', header: 'Price' },
        { accessorKey: 'category.name', header: 'Category' },
        { accessorKey: 'discountPrice', header: 'Discount Price' },
        { accessorKey: 'rating', header: 'Rating' },
        {
            header: "Description",
            Cell: ({ row }) => row.original.productDetail?.description,
        },
        {
            header: "Sizes",
            Cell: ({ row }) =>
                row.original.productSizes.map((s) => s.name).join(", "),
        },
        {
            header: "Colors",
            Cell: ({ row }) =>
                row.original.productColors.map((c) => c.name).join(", "),
        },

    ]

    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Add Product" />
            <Grid container spacing={{ xs: 3, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Discounted Price"
                        value={productDiscountPridce}
                        onChange={(e) => setProductDiscountPrice(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Rating"
                        value={productRating}
                        onChange={(e) => setProductRating(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>

                {/* <Grid item xs={12} md={6}>
                    <TextField
                        label="Stock"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid> */}

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Product Detail"
                        value={productDetails}
                        onChange={(e) => setProductDetails(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Product Material"
                        value={productMaterial}
                        onChange={(e) => setProductMaterial(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>

                {/* <Grid item xs={12} md={6}>
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid> */}

                <Grid item xs={12} md={6}>
                    <Autocomplete
                        multiple
                        options={colors}
                        loading={colorLoading}
                        getOptionLabel={(option) => option.label || option.name || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={selectedColor} // this should be an array now
                        onChange={(_, value) => setSelectedColor(value)} // value will be an array
                        onInputChange={(_, value) => fetchColors(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Color"
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    sx: { borderRadius: 0 },
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Autocomplete
                        // multiple
                        options={categories}
                        loading={categoryLoading}
                        getOptionLabel={(option) => option.label || option.name || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={selectedCategory}
                        onChange={(_, value) => setSelectedCategory(value)}
                        onInputChange={(_, value) => fetchCategories(value)} // fetch on search
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Category"
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    sx: { borderRadius: 0 },
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Autocomplete
                        multiple
                        options={size}
                        loading={sizeLoading}
                        getOptionLabel={(option) => option.label || option.name || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={selectedSize}
                        onChange={(_, value) => setSelectedSize(value)}
                        onInputChange={(_, value) => fetchSizes(value)} // fetch on search
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Size"
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    sx: { borderRadius: 0 },
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                    />

                    <Box
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: "8px",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: "1px dashed #ccc",
                            "&:hover": { borderColor: "#1976d2" },
                            mb: 2,
                        }}
                        onClick={handleAvatarClick}
                    >
                        <Typography variant="caption">Upload Images</Typography>
                    </Box>

                    {/* Preview Grid */}
                    <Grid container spacing={2}>
                        {images.map((img, index) => (
                            <Grid item key={index}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: 100, // smaller width
                                        height: 100, // smaller height
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        border: "1px solid #ddd",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <img
                                        src={img.preview}
                                        alt={`preview-${index}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block"
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveImage(index)}
                                        sx={{
                                            position: "absolute",
                                            top: 4,
                                            right: 4,
                                            minWidth: "24px",
                                            padding: "0 4px",
                                            fontSize: "10px"
                                        }}
                                    >
                                        X
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

            </Grid>
            {/* Table Below */}
            <Button
                onClick={!post ? handleUpdate : handleCreate}
                style={{
                    padding: '5px 10px',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0px',
                    cursor: 'pointer',
                    marginTop: '16px'
                }}
                bg=""
                variant="contained"
            >

                {!post ? "Update Product" : "Add Product"}
            </Button>
            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable
                    title={"Product List"}
                    data={products}
                    columns={Column}
                    onPagination={handlePageChange}
                    isLoading={isLoading}
                    onSearch={handleGlobalSearch}
                    onDelete={handleDelete}
                    onUpdate={getProductData}
                />
            </Box>
        </Paper>
    );
};

export default page;
