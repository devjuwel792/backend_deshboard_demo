"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import MaterialTable from "@/Components/ui/MaterialTable/MaterialTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useGetColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} from "@/Helper/Redux/features/api/colorApiSlice";

const ColorModal = ({ isOpen, onClose, color, onSave }) => {
  const [name, setName] = useState(color?.name || "");

  useEffect(() => {
    setName(color?.name || "");
  }, [color]);

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
            {color ? "Edit Color" : "Add New Color"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Color Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter color name"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{color ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function ColorsPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);

  const {
    data: colorsData,
    isLoading,
    error,
  } = useGetColorsQuery({
    pageIndex: page - 1,
    pageSize: 10,
  });
  console.log("🚀 ~ ColorsPage ~ colorsData:", colorsData);

  const [createColor] = useCreateColorMutation();
  const [updateColor] = useUpdateColorMutation();
  const [deleteColor] = useDeleteColorMutation();

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
  ];

  const handleCreate = async (colorData) => {
    try {
      await createColor(colorData).unwrap();
    } catch (error) {
      console.error("Failed to create color:", error);
    }
  };

  const handleUpdate = async (colorData) => {
    try {
      await updateColor({
        id: editingColor.id,
        ...colorData,
      }).unwrap();
      setEditingColor(null);
    } catch (error) {
      console.error("Failed to update color:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this color?")) {
      try {
        await deleteColor(id).unwrap();
      } catch (error) {
        console.error("Failed to delete color:", error);
      }
    }
  };

  const handleSave = (colorData) => {
    if (editingColor) {
      handleUpdate(colorData);
    } else {
      handleCreate(colorData);
    }
  };

  const handleEdit = (color) => {
    setEditingColor(color);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingColor(null);
    setIsModalOpen(true);
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-500">
          Error loading colors: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Colors</h1>
        <Button onClick={handleAddNew}>Add New Color</Button>
      </div>
      <MaterialTable
        data={colorsData?.data?.data || []}
        columns={columns}
        isLoading={isLoading}
        title="Colors"
        onUpdate={handleEdit}
        onDelete={handleDelete}
        onPagination={handlePagination}
      />

      <ColorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        color={editingColor}
        onSave={handleSave}
      />
    </div>
  );
}
