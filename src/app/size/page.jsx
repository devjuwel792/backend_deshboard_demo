'use client'
import React, { useState } from 'react';
import Title from '@/Components/common/Title/Title';
import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import { createSize, deleteSize, getSizes, updateSize } from '@/Utils/API/size';


const page = () => {
    const [sizes, setSizes] = useState([])
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [getSizeIsLoading, setSizeIsLoading] = useState(false)
    const [searchText, setSearchText] = useState("");
    const [selectedSize, setSelectedSize] = useState(null)
    const [sizeName, setSizeName] = useState("")
    const [error, setError] = useState("");


    const handlePageChange = (pagination) => {
        setPageIndex(pagination?.pageIndex || 0);
        setPageSize(pagination?.pageSize || 10);
    }
    const handleGlobalSearch = (searchText) => {
        setSearchText(searchText || "");
    }

    const handleCreate = async () => {
        if (!sizeName.trim()) {
            setError("Size name cannot be empty");
            return;
        }
        setError("");
        const result = await createSize({ name: sizeName });
        if (result?.success) {
            fetchSizes();
            setSizeName("");
        }
    };

    const getUpdateItem = (item) => {
        item && setSelectedSize(item);
        item && setSizeName(item?.name || "");
    }

    const handleUpdate = async () => {
        if (!sizeName.trim()) {
            setError("Size name cannot be empty");
            return;
        }
        setError("");
        const result = await updateSize(selectedSize?.id, {
            id: selectedSize?.id,
            name: sizeName
        });
        result?.success && fetchSizes();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this size?");
        if (!confirmDelete) return;
        const result = await deleteSize(id)
        console.log("🚀 ~ handleDelete ~ result:", result)
        result?.success && fetchSizes()
    }

    const fetchSizes = async () => {
        setSizeIsLoading(true)
        const result = await getSizes({
            pageSize: pageSize,
            pageIndex: pageIndex,
            searchText: searchText
        })
        if (result?.success) {
            setSizes(result.data)
        }
        setSizeIsLoading(false)
    }

    const Column = [
        { accessorKey: 'name', header: 'Name' },
    ]

    React.useEffect(() => {
        fetchSizes();
    }, [pageIndex, pageSize, searchText]);



    return (
        <Paper className='p-4' sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
            <Title title="Sizes" />
            <Grid container spacing={{ xs: 3, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        value={sizeName}
                        onChange={(e) => setSizeName(e.target.value)}
                        label="Size"
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
                onClick={selectedSize ? handleUpdate : handleCreate}
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
                {selectedSize ? "Update Size" : "Add Size"}
            </Button>
            {/* Table Below */}
            <Box mt={4} sx={{ overflowX: 'auto' }}>
                <MaterialTable
                    title={"Size List"}
                    data={sizes}
                    columns={Column}
                    onPagination={handlePageChange}
                    isLoading={getSizeIsLoading}
                    onSearch={handleGlobalSearch}
                    onDelete={handleDelete}
                    onUpdate={getUpdateItem}
                />
            </Box>
        </Paper>
    );
};

export default page;