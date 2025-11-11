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

🤖 **AI-Powered Features**
- ✨ Generate detailed implementation prompts using OpenAI
- 📋 Convert card titles into comprehensive feature requirements
- 📋 Get prompts optimized for Claude Code development
- 📋 Copy prompts to clipboard with one click
- 💾 Store generated prompts with cards

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
- **AI**: [OpenAI API](https://openai.com/) - GPT-powered prompt generation
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

3. **Configure OpenAI API (for AI features)**
Create a `.env.local` file in the project root with your OpenAI API key:
```env
OPENAI_API_KEY=your_api_key_here
```
Get your API key from [OpenAI Platform](https://platform.openai.com)

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
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

### Using AI Prompt Generation
1. Click on any card to open the detail modal
2. Look for the **"AI Prompt"** section at the bottom
3. Click the **"Generate"** button
4. Wait for OpenAI to generate a detailed implementation prompt (2-5 seconds)
5. The prompt appears in an expandable section
6. Click the **copy icon** to copy the entire prompt to clipboard
7. Paste the prompt into Claude Code to get detailed implementation guidance

The generated prompt includes:
- Clear objectives and goals
- Technical requirements and constraints
- File structure recommendations
- Key components needed
- Best practices and design patterns
- Testing considerations
- Performance and accessibility requirements

### Data Persistence
All changes are automatically saved to your browser's local storage. Data persists between sessions, including generated AI prompts.

## Project Structure

```
kanban-app/
├── app/
│   ├── page.tsx              # Main Kanban board page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & Tailwind
│   └── api/
│       └── generate-prompt/
│           └── route.ts      # OpenAI prompt generation API
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
- **CardDetailModal**: View full card details, edit, delete, and generate AI prompts

### API Routes
- **POST /api/generate-prompt**: Calls OpenAI API to generate implementation prompts from card title and description. Returns detailed, Claude Code-optimized prompts.

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

### AI Prompt Generation
The AI prompt generation uses OpenAI's GPT-3.5-turbo model by default. To customize:
- **Model**: Edit `app/api/generate-prompt/route.ts` line 27 to change the model (e.g., `gpt-4`)
- **Temperature**: Adjust the `temperature` parameter (0.7 default) for more/less creative responses
- **Max tokens**: Modify `max_tokens` to control prompt length (1500 default)
- **System prompt**: Customize the system message (lines 31-43) to change how prompts are generated

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## Future Enhancements

Potential features for future versions:
- 🤖 AI improvements: Claude 3 integration, custom system prompts per card
- 📱 Mobile app with React Native
- ☁️ Backend integration for cloud sync
- 👥 Collaborative editing with real-time updates
- 🏷️ Tags and categories for tasks
- 📊 Analytics and progress tracking
- 🎨 Customizable color schemes
- 🔍 Search and filter functionality
- 📅 Due dates and reminders
- 🔐 User authentication
- 💬 AI chat for task discussions
- 🔄 Version history for prompts

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
