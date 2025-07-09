'use client';
import React, { useState } from 'react';
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import {
    Grid,
    TextField,
    Box,
    Paper,
    Autocomplete
} from '@mui/material';

const status = [
    { id: 1, label: 'Electronics' },
    { id: 2, label: 'Books' },
    { id: 3, label: 'Home & Kitchen' },
    { id: 4, label: 'Fashion' },
];

const user = [
    { id: 1, label: 'Electronics' },
    { id: 2, label: 'Books' },
    { id: 3, label: 'Home & Kitchen' },
    { id: 4, label: 'Fashion' },
];

const Page = () => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <Paper className="p-4" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="All Orders" />
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        type="date"
                        label="Date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ sx: { borderRadius: 0 } }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ width: '100%' }}>
                        <Autocomplete
                            options={status}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={selectedStatus}
                            onChange={(_, value) => setSelectedStatus(value)}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Status"
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
                        label="Total Amount"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{ sx: { borderRadius: 0 } }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ width: '100%' }}>
                        <Autocomplete
                            options={user}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={selectedUser}
                            onChange={(_, value) => setSelectedUser(value)}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="User"
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
                        label="Payment"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{ sx: { borderRadius: 0 } }}
                    />
                </Grid>
            </Grid>

            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable />
            </Box>
        </Paper>
    );
};

export default Page;
