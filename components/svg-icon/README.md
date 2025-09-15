# SVG Icon Web Component

A lightweight, customizable web component for displaying SVG icons from a sprite sheet. This component provides an easy way to include scalable vector icons in your web applications with minimal overhead.

## Features

- **Web Component**: Built using modern Web Components API for maximum compatibility
- **Sprite-based**: Uses SVG sprite sheets for efficient loading and caching
- **Customizable**: Supports custom dimensions and styling via CSS
- **Lightweight**: Minimal JavaScript footprint with lazy loading
- **Accessible**: Proper ARIA attributes and semantic markup

## Files Structure

```
svg-icon/
├── index.html          # Demo page with usage examples
├── svg-icon.js         # Main web component implementation
├── svg-icon-util.js    # Utility functions for icon loading
├── sprite.svg          # SVG sprite containing all icons
├── icons/              # Individual icon files
│   ├── info.svg
│   ├── person-raised-hand.svg
│   └── rocket.svg
└── typography/         # Custom font files
    └── Honk-Regular-VariableFont.woff2
```

## Installation

1. Copy the `svg-icon` folder to your project
2. Include the component script in your HTML:

```html
<script src="./svg-icon.js" type="module"></script>
```

## Usage

### Basic Usage

```html
<!-- Using the custom element directly -->
<svg-icon name="rocket" height="100" width="100"></svg-icon>

<!-- Using a custom sprite file -->
<svg-icon
  name="rocket"
  sprite-src="./custom-icons.svg"
  height="100"
  width="100"
></svg-icon>

<!-- Or create programmatically -->
<script>
  const svgIcon = document.createElement("svg-icon");
  svgIcon.setAttribute("name", "info");
  svgIcon.setAttribute("height", "50");
  svgIcon.setAttribute("width", "50");
  document.body.append(svgIcon);

  // With custom sprite source
  const customSvgIcon = document.createElement("svg-icon");
  customSvgIcon.setAttribute("name", "custom-icon");
  customSvgIcon.setAttribute("sprite-src", "./my-icons.svg");
  customSvgIcon.setAttribute("height", "32");
  customSvgIcon.setAttribute("width", "32");
  document.body.append(customSvgIcon);
</script>
```

### Custom Sprite Files

The component supports custom sprite files via the `sprite-src` attribute. This is useful when you have multiple icon sets or want to organize icons differently.

```html
<!-- Use a different sprite file -->
<svg-icon name="custom-icon" sprite-src="./my-icons.svg"></svg-icon>

<!-- Use a sprite from a CDN -->
<svg-icon
  name="external-icon"
  sprite-src="https://cdn.example.com/icons.svg"
></svg-icon>
```

**Note:** The sprite file must follow the same format as the default `sprite.svg` with `<symbol>` elements containing the icon definitions.

### Available Icons

The component comes with the following built-in icons:

- `close` - Close/X icon
- `critical` - Critical alert icon
- `default` - Default alert icon
- `info` - Information icon
- `person-raised-hand` - Person with raised hand icon
- `rocket` - Rocket icon
- `success` - Success checkmark icon
- `warning` - Warning alert icon

### Attributes

| Attribute    | Type          | Description                    | Default      |
| ------------ | ------------- | ------------------------------ | ------------ |
| `name`       | string        | Name of the icon to display    | Required     |
| `height`     | string/number | Height of the icon             | `16`         |
| `width`      | string/number | Width of the icon              | `16`         |
| `sprite-src` | string        | Custom path to the sprite file | `sprite.svg` |

### Styling

The component generates SVG elements with the following structure:

```html
<svg-icon name="rocket">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
    class="icon icon-rocket"
  >
    <!-- Icon path content -->
  </svg>
</svg-icon>
```

#### CSS Classes

- `.icon` - Base class for all icons
- `.icon-{name}` - Specific class for each icon (e.g., `.icon-rocket`)

#### Styling Examples

```css
/* Style all icons */
.icon {
  fill: #333;
  transition: fill 0.3s ease;
}

/* Style specific icons */
.icon-rocket {
  fill: hotpink;
  transform: rotate(90deg);
}

.icon-info {
  fill: white;
  height: 4rem;
  width: 4rem;
}

/* Hover effects */
.icon:hover {
  fill: #007bff;
}
```

## Adding New Icons

There are two ways to add new icons to the component:

### Method 1: Automated (Recommended for multiple icons)

For projects that need to add multiple icons frequently, you can set up automated sprite generation.

#### Setup for Automated Sprite Generation

1. Install the required dependency in your project:

```bash
npm install --save-dev svg-symbol-sprite
```

2. Add a script to your `package.json`:

```json
{
  "scripts": {
    "svg:sprite": "svg-symbol-sprite -i ./components/svg-icon/icons/ -o ./components/svg-icon/sprite.svg"
  }
}
```

3. Add your SVG files to the `icons/` directory
4. Run the sprite generation script:

```bash
npm run svg:sprite
```

This will automatically:

- Read all SVG files from the `icons/` directory
- Generate the `sprite.svg` file with proper `<symbol>` elements
- Use the filename (without extension) as the icon name

**Example workflow:**

```bash
# Add multiple icons to the icons/ directory
cp new-icons/*.svg ./components/svg-icon/icons/

# Generate the updated sprite file
npm run svg:sprite

# Icons are now available for use
<svg-icon name="star" height="24" width="24"></svg-icon>
<svg-icon name="heart" height="24" width="24"></svg-icon>
```

### Method 2: Manual (For single icons or custom control)

If you prefer to add icons manually or need custom control:

1. Add your SVG file to the `icons/` directory
2. Update the `sprite.svg` file to include your new icon as a `<symbol>` element
3. The icon will be automatically available using its filename (without extension)

**Example: Adding a single icon manually**

1. Create `icons/star.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 0l2.5 5.5L16 6l-4.5 4.5L13 16l-5-2.5L3 16l1.5-5.5L0 6l5.5-.5L8 0z"/>
</svg>
```

2. Add to `sprite.svg`:

```svg
<symbol id="icon-star" viewBox="0 0 16 16">
  <path d="M8 0l2.5 5.5L16 6l-4.5 4.5L13 16l-5-2.5L3 16l1.5-5.5L0 6l5.5-.5L8 0z"/>
</symbol>
```

3. Use in HTML:

```html
<svg-icon name="star" height="24" width="24"></svg-icon>
```

## Browser Support

This component uses modern web standards and requires:

- ES6 modules support
- Custom Elements v1
- Fetch API
- DOMParser

**Minimum browser versions:**

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Performance

- Icons are loaded lazily on first use
- The sprite sheet is cached after the first load
- Minimal JavaScript footprint (~1KB gzipped)
- No external dependencies

## Error Handling

If an icon is not found, the component will throw an error:

```javascript
// This will throw: "Icon not found: nonexistent"
<svg-icon name="nonexistent"></svg-icon>
```

## License

This component is part of the common-components library. Please refer to the main project license for usage terms.
