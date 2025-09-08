'use client'
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { categoryDropdown, colorDropdown } from '@/Utils/API/data';
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

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);

    const [selectedSize, setSelectedSize] = useState([])
    const [size, setSize] = useState([])
    const [sizeLoading, setSizeLoading] = useState(false)

    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState(null);

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

    useEffect(() => {
        fetchCategories()
        fetchColors()
        fetchSizes()
    }, [])

    const Column = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'price', header: 'Price' },
        { accessorKey: 'size', header: 'Size' },
        { accessorKey: 'rating', header: 'Rating' },
        { accessorKey: 'category', header: 'Category' },
        { accessorKey: 'color', header: 'Color' },
        { accessorKey: 'price', header: 'Price' },
    ]

    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Add Product" />
            <Grid container spacing={{ xs: 3, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
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
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>

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
                        multiple
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
                // onClick={}
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
                Add Product
                {/* {selectedColor ? "Update Product" : "Add Product"} */}
            </Button>
            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable
                    title={"Product List"}
                    data={colors}
                    columns={Column}
                    onPagination={handlePageChange}
                    // isLoading={}
                    onSearch={handleGlobalSearch}
                // onDelete={}
                // onUpdate={}
                />
            </Box>
        </Paper>
    );
};

export default page;
