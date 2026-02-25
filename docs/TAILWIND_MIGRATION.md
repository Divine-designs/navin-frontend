# Tailwind CSS Migration Guide

This guide explains how to migrate existing vanilla CSS components to Tailwind CSS in the Navin frontend project.

## Overview

We've migrated from vanilla CSS to Tailwind CSS to achieve:
- **Consistent design tokens** across all components
- **Smaller bundle sizes** through tree-shaking unused styles
- **Better developer experience** with utility-first approach
- **Faster development** with pre-built utility classes
- **Easier maintenance** without separate CSS files

## Design System Configuration

Our Tailwind configuration (`tailwind.config.js`) includes custom theme tokens that match our design system:

### Colors
```javascript
colors: {
  primary: {
    DEFAULT: '#00D9FF',
    dark: '#008080',
    light: '#60C9CD',
  },
  accent: {
    blue: '#3B82F6',
    green: '#10B981',
    red: '#EF4444',
    teal: '#00C2CB',
  },
  background: {
    DEFAULT: '#050505',
    secondary: '#0A0A0A',
    card: '#0F1419',
    elevated: '#121620',
  },
  border: {
    DEFAULT: '#1E2433',
    light: 'rgba(0, 217, 255, 0.1)',
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: '#9CA3AF',
  },
}
```

### Fonts
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
  display: ['Bricolage Grotesque', 'sans-serif'],
  albert: ['Albert Sans', 'sans-serif'],
}
```

### Custom Shadows
```javascript
boxShadow: {
  'glow-blue': '-3px -2px 12px rgba(0, 194, 203, 0.18), -1px -2px 12px rgba(0, 194, 203, 0.29)',
  'glow-blue-hover': '-1px -2px 16px rgba(0, 194, 203, 0.4), -3px -2px 16px rgba(0, 194, 203, 0.25)',
  'inset-teal': 'inset 2px -2px 4px rgb(2, 43, 45), inset -2px 2px 4px rgba(13, 133, 137), inset -2px -2px 5px rgb(2, 43, 45)',
  'inset-teal-hover': 'inset 2px -2px 4px rgba(15, 139, 144, 0.25), inset -2px 2px 4px rgba(15, 139, 144, 0.25), inset -2px -2px 5px rgba(15, 139, 144, 0.9)',
}
```

## Migration Pattern

### Step 1: Identify CSS Classes

Look at the existing CSS file and identify:
- Layout properties (display, position, flex, grid)
- Spacing (margin, padding)
- Colors (background, text, border)
- Typography (font-size, font-weight)
- Effects (shadows, transitions, hover states)

### Step 2: Convert to Tailwind Utilities

Use this conversion reference:

#### Layout & Positioning
```css
/* CSS */
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;
```
```jsx
// Tailwind
className="flex justify-between items-center gap-4"
```

#### Spacing
```css
/* CSS */
padding: 1rem 2rem;
margin-bottom: 1.5rem;
```
```jsx
// Tailwind
className="px-8 py-4 mb-6"
```

#### Colors
```css
/* CSS */
background-color: #0F1419;
color: #ffffff;
border: 1px solid #1E2433;
```
```jsx
// Tailwind
className="bg-background-card text-white border border-border"
```

#### Typography
```css
/* CSS */
font-size: 1.5rem;
font-weight: 700;
line-height: 1.2;
```
```jsx
// Tailwind
className="text-2xl font-bold leading-tight"
```

#### Effects
```css
/* CSS */
border-radius: 16px;
transition: all 0.3s ease;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```
```jsx
// Tailwind
className="rounded-2xl transition-all duration-300 shadow-lg"
```

#### Hover States
```css
/* CSS */
.button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}
```
```jsx
// Tailwind
className="hover:bg-blue-600 hover:-translate-y-0.5"
```

### Step 3: Handle Responsive Design

Tailwind uses mobile-first breakpoints:

```css
/* CSS */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 1rem;
  }
}
```
```jsx
// Tailwind (mobile-first)
className="flex-col md:flex-row p-4 md:p-8"
```

Breakpoints:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Step 4: Complex Patterns

#### Pseudo-elements (::after, ::before)
For complex pseudo-elements, use Tailwind's arbitrary values:

```jsx
className="after:content-[''] after:absolute after:top-0 after:right-0 after:w-24 after:h-24"
```

#### Custom Gradients
```css
/* CSS */
background: linear-gradient(135deg, #00D9FF 0%, #0099CC 100%);
```
```jsx
// Tailwind (use custom gradient from config)
className="bg-gradient-primary"

// Or arbitrary value
className="bg-[linear-gradient(135deg,#00D9FF_0%,#0099CC_100%)]"
```

## Reusable Components

Instead of repeating utility classes, create reusable components:

### Button Component Example

```tsx
// src/components/Button/Button.tsx
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '' 
}) => {
  const baseStyles = 'px-6 py-3 rounded-full font-bold transition-all duration-300';
  
  const variantStyles = {
    primary: 'bg-accent-blue text-white hover:bg-blue-600',
    secondary: 'bg-background-elevated text-white hover:bg-background-card',
    outline: 'border border-border text-white hover:border-accent-blue',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
```

### Card Component Example

```tsx
// src/components/Card/Card.tsx
import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`bg-background-card border border-border rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

export default Card;
```

## When to Use Custom Classes vs Utilities

### Use Tailwind Utilities When:
- Styling is straightforward and readable
- You need responsive variants
- The pattern is used once or twice
- You want to see styles inline with JSX

### Create Custom Components When:
- The same pattern repeats 3+ times
- Complex combinations of utilities (10+ classes)
- You need variant logic (primary, secondary, etc.)
- The component has specific behavior/props

### Use CSS Classes When:
- Complex animations with keyframes
- Very complex pseudo-elements
- Browser-specific hacks
- Third-party library overrides

## Migration Checklist

For each component you migrate:

- [ ] Identify all CSS classes and their properties
- [ ] Convert layout and spacing to Tailwind utilities
- [ ] Convert colors using design tokens
- [ ] Convert typography using Tailwind classes
- [ ] Handle responsive breakpoints (mobile-first)
- [ ] Convert hover/focus states
- [ ] Test visual appearance matches original
- [ ] Delete the old CSS file
- [ ] Update imports (remove CSS import)
- [ ] Run `pnpm run build` to verify
- [ ] Run `pnpm run lint` to check for issues

## Common Patterns

### Navbar Pattern
```jsx
<nav className="absolute top-0 left-0 w-full bg-transparent z-[1000]">
  <div className="max-w-[1480px] mx-auto px-8 py-3 flex justify-between items-center">
    {/* Content */}
  </div>
</nav>
```

### Card with Glow Effect
```jsx
<div className="relative bg-background-card border border-border rounded-2xl p-5 overflow-hidden after:absolute after:top-0 after:right-0 after:w-24 after:h-24 after:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_70%)] after:pointer-events-none">
  {/* Content */}
</div>
```

### Status Badge
```jsx
<span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-accent-blue/10 text-blue-400">
  Active
</span>
```

### Glassmorphism Button
```jsx
<button className="px-8 py-3.5 bg-[rgba(1,56,59)] backdrop-blur-xs text-[#E5FFFF] font-bold rounded-full border border-[#60C9CD] shadow-glow-blue shadow-inset-teal hover:shadow-glow-blue-hover hover:-translate-y-0.5 transition-all duration-300">
  Click Me
</button>
```

## Troubleshooting

### Build Errors
If you see PostCSS errors, ensure you have:
```bash
pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/postcss
```

### Styles Not Applying
1. Check `tailwind.config.js` content paths include your files
2. Verify `@tailwind` directives are in `index.css`
3. Restart dev server after config changes

### Arbitrary Values Not Working
Use square brackets for custom values:
```jsx
className="w-[456px] bg-[#FF0000] top-[calc(100%-20px)]"
```

### Responsive Classes Not Working
Remember Tailwind is mobile-first:
```jsx
// Wrong: Desktop-first
className="flex-row sm:flex-col"

// Correct: Mobile-first
className="flex-col sm:flex-row"
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Play (Online Playground)](https://play.tailwindcss.com/)
- Our `tailwind.config.js` for custom tokens

## Examples

See these migrated components for reference:
- `src/components/Navbar/Navbar.tsx` - Complex navigation with responsive menu
- `src/components/Button/Button.tsx` - Reusable button with variants
- `src/components/Card/Card.tsx` - Reusable card component
- `src/components/dashboard/StatCard/StatCard.tsx` - Dashboard metric card

## Getting Help

If you're unsure how to convert a specific CSS pattern:
1. Check this guide for similar patterns
2. Look at the migrated components for examples
3. Ask in the team chat with a code snippet
4. Refer to Tailwind docs for specific utilities
