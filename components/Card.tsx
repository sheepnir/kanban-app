"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Card as CardType } from "@/lib/types";

interface CardProps {
  card: CardType;
  columnId: string;
  onSelect: (columnId: string, card: CardType) => void;
}

export default function Card({ card, columnId, onSelect }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(columnId, card);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-xl p-4 cursor-grab active:cursor-grabbing shadow-md hover:shadow-xl transition-all duration-200 ${
        isDragging ? "ring-2 ring-primary-500 opacity-90" : ""
      }`}
    >
      <div
        onClick={handleCardClick}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
      >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-slate-900 flex-1 line-clamp-2 text-sm">
          {card.title}
        </h3>
      </div>

      {card.description && (
        <p className="text-xs text-slate-600 mb-2 line-clamp-2">
          {card.description}
        </p>
      )}

      {card.notes && (
        <div className="flex items-center gap-1 text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
          <MessageSquare className="w-3 h-3" />
          <span>Notes</span>
        </div>
      )}
      </div>
    </motion.div>
  );
}
