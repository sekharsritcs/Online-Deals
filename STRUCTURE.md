# Project Structure Documentation

## Overview

The codebase has been reorganized into a proper, scalable folder structure with improved TypeScript types and component-based architecture.

## New Folder Structure

```
src/
├── components/              # React components organized by purpose
│   ├── layout/             # Layout components (Header, Footer)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts        # Barrel export
│   ├── features/           # Feature-specific components
│   │   ├── Carousel.tsx
│   │   ├── Tabs.tsx
│   │   ├── DealCategories.tsx
│   │   ├── BannerSection.tsx
│   │   └── index.ts        # Barrel export
│   ├── ui/                 # Reusable UI components
│   │   ├── ModernSearchBar.tsx
│   │   ├── SearchBar.tsx
│   │   └── index.ts        # Barrel export
│   └── index.ts            # Main barrel export
│
├── constants/              # Application constants
│   ├── categories.ts      # Category definitions
│   ├── carousel.ts        # Carousel image URLs
│   └── tabs.tsx           # Tab configurations (TSX for JSX content)
│
├── config/                # Configuration files
│   └── api.config.ts      # API configuration
│
├── services/              # API services
│   ├── httpClient.ts      # Axios HTTP client
│   ├── categoryService.ts # Category API service
│   └── index.ts           # Barrel export
│
├── types/                 # TypeScript type definitions
│   ├── category.ts        # Category interfaces
│   ├── deal.ts            # Deal interfaces
│   └── index.ts           # Barrel export
│
├── utils/                 # Utility functions
│   └── index.ts           # Helper functions
│
├── App.tsx                # Main App component
└── main.tsx               # Application entry point
```

## Key Improvements

### 1. Component Organization
- **Layout Components**: Header, Footer - structural components
- **Feature Components**: Carousel, Tabs, DealCategories, BannerSection - business logic components
- **UI Components**: SearchBar, ModernSearchBar - reusable UI primitives

### 2. TypeScript Improvements
- ✅ Proper interfaces for all component props
- ✅ Type-safe constants with `as const`
- ✅ Better type definitions for services
- ✅ Proper type imports using `type` keyword
- ✅ No `any` types - fully typed

### 3. Constants Extraction
- Categories moved to `src/constants/categories.ts`
- Carousel images moved to `src/constants/carousel.ts`
- Tab configs moved to `src/constants/tabs.tsx`

### 4. Configuration Management
- API config centralized in `src/config/api.config.ts`
- Environment variables support via `.env.example`
- Type-safe configuration access

### 5. Service Layer
- HTTP client configured with API settings
- Service methods properly typed
- Barrel exports for easy imports

### 6. Utility Functions
- Currency formatting
- Date formatting
- Discount calculation
- Debounce function

## Import Examples

### Before
```typescript
import Header from "./components/Header";
import Carousel from "./components/Carousel";
```

### After
```typescript
import { Header, Footer } from "./components/layout";
import { Carousel, Tabs } from "./components/features";
import { ModernSearchBar } from "./components/ui";
```

## Component Props

All components now have proper TypeScript interfaces:

```typescript
interface CarouselProps {
  images: readonly string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}
```

## Constants Usage

```typescript
import { CATEGORIES } from "./constants/categories";
import { CAROUSEL_IMAGES } from "./constants/carousel";
import { TAB_CONFIGS } from "./constants/tabs";
```

## Benefits

1. **Scalability**: Easy to add new features without cluttering
2. **Maintainability**: Clear separation of concerns
3. **Type Safety**: Full TypeScript coverage
4. **Reusability**: Components organized by purpose
5. **Testability**: Isolated components and services
6. **Developer Experience**: Barrel exports simplify imports

## Migration Notes

- Old component files in `src/components/` root have been removed
- All imports updated to use new structure
- Constants extracted from components
- TypeScript types improved throughout
