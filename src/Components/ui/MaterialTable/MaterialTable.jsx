'use client'
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import * as React from "react";
import { CiEdit, CiMenuKebab } from 'react-icons/ci';
import { RiDeleteBin5Line } from "react-icons/ri";

const MaterialTable = ({ data, columns, isLoading, onPagination, onSearch, onDelete, onUpdate, title }) => {
    // Default table state
    const [pagination, setPagination] = React.useState({ pageIndex: data?.pageIndex, pageSize: data?.pageSize || 10 });
    // State to hold search text
    const [searchText, setSearchText] = React.useState('');
    // State to hold the record data
    React.useEffect(() => {
        onPagination && onPagination(pagination);
    }, [pagination]);
    // State to handle search text changes
    React.useEffect(() => {
        onSearch && onSearch(searchText);
    }, [searchText]);


    const newColumns = [
        ...(Array.isArray(columns) ? columns : []),
        // {
        //     accessorKey: 'image',
        //     header: 'Image',
        //     enableColumnFilter: false,
        //     enableColumnOrdering: false,
        //     enableSorting: false,
        //     enableGlobalFilter: false,
        //     Cell: ({ row }) => (
        //         <Avatar
        //             alt="User Image"
        //             src={row.original.image}
        //             sx={{
        //                 width: 40,
        //                 height: 40,
        //                 borderRadius: 50,
        //                 objectFit: 'cover',
        //             }}
        //         />
        //     ),
        // },

        // { accessorKey: 'description', header: 'Description' },
        // {
        //     accessorKey: 'isActive',
        //     header: 'Status',
        //     Cell: ({ row }) => {
        //         const isActive = row.original.isActive;
        //         return (
        //             <div>
        //                 {isActive ? <Badge /> : <ActiveBadge title={
        //                     "In Stock"
        //                 } />}
        //             </div>
        //         );
        //     },
        // },
        // {
        //     accessorKey: 'status',
        //     header: 'Status',
        //     cell: ({ row }) => <Switch />
        // },
        {
            accessorKey: 'Action',
            header: 'Action',
            enableColumnFilter: false,
            enableColumnOrdering: false,
            enableHiding: false,
            enableSorting: false,
            enableGlobalFilter: false,
            Cell: ({ row }) => {
                const [anchorEl, setAnchorEl] = React.useState(null);

                const handleMenuOpen = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleMenuClose = () => {
                    setAnchorEl(null);
                };

                return (
                    <>
                        <IconButton
                            size="small"
                            onClick={handleMenuOpen}
                            aria-controls="action-menu"
                            aria-haspopup="true"
                        >
                            <CiMenuKebab />
                        </IconButton>
                        <Menu
                            id="action-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    onUpdate(row.original);
                                    handleMenuClose();
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <CiEdit size={20} /> <span>Update</span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    console.log("🚀 ~ MaterialTable ~ newColumns:", newColumns)
                                    onDelete && onDelete(row.original.id);
                                    handleMenuClose();
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <RiDeleteBin5Line size={20} /> <span>Delete</span>
                                </div>
                            </MenuItem>
                        </Menu>
                    </>
                );
            },
        }
    ];


    console.log("🚀 ~ searchText:", searchText)

    return (
        <div className="shadow mt-4">
            <MaterialReactTable
                columns={newColumns}
                data={data?.data || []}
                enableRowSelection={true}
                enableColumnOrdering={true}
                enableRowNumbers={true}
                enableRowVirtualization={true}
                enableStickyHeader={true}
                getRowId={(row) => row.id}
                columnFilterDisplayMode="popover"
                initialState={{ showColumnFilters: false }}
                positionToolbarAlertBanner='bottom'
                muiPaginationProps={{
                    rowsPerPageOptions: [5, 10, 15, 20],
                    variant: 'outlined',
                }}
                muiTablePaperProps={{
                    elevation: 0,
                    className: 'shadow-none',
                }}
                paginationDisplayMode="pages"
                rowCount={data?.total}
                onPaginationChange={setPagination}
                manualPagination
                state={{
                    pagination,
                    isLoading: isLoading,
                    globalFilter: searchText, // Pass search text to table
                }}
                onGlobalFilterChange={setSearchText} // Listen for search changes
                renderTopToolbarCustomActions={() => (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                        className="ml-[10px]"
                    >
                        <div>
                            <h2 className="mb-[20px] text-black dark:text-white font-bold lg:text-2xl md:text-xl sm:text-lg">
                                {title}
                            </h2>
                            {/* <Button

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
                            </Button> */}
                        </div>
                        <div />
                    </div>
                )}
            />
        </div>
    );
};

export default MaterialTable;