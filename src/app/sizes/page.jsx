"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/Components/ui/button";
import { Input } from "@/app/Components/ui/input";

import MaterialTable from "@/app/Components/ui/MaterialTable/MaterialTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/Components/ui/dialog";
import {
  useGetSizesQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} from "@/Helper/Redux/features/api/sizeApiSlice";

const SizeModal = ({ isOpen, onClose, size, onSave }) => {
  const [name, setName] = useState(size?.name || "");

  useEffect(() => {
    setName(size?.name || "");
  }, [size]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSave({ name });
    setName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {size ? "Edit Size" : "Add New Size"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Size Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter size name"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{size ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function SizesPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState(null);

  const {
    data: sizesData,
    isLoading,
    error,
  } = useGetSizesQuery({
    pageIndex: page - 1,
    pageSize: 10,
  });
  console.log("🚀 ~ SizesPage ~ sizesData:", sizesData);

  const [createSize] = useCreateSizeMutation();
  const [updateSize] = useUpdateSizeMutation();
  const [deleteSize] = useDeleteSizeMutation();

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
  ];

  const handleCreate = async (sizeData) => {
    try {
      await createSize(sizeData).unwrap();
    } catch (error) {
      console.error("Failed to create size:", error);
    }
  };

  const handleUpdate = async (sizeData) => {
    try {
      await updateSize({
        id: editingSize.id,
        ...sizeData,
      }).unwrap();
      setEditingSize(null);
    } catch (error) {
      console.error("Failed to update size:", error);
    }
  };

  const handleDelete = async (id) => {
   
      try {
        await deleteSize(id).unwrap();
      } catch (error) {
        console.error("Failed to delete size:", error);
      }
    
  };

  const handleSave = (sizeData) => {
    if (editingSize) {
      handleUpdate(sizeData);
    } else {
      handleCreate(sizeData);
    }
  };

  const handleEdit = (size) => {
    setEditingSize(size);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingSize(null);
    setIsModalOpen(true);
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-500">
          Error loading sizes: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sizes</h1>
        <Button onClick={handleAddNew}>Add New Size</Button>
      </div>
      <MaterialTable
        data={sizesData?.data?.data || []}
        columns={columns}
        isLoading={isLoading}
        title="Sizes"
        onUpdate={handleEdit}
        onDelete={handleDelete}
        onPagination={handlePagination}
      />

      <SizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={editingSize}
        onSave={handleSave}
      />
    </div>
  );
}
