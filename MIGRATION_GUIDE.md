# Migration Guide: Routing Structure

## What Changed

The application has been restructured from a single-page component to a proper routing-based architecture.

## Before

- All content was in `App.tsx`
- No routing - single page application
- Header and Footer were directly in App component

## After

- **App.tsx**: Contains routing configuration only
- **pages/**: All page components (Home, Deals, About, NotFound)
- **components/layout/Layout.tsx**: Wraps pages with Header and Footer
- **Header.tsx**: Updated to use React Router Links

## Installation Required

Before running the application, install react-router-dom:

```bash
npm install
```

This will install `react-router-dom` which is already added to `package.json`.

## File Structure

```
src/
├── App.tsx                    # Routes configuration
├── pages/
│   ├── Home.tsx              # Home page (moved from App.tsx)
│   ├── Deals.tsx             # New deals page
│   ├── About.tsx             # New about page
│   ├── NotFound.tsx          # 404 page
│   └── index.ts              # Exports
├── components/
│   └── layout/
│       ├── Layout.tsx        # NEW: Layout wrapper
│       ├── Header.tsx        # UPDATED: Uses React Router Links
│       └── Footer.tsx        # Unchanged
```

## Routes

- `/` - Home page
- `/deals` - Deals listing page
- `/about` - About page
- `/404` - Not found page
- `*` - Catch all, redirects to 404

## Next Steps

1. Run `npm install` to install react-router-dom
2. Test the application: `npm run dev`
3. Navigate between pages using the header links
4. Add more pages as needed following the same pattern

## Adding New Pages

1. Create page component in `src/pages/`
2. Export from `src/pages/index.ts`
3. Add route in `App.tsx`
4. Add navigation link in `Header.tsx` (optional)
