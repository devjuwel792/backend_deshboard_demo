import * as React from "react";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { CiEdit, CiMenuKebab } from 'react-icons/ci';
import { RiDeleteBin5Line } from "react-icons/ri";
import Badge from "../Badge/Badge";
import ActiveBadge from "../Badge/ActiveBadge";
import { Switch } from "../Switch/Switch";

const MaterialTable = () => {

    const dummyData = [
        {
            id: '1',
            image: 'https://via.placeholder.com/40',
            name: 'John Doe',
            description: 'Sample user data',
            isActive: true,
        },
        {
            id: '2',
            image: 'https://via.placeholder.com/40',
            name: 'Jane Smith',
            description: 'Placeholder info',
            isActive: false,
        },
        {
            id: '3',
            image: 'https://via.placeholder.com/40',
            name: 'Alice Johnson',
            description: 'Another example user',
            isActive: true,
        },
    ];

    // Default table state
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 3 });
    const isLoading = false;

    const record = {
        data: dummyData,
        total: dummyData.length,
    };

    const handleDelete = () => {
    };

    const handelCreate = () => {
    };

    const handleUpdate = () => {
    };

    const columns = [
        {
            accessorKey: 'image',
            header: 'Image',
            enableColumnFilter: false,
            enableColumnOrdering: false,
            enableSorting: false,
            enableGlobalFilter: false,
            Cell: ({ row }) => (
                <Avatar
                    alt="User Image"
                    src={row.original.image}
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        objectFit: 'cover',
                    }}
                />
            ),
        },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'description', header: 'Description' },
        {
            accessorKey: 'isActive',
            header: 'Status',
            Cell: ({ row }) => {
                const isActive = row.original.isActive;
                return (
                    <div>
                        {isActive ? <Badge /> : <ActiveBadge title={
                            "In Stock"
                        } />}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => <Switch />
        },
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
                                    handleUpdate(row.original.id);
                                    handleMenuClose();
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <CiEdit size={20} /> <span>Update</span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleDelete(row.original.id);
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

    return (
        <div className="p-4 shadow mt-4">
            <MaterialReactTable
                columns={columns}
                data={record?.data || []}
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
                    rowsPerPageOptions: [3, 10, 15],
                    variant: 'outlined',
                }}
                muiTablePaperProps={{
                    elevation: 0,
                    className: 'shadow-none',
                }}
                paginationDisplayMode="pages"
                rowCount={record?.total}
                onPaginationChange={setPagination}
                manualPagination
                state={{
                    pagination,
                    isLoading: isLoading
                }}
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
                            <h2 className="mb-[20px]" style={{ fontSize: '30px' }}>
                                Material Table
                            </h2>
                            <Button
                                onClick={handelCreate}
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
                            </Button>
                        </div>
                        <div />
                    </div>
                )}
            />
        </div>
    );
};

export default MaterialTable;