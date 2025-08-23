'use client'
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import { deleteCategory, getCategories, updateCategory } from '../../../data';


const categories = [
    { id: 1, label: 'Electronics' },
    { id: 2, label: 'Books' },
    { id: 3, label: 'Home & Kitchen' },
    { id: 4, label: 'Fashion' },
];


const page = () => {
    const [categories, setCategories] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [getCategoryIsLoading, setGetCategoryIsLoading] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [categoryName, setCategoryName] = React.useState("");


    const handlePageChange = (pagination) => {
        setPageIndex(pagination?.pageIndex || 0);
        setPageSize(pagination?.pageSize || 10);
    }
    const handleGlobalSearch = (searchText) => {
        setSearchText(searchText || "");
    }
    const getUpdateItem = (item) => {
        item && setSelectedCategory(item);
        item && setCategoryName(item?.name || "");
    }
    const handleUpdate = async () => {
        const result = await updateCategory(selectedCategory?.id, {
            id: selectedCategory?.id,
            name: categoryName || selectedCategory?.name,
        })
        console.log("🚀 ~ handleUpdate ~ result:", result)
    }
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;
        const result = await deleteCategory(id);
        console.log("🚀 ~ handleDelete ~ result:", result)
        result?.success && fetchCategories();
        // Call the delete function with the id

    }
    const fetchCategories = async () => {

        setGetCategoryIsLoading(true);
        const result = await getCategories({
            pageSize: pageSize,
            pageIndex: pageIndex,
            searchText: searchText,
        });

        if (result?.success) {
            setCategories(result.data);
        }
        setGetCategoryIsLoading(false);
    };
    const Column = [
        { accessorKey: 'name', header: 'Name' },
    ]

    React.useEffect(() => {
        fetchCategories();
    }, [pageIndex, pageSize, searchText]);



    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Category" />
            <Grid container spacing={{ xs: 3, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>
            </Grid>
            <Button
                onClick={handleUpdate}
                style={{
                    padding: '5px 10px',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                bg="primary"
                variant="contained"
            >
                Create Category
            </Button>
            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable
                    title={"Category List"}
                    data={categories}
                    columns={Column}
                    onPagination={handlePageChange}
                    isLoading={getCategoryIsLoading}
                    onSearch={handleGlobalSearch}
                    onDelete={handleDelete}
                    onUpdate={getUpdateItem}
                />
            </Box>
        </Paper>
    );
};

export default page;