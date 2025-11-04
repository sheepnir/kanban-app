"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, notes: string) => void;
}

export default function AddCardModal({
  isOpen,
  onClose,
  onSubmit,
}: AddCardModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit(title, description, notes);
    setTitle("");
    setDescription("");
    setNotes("");
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setNotes("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Title
          </label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter card title"
            autoFocus
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter card description (optional)"
            className="w-full h-20 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Notes
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes (optional)"
            className="w-full h-24 resize-none"
          />
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="secondary" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Card</Button>
        </div>
      </form>
    </Modal>
  );
}
