# Constants System

This directory contains a comprehensive constants system that eliminates magic numbers and hardcoded values throughout the application.

## Structure

### `design.ts`

Contains design system constants including:

- **Icon sizes** - Standardized icon dimensions (xs: 12px, sm: 14px, md: 16px, etc.)
- **Spacing** - Common spacing values for consistent layouts
- **Colors** - Border colors, text colors, and background colors for different states
- **Typography** - Text sizes and font weights
- **Dimensions** - Button heights, icon classes, card sizes
- **Padding/Margin** - Standardized spacing classes

### `layout.ts`

Contains layout-related constants including:

- **Z-index** - Layering values for overlays, modals, headers, etc.
- **Breakpoints** - Responsive design breakpoints matching Tailwind defaults
- **Grid** - Grid template columns and flexbox utilities
- **Container** - Max-width classes for different screen sizes
- **Position** - Position utility classes

### `animation.ts`

Contains animation and transition constants including:

- **Duration** - Animation durations in milliseconds and CSS classes
- **Easing** - Standard easing functions
- **Transitions** - Common transition combinations
- **Transforms** - Scale, translate, and rotate utilities
- **Auto-close delays** - For notifications and toasts

### `api.ts`

Contains API-related constants including:

- **HTTP status codes** - Standard HTTP response codes
- **Endpoints** - API endpoint paths
- **Timeouts** - Request timeout values
- **Retry configuration** - For failed requests
- **Cache settings** - TTL values for different content types

### `icons.ts`

Contains icon and image constants including:

- **Icon sizes** - Pixel values and Tailwind classes
- **Image paths** - Paths to static assets
- **Icon colors** - Color classes for different states
- **Avatar sizes** - Profile image dimensions

### `environment.ts`

Contains environment-specific constants including:

- **Environment URLs** - Different URLs for dev/prod
- **Feature flags** - Environment-based feature toggles
- **CORS configuration** - Allowed origins by environment
- **Database settings** - Connection configurations

## Usage

### Importing Constants

```typescript
// Import specific constants
import { ICON_SIZES, TEXT_COLORS } from '@/lib/constants';

// Import everything
import * as Constants from '@/lib/constants';

// Import specific categories
import { Z_INDEX, LAYOUT_SPACING } from '@/lib/constants/layout';
```

### Examples

#### Using Icon Sizes

```typescript
// Before
<ExternalLink size={14} />

// After
import { DEFAULT_ICON_SIZES } from '@/lib/constants';
<ExternalLink size={DEFAULT_ICON_SIZES.external_link} />
```

#### Using Colors

```typescript
// Before
className="hover:text-blue-500"

// After
import { TEXT_COLORS } from '@/lib/constants';
className={`hover:${TEXT_COLORS.blue}`}
```

#### Using Layout Constants

```typescript
// Before
className="z-50"

// After
import { Z_INDEX } from '@/lib/constants';
style={{ zIndex: Z_INDEX.header }}
```

#### Using Animation Constants

```typescript
// Before
setTimeout(() => dismiss(), 300);

// After
import { ANIMATION_DURATION } from '@/lib/constants';
setTimeout(() => dismiss(), ANIMATION_DURATION.medium);
```

## Benefits

1. **Consistency** - Ensures consistent values across the application
2. **Maintainability** - Easy to update values in one place
3. **Type Safety** - TypeScript support for better development experience
4. **Documentation** - Self-documenting code with meaningful constant names
5. **Searchability** - Easy to find where values are used
6. **Refactoring** - Safe to change values without breaking functionality

## API Constants

The API also has its own constants system in `/apps/api/src/constants/` with:

- Server configuration
- CORS settings
- HTTP status codes
- Response messages
- Query limits

## Migration

When updating existing code:

1. Identify hardcoded values (numbers, strings, colors)
2. Find or create appropriate constants
3. Replace magic values with constant references
4. Update imports to include the constants
5. Test to ensure functionality is preserved

## Adding New Constants

1. Determine the appropriate category (design, layout, animation, etc.)
2. Add the constant with a descriptive name
3. Include JSDoc comments for documentation
4. Export from the category file
5. Add to the main index.ts if it's commonly used
6. Update this README if adding a new category
