// import Title from '@/Components/common/Title/Title';
// import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
// import { Container, Grid, TextField, Box } from '@mui/material';
// import React from 'react';

// // Centralise form field configuration so it’s easier to tweak
// const fields = [
//   'Name',
//   'Temperature',
//   'Ingredients',
//   'Quantity',
//   'Weight or Volume',
//   'Price',
//   'Offer Price',
//   'Food Item Id',
//   'Starting Day',
//   'Discontinued Day',
// ];

// const Page = () => {
//   return (
//     <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4, md: 6 } }}>
//       <Title title="Add Product" />

//       {/* --- Form Fields --- */}
//       <Grid container spacing={{ xs: 2, md: 3 }}>
//         {fields.map((label) => (
//           <Grid item xs={12} md={6} key={label}>
//             <TextField
//               autoFocus={label === 'Name'}
//               label={label}
//               variant="outlined"
//               fullWidth
//               size="small"
//               InputProps={{
//                 sx: { borderRadius: 0 },
//               }}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* --- Table --- */}
//       <Box mt={{ xs: 4, md: 6 }} sx={{ overflowX: 'auto' }}>
//         <MaterialTable />
//       </Box>
//     </Container>
//   );
// };

// export default Page;

import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { Grid, TextField, Box } from '@mui/material';
import React from 'react';

const page = () => {
    return (
        <Box className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Add Product" />
            <Grid container spacing={{ xs: 2, md: 3 }}>
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
                        label="Temperature"
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
                        label="Ingredients"
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

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Weight or Volume"
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
                        label="Offer Price"
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
                        label="Food Item Id"
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
                        label="Starting Day"
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
                        label="Discontinued Day"
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
        </Box>
    );
};

export default page;
