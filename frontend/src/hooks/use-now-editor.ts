"use client";

import { useState } from "react";

import type { FormEvent } from "react";
import { toast } from "sonner";

import type { NowData } from "@/hooks/use-api";
import { useIsAuthenticated, useRoutes } from "@/hooks/use-api";

export const useNowEditor = () => {
  const { api } = useRoutes();
  const { isAuth, isAuthResolved } = useIsAuthenticated();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<NowData | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isSubmitting = api.now.post.isPending || api.now.put.isPending;
  const dialogMode: "edit" | "add" = editingItem ? "edit" : "add";

  const resetNowForm = () => {
    setShowModal(false);
    setEditingItem(null);
    setTitle("");
    setDescription("");
  };

  const handleOpenChange = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      resetNowForm();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      toast.error("TITLE AND DESCRIPTION ARE REQUIRED");
      return;
    }

    if (editingItem) {
      api.now.put.mutate(
        {
          id: editingItem.id,
          body: { title: trimmedTitle, desc: trimmedDescription },
        },
        {
          onSuccess: resetNowForm,
          onError: () => toast.error("FAILED TO SAVE"),
        }
      );
      return;
    }

    api.now.post.mutate(
      { body: { title: trimmedTitle, desc: trimmedDescription } },
      {
        onSuccess: resetNowForm,
        onError: () => toast.error("FAILED TO POST"),
      }
    );
  };

  const handleEdit = (item: NowData) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.desc);
    setShowModal(true);
  };

  const handleDelete = (item: NowData) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    api.now.delete.mutate(item.id, {
      onError: () => toast.error("FAILED TO DELETE"),
    });
  };

  return {
    isAuth: isAuthResolved && isAuth,
    items: api.now.get.data || [],
    showModal,
    dialogMode,
    title,
    description,
    isSubmitting,
    isLoading: api.now.get.isLoading || api.now.get.isPending,
    onOpenChange: handleOpenChange,
    onTitleChange: setTitle,
    onDescriptionChange: setDescription,
    onSubmit: handleSubmit,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };
};
