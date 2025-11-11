"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { Board, Column as ColumnType, Card as CardType } from "@/lib/types";
import Column from "@/components/Column";
import AddCardModal from "@/components/AddCardModal";
import CardDetailModal from "@/components/CardDetailModal";
import { Button } from "@/components/ui/Button";
import { Plus, Moon, Sun } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_BOARD: Board = {
  columns: [
    {
      id: "todo",
      title: "TODO",
      cards: [],
      order: 0,
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [],
      order: 1,
    },
    {
      id: "completed",
      title: "Completed",
      cards: [],
      order: 2,
    },
  ],
};

export default function Home() {
  const [board, setBoard] = useLocalStorage<Board>("kanban-board", DEFAULT_BOARD);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{
    columnId: string;
    card: CardType;
  } | null>(null);
  const [cardToAddColumnId, setCardToAddColumnId] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme on mount and when isDarkMode changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("theme-preference", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-preference");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeCardId = active.id;
    const overColumnId = over.id;

    setBoard((prevBoard) => {
      const newBoard = JSON.parse(JSON.stringify(prevBoard)) as Board;
      let activeCard: CardType | null = null;
      let activeColumnIndex = -1;
      let overColumnIndex = -1;

      // Find the card and source column
      for (let i = 0; i < newBoard.columns.length; i++) {
        const cardIndex = newBoard.columns[i].cards.findIndex(
          (c) => c.id === activeCardId
        );
        if (cardIndex !== -1) {
          activeCard = newBoard.columns[i].cards[cardIndex];
          activeColumnIndex = i;
          newBoard.columns[i].cards.splice(cardIndex, 1);
          break;
        }
      }

      // Find the target column
      overColumnIndex = newBoard.columns.findIndex((c) => c.id === overColumnId);

      // If we found both the card and target column, move it
      if (activeCard && overColumnIndex !== -1) {
        newBoard.columns[overColumnIndex].cards.push(activeCard);
      }

      return newBoard;
    });
  };

  const handleAddCard = (columnId: string) => {
    setCardToAddColumnId(columnId);
    setIsAddCardOpen(true);
  };

  const handleCreateCard = (title: string, description: string, notes: string) => {
    if (!cardToAddColumnId) return;

    const newCard: CardType = {
      id: uuidv4(),
      title,
      description,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBoard((prevBoard) => {
      const newBoard = JSON.parse(JSON.stringify(prevBoard)) as Board;
      const columnIndex = newBoard.columns.findIndex(
        (c) => c.id === cardToAddColumnId
      );
      if (columnIndex !== -1) {
        newBoard.columns[columnIndex].cards.push(newCard);
      }
      return newBoard;
    });

    setIsAddCardOpen(false);
    setCardToAddColumnId("");
  };

  const handleSelectCard = (columnId: string, card: CardType) => {
    setSelectedCard({ columnId, card });
  };

  const handleUpdateCard = (title: string, description: string, notes: string) => {
    if (!selectedCard) return;

    setBoard((prevBoard) => {
      const newBoard = JSON.parse(JSON.stringify(prevBoard)) as Board;
      const columnIndex = newBoard.columns.findIndex(
        (c) => c.id === selectedCard.columnId
      );
      if (columnIndex !== -1) {
        const cardIndex = newBoard.columns[columnIndex].cards.findIndex(
          (c) => c.id === selectedCard.card.id
        );
        if (cardIndex !== -1) {
          newBoard.columns[columnIndex].cards[cardIndex] = {
            ...newBoard.columns[columnIndex].cards[cardIndex],
            title,
            description,
            notes,
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return newBoard;
    });

    setSelectedCard(null);
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setBoard((prevBoard) => {
      const newBoard = JSON.parse(JSON.stringify(prevBoard)) as Board;
      const columnIndex = newBoard.columns.findIndex((c) => c.id === columnId);
      if (columnIndex !== -1) {
        newBoard.columns[columnIndex].cards = newBoard.columns[columnIndex].cards.filter(
          (c) => c.id !== cardId
        );
      }
      return newBoard;
    });
    setSelectedCard(null);
  };

  const handleAddColumn = () => {
    const columnTitle = prompt("Enter column title:");
    if (!columnTitle) return;

    const newColumn: ColumnType = {
      id: uuidv4(),
      title: columnTitle,
      cards: [],
      order: board.columns.length,
    };

    setBoard((prevBoard) => ({
      ...prevBoard,
      columns: [...prevBoard.columns, newColumn],
    }));
  };

  const handleGeneratePrompt = async (cardId: string): Promise<string | null> => {
    if (!selectedCard) return null;

    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectedCard.card.title,
          description: selectedCard.card.description,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error:", error.error);
        return null;
      }

      const data = await response.json();
      const generatedPrompt = data.prompt;

      // Update the card with the generated prompt
      setBoard((prevBoard) => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard)) as Board;
        const columnIndex = newBoard.columns.findIndex(
          (c) => c.id === selectedCard.columnId
        );
        if (columnIndex !== -1) {
          const cardIndex = newBoard.columns[columnIndex].cards.findIndex(
            (c) => c.id === cardId
          );
          if (cardIndex !== -1) {
            newBoard.columns[columnIndex].cards[cardIndex].aiPrompt =
              generatedPrompt;
            newBoard.columns[columnIndex].cards[cardIndex].updatedAt =
              new Date().toISOString();
          }
        }
        return newBoard;
      });

      return generatedPrompt;
    } catch (error) {
      console.error("Error generating prompt:", error);
      return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">My Projects</h1>
            <p className="text-slate-600 dark:text-slate-400">Organize your tasks with ease</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={handleAddColumn}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Column
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {board.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onAddCard={handleAddCard}
                onSelectCard={handleSelectCard}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {/* Modals */}
      <AddCardModal
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        onSubmit={handleCreateCard}
      />

      {selectedCard && (
        <CardDetailModal
          card={selectedCard.card}
          onClose={() => setSelectedCard(null)}
          onUpdate={handleUpdateCard}
          onDelete={() => handleDeleteCard(selectedCard.columnId, selectedCard.card.id)}
          onGeneratePrompt={handleGeneratePrompt}
        />
      )}
    </main>
  );
}
