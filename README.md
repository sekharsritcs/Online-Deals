# Woah Deals UI

A modern React + TypeScript + Vite application for discovering and browsing deals.

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── features/       # Feature components (Carousel, Tabs, DealCategories, BannerSection)
│   └── ui/            # Reusable UI components (SearchBar, ModernSearchBar)
├── constants/          # Application constants
│   ├── categories.ts  # Category definitions
│   ├── carousel.ts    # Carousel image URLs
│   └── tabs.ts        # Tab configurations
├── config/            # Configuration files
│   └── api.config.ts  # API configuration
├── services/          # API services
│   ├── httpClient.ts  # Axios HTTP client instance
│   └── categoryService.ts  # Category API service
├── types/             # TypeScript type definitions
│   ├── category.ts    # Category interfaces
│   └── deal.ts        # Deal interfaces
├── utils/             # Utility functions
│   └── index.ts       # Helper functions
├── App.tsx            # Main App component
└── main.tsx           # Application entry point
```

## Features

- **Component-Based Architecture**: Well-organized components by feature and purpose
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Built with Tailwind CSS and Framer Motion
- **Responsive Design**: Mobile-first approach
- **API Integration**: Ready for backend integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Add your API key to `.env`:
   ```
   VITE_API_KEY=your_api_key_here
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview production build:
```bash
npm run preview
```

## Component Organization

### Layout Components (`src/components/layout/`)
- **Header**: Main navigation header with search bar
- **Footer**: Footer with social media links

### Feature Components (`src/components/features/`)
- **Carousel**: Image carousel with auto-play
- **Tabs**: Tabbed interface component
- **DealCategories**: Category filter component
- **BannerSection**: Hero banner section

### UI Components (`src/components/ui/`)
- **ModernSearchBar**: Modern search input with icon
- **SearchBar**: Classic search bar component

## TypeScript Types

All types are defined in `src/types/`:
- `Category`: Category interface
- `Deal`: Deal interface
- `DealExtended`: Extended deal interface

## Constants

Application constants are organized in `src/constants/`:
- `CATEGORIES`: Available categories
- `CAROUSEL_IMAGES`: Default carousel images
- `TAB_CONFIGS`: Tab configurations

## Services

API services are in `src/services/`:
- `httpClient`: Configured Axios instance
- `categoryService`: Category CRUD operations

## Utilities

Helper functions in `src/utils/`:
- `formatCurrency`: Format numbers as currency
- `calculateDiscountPercentage`: Calculate discount percentage
- `formatDate`: Format date strings
- `debounce`: Debounce function calls

## Environment Variables

- `VITE_API_KEY`: API key for authentication
- `VITE_API_BASE_URL`: API base URL (optional)

## Technologies

- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Axios**: HTTP client
- **React Icons**: Icon library

## License

MIT
