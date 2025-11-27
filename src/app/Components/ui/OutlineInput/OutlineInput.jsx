import { Grid, TextField } from '@mui/material';
import React from 'react';

const OutlineInput = () => {
    return (
        <Grid>
            <TextField
                label="Input"
                variant="outlined"
                fullWidth
                size="small"
                // className='custom-textfield'
                InputProps={{
                    sx: { borderRadius: 0 },
                }}
            />
        </Grid>
    );
};

export default OutlineInput;