'use client';

import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

import MaterialTable from '@/Components/ui/MaterialTable/MaterialTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/Helper/Redux/features/api/categoryApiSlice';

const CategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [name, setName] = useState(category?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name });
    setName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {category ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery({
    page,
    limit: 10,
  });
  console.log("🚀 ~ CategoriesPage ~ categoriesData:", categoriesData)

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
  ];

  const handleCreate = async (categoryData) => {
    try {
      await createCategory(categoryData).unwrap();
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdate = async (categoryData) => {
    try {
      await updateCategory({ id: editingCategory.id, ...categoryData }).unwrap();
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  const handleSave = (categoryData) => {
    if (editingCategory) {
      handleUpdate(categoryData);
    } else {
      handleCreate(categoryData);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-500">Error loading categories: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={handleAddNew}>Add New Category</Button>
      </div>
      <MaterialTable
        data={categoriesData?.data?.data || []}
        columns={columns}
        isLoading={isLoading}
        title="Categories"
        onUpdate={handleEdit}
        onDelete={handleDelete}
        onPagination={handlePagination}
      />

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
}
