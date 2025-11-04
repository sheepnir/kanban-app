"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card as CardType } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface CardDetailModalProps {
  card: CardType;
  onClose: () => void;
  onUpdate: (title: string, description: string, notes: string) => void;
  onDelete: () => void;
}

export default function CardDetailModal({
  card,
  onClose,
  onUpdate,
  onDelete,
}: CardDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [notes, setNotes] = useState(card.notes || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onUpdate(title, description, notes);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  if (showDeleteConfirm) {
    return (
      <Modal isOpen={true} onClose={() => setShowDeleteConfirm(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Delete Card?</h2>
          <p className="text-slate-300">
            Are you sure you want to delete this card? This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      {!isEditing ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white break-words">
            {title}
          </h2>

          {description && (
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                Description
              </h3>
              <p className="text-slate-400 whitespace-pre-wrap break-words">
                {description}
              </p>
            </div>
          )}

          {notes && (
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                Notes
              </h3>
              <p className="text-slate-400 whitespace-pre-wrap break-words">
                {notes}
              </p>
            </div>
          )}

          <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
            Created: {new Date(card.createdAt).toLocaleDateString()}
            {card.updatedAt !== card.createdAt && (
              <>
                <br />
                Updated: {new Date(card.updatedAt).toLocaleDateString()}
              </>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
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
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditing(false);
                setTitle(card.title);
                setDescription(card.description || "");
                setNotes(card.notes || "");
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
