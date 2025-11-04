# Kanban Board - Project Management App

A beautiful, modern project management Kanban board built with Next.js, React, and Tailwind CSS. Organize your tasks with smooth drag-and-drop functionality and persistent local storage.

## Features

✨ **Core Functionality**
- 📋 Drag-and-drop Kanban board with smooth animations
- 📝 Create, edit, and delete tasks
- 💾 Persistent local storage (no backend needed)
- ➕ Add custom columns beyond the default TODO, In Progress, and Completed
- 🎯 Add detailed notes to each card
- 🔄 Reorder cards and move them between columns seamlessly

🎨 **Design & UX**
- Beautiful dark theme with gradient backgrounds
- Smooth animations for all interactions
- Hover effects and visual feedback
- Responsive design for desktop and tablet
- Spring animations for modals
- Polished UI with proper spacing and shadows

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Drag & Drop**: [@dnd-kit](https://docs.dndkit.com/) - Modern drag-and-drop library
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Beautiful React animations
- **Icons**: [Lucide React](https://lucide.dev/) - Clean and consistent icon library
- **Storage**: Browser LocalStorage - No external database required
- **Language**: TypeScript - Type-safe development

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sheepnir/kanban-app.git
cd kanban-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Creating Tasks
1. Click **"Add Card"** button in any column
2. Enter task title (required), description, and notes (optional)
3. Click **"Create Card"** to add the task

### Managing Tasks
- **View/Edit**: Click any card to open the detail modal
- **Delete**: Click the trash icon in the detail modal
- **Move**: Drag cards between columns smoothly
- **Reorder**: Drag cards up/down within a column

### Creating Columns
1. Click **"Add Column"** button in the header
2. Enter a custom column title
3. Column is created and ready for tasks

### Data Persistence
All changes are automatically saved to your browser's local storage. Data persists between sessions.

## Project Structure

```
kanban-app/
├── app/
│   ├── page.tsx              # Main Kanban board page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles & Tailwind
├── components/
│   ├── Card.tsx              # Draggable task card
│   ├── Column.tsx            # Droppable column container
│   ├── AddCardModal.tsx       # Create card form
│   ├── CardDetailModal.tsx    # View/edit/delete modal
│   └── ui/                    # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── Textarea.tsx
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── utils.ts              # Utility functions
│   └── hooks/
│       └── useLocalStorage.ts # Custom hook for persistence
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.ts
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Key Components

### Page (`app/page.tsx`)
- Main Kanban board logic
- State management for board, columns, and cards
- Drag-and-drop integration with @dnd-kit
- Modal management for adding/editing cards

### Column (`components/Column.tsx`)
- Droppable container for cards
- Displays column header with card count
- Add card button
- Framer Motion animations

### Card (`components/Card.tsx`)
- Draggable task card with @dnd-kit/sortable
- Click to view/edit
- Visual feedback during drag (opacity, ring)
- Description and notes indicators

### Modals
- **AddCardModal**: Form to create new cards
- **CardDetailModal**: View full card details, edit, or delete

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme. The app uses:
- Primary: Purple/Blue tones
- Secondary: Cyan tones
- Accent: Orange tones

### Animations
Adjust animation timings in:
- `components/Column.tsx` - Column entrance animations
- `components/Card.tsx` - Card hover and drag animations
- `components/ui/Modal.tsx` - Modal spring animations

### Local Storage Key
The board data is stored in localStorage under the key `kanban-board`. To reset, run in browser console:
```javascript
localStorage.removeItem('kanban-board')
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## Future Enhancements

Potential features for future versions:
- 📱 Mobile app with React Native
- ☁️ Backend integration for cloud sync
- 👥 Collaborative editing with real-time updates
- 🏷️ Tags and categories for tasks
- 📊 Analytics and progress tracking
- 🎨 Customizable color schemes
- 🔍 Search and filter functionality
- 📅 Due dates and reminders
- 🔐 User authentication

## Performance

- Fast build times with Next.js Turbopack
- Optimized animations with Framer Motion
- Efficient drag-and-drop with @dnd-kit
- Minimal bundle size (no unnecessary dependencies)

## Accessibility

- Keyboard navigation support (via @dnd-kit)
- Semantic HTML structure
- Focus ring indicators on interactive elements
- Clear visual hierarchy

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created with ❤️ for beautiful, functional project management.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

**Happy task managing! 🚀**
