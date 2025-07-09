'use client'
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { Grid, TextField, Box, Paper, Autocomplete } from '@mui/material';
import React, { useState } from 'react';

const cart = [
    { id: 1, label: 'Electronics' },
    { id: 2, label: 'Books' },
    { id: 3, label: 'Home & Kitchen' },
    { id: 4, label: 'Fashion' },
];

const page = () => {

    const [selectedCart, setSelectedCart] = useState(null);


    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Cart" />
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="User"
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
                        label="Product Id"
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
                        label="Product"
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
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>
{/* 
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: '100%' }}>
                        <Autocomplete
                            options={cart}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={selectedCart}
                            onChange={(_, value) => setSelectedCart(value)}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Product Category" //Id will pass
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
                </Grid> */}

            </Grid>

            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable />
            </Box>
        </Paper>
    );
};

export default page;