'use client'
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { categoryDropdown } from '@/Utils/API/data'; // Assuming order item APIs are similar; add them if needed
// Placeholder for order item APIs - backend needs to implement these
// import { getOrderItems, createOrderItem, updateOrderItem, deleteOrderItem } from '@/Utils/API/orderItems';
import { Grid, TextField, Box, Paper, Autocomplete, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

const page = () => {
    // Form states
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);

    // Table states
    const [orderItems, setOrderItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [searchText, setSearchText] = useState('');

    // Edit mode
    const [selectedOrderItem, setSelectedOrderItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch categories
    const fetchCategories = async (search = '') => {
        setCategoryLoading(true);
        const result = await categoryDropdown(search);
        if (result?.success) {
            setCategories(result?.data);
        }
        setCategoryLoading(false);
    };

    // Placeholder for fetching order items - implement API
    const fetchOrderItems = async () => {
        setIsLoading(true);
        // const result = await getOrderItems({ pageSize, pageIndex, searchText });
        // if (result?.success) {
        //     setOrderItems(result.data);
        // }
        // Simulate data for now
        setOrderItems([
            { id: 1, orderId: 'ORD001', order: 'Sample Order', category: { name: 'Electronics' }, quantity: 2, price: 100 },
            // Add more mock data
        ]);
        setIsLoading(false);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!orderId || !order || !quantity || !price || !selectedCategory) {
            alert('Please fill all fields');
            return;
        }
        // if (isEditing) {
        //     const result = await updateOrderItem(selectedOrderItem.id, { orderId, order, categoryId: selectedCategory.id, quantity: parseInt(quantity), price: parseFloat(price) });
        //     if (result?.success) {
        //         fetchOrderItems();
        //         resetForm();
        //     }
        // } else {
        //     const result = await createOrderItem({ orderId, order, categoryId: selectedCategory.id, quantity: parseInt(quantity), price: parseFloat(price) });
        //     if (result?.success) {
        //         fetchOrderItems();
        //         resetForm();
        //     }
        // }
        // Placeholder: Add API call here
        alert(isEditing ? 'Order item updated' : 'Order item created');
        fetchOrderItems();
        resetForm();
    };

    // Reset form
    const resetForm = () => {
        setOrderId('');
        setOrder('');
        setQuantity('');
        setPrice('');
        setSelectedCategory(null);
        setIsEditing(false);
        setSelectedOrderItem(null);
    };

    // Handle table actions
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order item?')) {
            // const result = await deleteOrderItem(id);
            // if (result?.success) {
            //     fetchOrderItems();
            // }
            // Placeholder
            alert('Order item deleted');
            fetchOrderItems();
        }
    };

    const handleUpdate = (data) => {
        setOrderId(data.orderId);
        setOrder(data.order);
        setQuantity(data.quantity.toString());
        setPrice(data.price.toString());
        setSelectedCategory(data.category);
        setSelectedOrderItem(data);
        setIsEditing(true);
    };

    // Table pagination and search
    const handlePageChange = (pagination) => {
        setPageIndex(pagination?.pageIndex || 0);
        setPageSize(pagination?.pageSize || 10);
    };

    const handleGlobalSearch = (search) => {
        setSearchText(search || '');
    };

    // Table columns
    const columns = [
        { accessorKey: 'orderId', header: 'Order ID' },
        { accessorKey: 'order', header: 'Order' },
        { accessorKey: 'category.name', header: 'Category' },
        { accessorKey: 'quantity', header: 'Quantity' },
        { accessorKey: 'price', header: 'Price' },
    ];

    useEffect(() => {
        fetchCategories();
        fetchOrderItems();
    }, []);

    useEffect(() => {
        fetchOrderItems();
    }, [pageIndex, pageSize, searchText]);

    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Order Item" />
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        label="Order Id"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Order"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: '100%' }}>
                        <Autocomplete
                            options={categories}
                            loading={categoryLoading}
                            getOptionLabel={(option) => option.label || option.name || ''}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={selectedCategory}
                            onChange={(_, value) => setSelectedCategory(value)}
                            onInputChange={(_, value) => fetchCategories(value)}
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
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ borderRadius: 0 }}
                    >
                        {isEditing ? 'Update Order Item' : 'Add Order Item'}
                    </Button>
                    {isEditing && (
                        <Button
                            onClick={resetForm}
                            variant="outlined"
                            sx={{ ml: 2, borderRadius: 0 }}
                        >
                            Cancel
                        </Button>
                    )}
                </Grid>
            </Grid>

            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable
                    title="Order Items List"
                    data={orderItems}
                    columns={columns}
                    onPagination={handlePageChange}
                    isLoading={isLoading}
                    onSearch={handleGlobalSearch}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            </Box>
        </Paper>
    );
};

export default page;
