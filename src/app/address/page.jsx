import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { Grid, TextField, Box, Paper } from '@mui/material';
import React from 'react';

const page = () => {
    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Address" />
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        label="City"
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
                        label="State"
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
                        label="Country"
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
                        label="Zip Code"
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
                        label="User Id"
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
                        label="User"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
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

export default page;