export interface Card {
  id: string;
  title: string;
  description?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  order: number;
}

export interface Board {
  columns: Column[];
}
