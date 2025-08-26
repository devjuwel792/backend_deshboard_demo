'use client'
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { createColor, deleteColor, getColors, updateColor } from '../../Utils/API/data';

const page = () => {

    const [colors, setColors] = useState([])
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [getColorIsLoading, setGetColorIsLoading] = useState(false)
    const [searchText, setSearchText] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [colorName, setColorName] = useState("");
    const [error, setError] = useState("");


    const handlePageChange = (pagination) => {
        setPageIndex(pagination?.pageIndex || 0);
        setPageSize(pagination?.pageSize || 10);
    }
    const handleGlobalSearch = (searchText) => {
        setSearchText(searchText || "");
    }

    const handleCreate = async () => {
        if (!colorName.trim()) {
            setError("Color name cannot be empty");
            return;
        }
        setError("")
        const result = await createColor({
            name: colorName,
        })
        console.log("🚀 ~ handleCreate ~ result:", result)
        if (result?.success) {
            fetchColors()
            setColorName("")
        }
    }

    const getUpdateItem = (item) => {
        item && setSelectedColor(item);
        item && setColorName(item?.name || "");
    }


    const handleUpdate = async () => {
        if (!colorName.trim()) {
            setError("Color name cannot be empty");
            return;
        }
        setError("")
        const result = await updateColor(selectedColor?.id, {
            id: selectedColor?.id,
            name: colorName || selectedColor?.name
        })
        console.log("🚀 ~ handleUpdate ~ result:", result)
        result?.success && fetchColors()
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this color?");
        if (!confirmDelete) return;
        const result = await deleteColor(id)
        console.log("🚀 ~ handleDelete ~ result:", result)
        result?.success && fetchColors()
    }

    const fetchColors = async () => {
        setGetColorIsLoading(true)
        const result = await getColors({
            pageSize: pageSize,
            pageIndex: pageIndex,
            searchText: searchText,
        })
        if (result?.success) {
            setColors(result.data)
        }
        setGetColorIsLoading(false)
    }

    const Column = [
        { accessorKey: 'name', header: 'Name' },
    ]

    React.useEffect(() => {
        fetchColors();
    }, [pageIndex, pageSize, searchText]);



    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Color" />
            <Grid container spacing={{ xs: 3, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!error}
                        helperText={error}
                        InputProps={{
                            sx: { borderRadius: 0 },
                        }}
                    />
                </Grid>
            </Grid>
            <Button
                onClick={selectedColor ? handleUpdate : handleCreate}
                style={{
                    padding: '5px 10px',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0px',
                    cursor: 'pointer',
                    marginTop: '16px'
                }}
                bg="primary"
                variant="contained"
            >
                {selectedColor ? "Update Color" : "Add Color"}
            </Button>
            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable
                    title={"Color List"}
                    data={colors}
                    columns={Column}
                    onPagination={handlePageChange}
                    isLoading={getColorIsLoading}
                    onSearch={handleGlobalSearch}
                    onDelete={handleDelete}
                    onUpdate={getUpdateItem}
                />
            </Box>
        </Paper>
    );
};

export default page;