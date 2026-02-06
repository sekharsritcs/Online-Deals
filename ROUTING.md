# Routing Structure Documentation

## Overview

The application has been restructured to follow a proper routing pattern with:
- **App.tsx**: Handles routing configuration
- **pages/**: Contains all page components
- **components/layout/Layout.tsx**: Provides the structure wrapper (Header + Footer)

## New Structure

```
src/
├── App.tsx                    # Routing configuration
├── pages/                     # Page components
│   ├── Home.tsx              # Home page
│   ├── Deals.tsx             # Deals listing page
│   ├── About.tsx             # About page
│   ├── NotFound.tsx         # 404 page
│   └── index.ts              # Barrel export
├── components/
│   └── layout/
│       ├── Layout.tsx        # Layout wrapper (Header + Footer + Outlet)
│       ├── Header.tsx        # Navigation header
│       └── Footer.tsx        # Footer component
```

## Routing Configuration

### App.tsx
```typescript
<BrowserRouter>
  <Routes>
    <Route element={<Layout onSearch={handleSearch} />}>
      <Route path="/" element={<Home />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/about" element={<About />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  </Routes>
</BrowserRouter>
```

## Layout Component

The `Layout` component wraps all pages and provides:
- **Header**: Navigation and search bar
- **Footer**: Footer content
- **Outlet**: Renders child route components

```typescript
<Layout>
  <Header />
  <main>
    <Outlet /> {/* Child routes render here */}
  </main>
  <Footer />
</Layout>
```

## Pages

### Home Page (`/`)
- Displays carousel
- Shows deal categories
- Features tabs for different deal types
- Includes banner section

### Deals Page (`/deals`)
- Lists all available deals
- Category filtering
- Deal grid/list view

### About Page (`/about`)
- Company information
- Mission statement

### NotFound Page (`/404`)
- 404 error page
- Link back to home

## Navigation

The Header component uses React Router's `Link` component for navigation:
- Logo links to home (`/`)
- "Deals" link navigates to `/deals`
- "About" link navigates to `/about`
- Active route highlighting

## Usage Examples

### Adding a New Page

1. Create the page component in `src/pages/`:
```typescript
// src/pages/Contact.tsx
const Contact: React.FC = () => {
  return <div>Contact Page</div>;
};
export default Contact;
```

2. Export from `src/pages/index.ts`:
```typescript
export { default as Contact } from "./Contact";
```

3. Add route in `App.tsx`:
```typescript
<Route path="/contact" element={<Contact />} />
```

4. Add navigation link in `Header.tsx`:
```typescript
<Link to="/contact">Contact</Link>
```

### Programmatic Navigation

```typescript
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/deals");
  };
  
  return <button onClick={handleClick}>Go to Deals</button>;
};
```

### Getting Current Route

```typescript
import { useLocation } from "react-router-dom";

const MyComponent = () => {
  const location = useLocation();
  console.log(location.pathname); // "/deals"
};
```

## Benefits

1. **Separation of Concerns**: Pages are separate from layout
2. **Reusability**: Layout wraps all pages consistently
3. **Scalability**: Easy to add new pages
4. **Type Safety**: Full TypeScript support
5. **SPA Navigation**: No page reloads, smooth transitions

## Installation

Make sure `react-router-dom` is installed:
```bash
npm install react-router-dom
```

The package.json has been updated to include this dependency.
