import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Dark Knight', year: 2008 },
];
const AutoComplete = () => {
    return (
        <Autocomplete
            disablePortal
            options={top100Films}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Movie"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 0,
                        }
                    }}
                />
            )}
        />
    );
};

export default AutoComplete;