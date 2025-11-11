"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card as CardType } from "@/lib/types";
import { Trash2, Sparkles, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface CardDetailModalProps {
  card: CardType;
  onClose: () => void;
  onUpdate: (title: string, description: string, notes: string) => void;
  onDelete: () => void;
  onGeneratePrompt?: (cardId: string) => Promise<string | null>;
}

export default function CardDetailModal({
  card,
  onClose,
  onUpdate,
  onDelete,
  onGeneratePrompt,
}: CardDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [notes, setNotes] = useState(card.notes || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState(card.aiPrompt || "");
  const [showPrompt, setShowPrompt] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

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

  const handleGeneratePrompt = async () => {
    if (!onGeneratePrompt) return;
    setIsGeneratingPrompt(true);
    try {
      const prompt = await onGeneratePrompt(card.id);
      if (prompt) {
        setGeneratedPrompt(prompt);
        setShowPrompt(true);
      }
    } catch (error) {
      console.error("Error generating prompt:", error);
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleCopyPrompt = async () => {
    if (generatedPrompt) {
      try {
        await navigator.clipboard.writeText(generatedPrompt);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  if (showDeleteConfirm) {
    return (
      <Modal isOpen={true} onClose={() => setShowDeleteConfirm(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Delete Card?</h2>
          <p className="text-slate-600 dark:text-slate-300">
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
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white break-words">
            {title}
          </h2>

          {description && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </h3>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-words">
                {description}
              </p>
            </div>
          )}

          {notes && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Notes
              </h3>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-words">
                {notes}
              </p>
            </div>
          )}

          {/* AI Prompt Section */}
          {onGeneratePrompt && (
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setShowPrompt(!showPrompt)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showPrompt ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  AI Prompt
                </button>
                <Button
                  onClick={handleGeneratePrompt}
                  disabled={isGeneratingPrompt}
                  size="sm"
                  className="text-xs"
                >
                  {isGeneratingPrompt ? "Generating..." : "Generate"}
                </Button>
              </div>

              {showPrompt && generatedPrompt && (
                <div className="bg-slate-100 dark:bg-slate-700/30 rounded-lg p-3 mb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xs font-medium text-slate-700 dark:text-slate-300 flex-1">
                      Generated Implementation Prompt
                    </h3>
                    <button
                      onClick={handleCopyPrompt}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors flex-shrink-0"
                      title="Copy prompt"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                    {generatedPrompt}
                  </p>
                  {copyFeedback && (
                    <p className="text-xs text-green-500 dark:text-green-400 mt-2">Copied to clipboard!</p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="text-xs text-slate-600 dark:text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-700">
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
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
