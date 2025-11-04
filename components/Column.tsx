"use client";

import {
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { Column as ColumnType, Card as CardType } from "@/lib/types";
import Card from "@/components/Card";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

interface ColumnProps {
  column: ColumnType;
  onAddCard: (columnId: string) => void;
  onSelectCard: (columnId: string, card: CardType) => void;
}

export default function Column({ column, onAddCard, onSelectCard }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-w-[360px] max-h-[calc(100vh-200px)] bg-gradient-to-b from-slate-800/60 to-slate-800/40 rounded-xl p-4 border border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">{column.title}</h2>
          <span className="px-2 py-1 bg-slate-700/50 rounded text-sm text-slate-300 font-medium">
            {column.cards.length}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <SortableContext
        items={column.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {column.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                columnId={column.id}
                onSelect={onSelectCard}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>

      {/* Add Card Button */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <Button
          onClick={() => onAddCard(column.id)}
          variant="ghost"
          className="w-full justify-start gap-2 text-slate-400 hover:text-white hover:bg-slate-700/30"
        >
          <Plus className="w-4 h-4" />
          Add Card
        </Button>
      </div>
    </motion.div>
  );
}
