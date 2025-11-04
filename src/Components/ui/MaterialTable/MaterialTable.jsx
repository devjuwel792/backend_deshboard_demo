"use client";
import * as React from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

const MaterialTable = ({
  data,
  columns,
  isLoading,
  onPagination,
  onSearch,
  onDelete,
  onUpdate,
  title,
}) => {
  console.log("🚀 ~ MaterialTable ~ data:", data);

  return (
    <div className="shadow mt-4 p-4">
      <h2 className="mb-4 text-black dark:text-white font-bold lg:text-2xl md:text-xl sm:text-lg">
        {title}
      </h2>

      {isLoading && <p>Loading...</p>}
      {!isLoading && data && (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, index) => (
                <TableHead key={index}>
                  {col.header}
                </TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {row[col.accessorKey]}
                  </TableCell>
                ))}
                <TableCell>
                  <button
                    onClick={() => onUpdate && onUpdate(row)}
                    className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer"
                  >
                    <CiEdit size={20} />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-500 hover:text-red-700 cursor-pointer">
                        <RiDeleteBin5Line size={20} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete && onDelete(row.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MaterialTable;
