# Fiori Disclosure Component

A lightweight, accessible disclosure widget (expandable/collapsible panel) built as a Web Component with no external dependencies. Perfect for filters, dropdowns, accordion-style menus, and collapsible content sections.

## Features

- **Dual Display Modes**: Inline expansion (default) or positioned popover overlay
- **Keyboard Accessible**: Full keyboard navigation support with Escape key to close
- **Click Outside Detection**: Automatically closes when clicking outside the component
- **Grouped Behavior**: Optionally collapse other disclosures in the same group
- **ARIA Compliant**: Proper ARIA attributes for screen reader support
- **Zero Dependencies**: Pure vanilla JavaScript Web Component
- **Customizable**: Easy styling via CSS custom properties

## Files Structure

```
fiori-disclosure/
├── index.html          # Demo page with usage examples
├── css/
│   ├── main.css       # Component styles with CSS custom properties
│   └── reset.css      # Modern CSS reset
├── js/
│   └── index.js       # Web Component implementation
└── README.md          # This documentation
```

## Installation

1. Copy the `fiori-disclosure` folder to your project
2. Include the required files in your HTML:

```html
<!-- Include CSS -->
<link rel="stylesheet" href="path/to/fiori-disclosure/css/reset.css" />
<link rel="stylesheet" href="path/to/fiori-disclosure/css/main.css" />

<!-- Include the component -->
<script type="module" src="path/to/fiori-disclosure/js/index.js"></script>
```

## Examples

The component includes a demonstration page (`index.html`) showing:

- Basic inline disclosure for language filters
- Popover-style disclosure for fruit filters

## Usage

### Basic Inline Disclosure

The default mode expands content inline below the toggle button:

```html
<fiori-disclosure>
  <button
    class="disclosure-toggle"
    type="button"
    aria-controls="content-id"
    aria-expanded="false"
    aria-haspopup="listbox"
  >
    <span>Choose Options</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  </button>
  <div class="disclosure-items-container" id="content-id">
    <ul>
      <li>
        <input type="checkbox" name="option" id="option1" />
        <label for="option1">Option 1</label>
      </li>
      <li>
        <input type="checkbox" name="option" id="option2" />
        <label for="option2">Option 2</label>
      </li>
    </ul>
  </div>
</fiori-disclosure>
```

### Popover Style Disclosure

Add the `as-popover` class to create an overlay-style disclosure:

```html
<fiori-disclosure class="disclosure-container as-popover">
  <button
    class="disclosure-toggle"
    type="button"
    aria-controls="popover-content"
    aria-expanded="false"
    aria-haspopup="listbox"
  >
    <span>More Options</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  </button>
  <div class="disclosure-items-container" id="popover-content">
    <!-- Your content here -->
  </div>
</fiori-disclosure>
```

### Grouped Disclosures

Use the `name` attribute to create groups where only one disclosure can be open at a time:

```html
<fiori-disclosure name="filters">
  <button
    class="disclosure-toggle"
    type="button"
    aria-controls="filter1"
    aria-expanded="false"
  >
    <span>Filter 1</span>
  </button>
  <div class="disclosure-items-container" id="filter1">
    <!-- Content -->
  </div>
</fiori-disclosure>

<fiori-disclosure name="filters">
  <button
    class="disclosure-toggle"
    type="button"
    aria-controls="filter2"
    aria-expanded="false"
  >
    <span>Filter 2</span>
  </button>
  <div class="disclosure-items-container" id="filter2">
    <!-- Content -->
  </div>
</fiori-disclosure>
```

When one disclosure in the "filters" group opens, the others automatically close.

## API Reference

### FioriDisclosure

The main Web Component class that manages disclosure behavior.

#### HTML Structure Requirements

The component expects this structure:

1. A **toggle button** with class `disclosure-toggle`

   - Must include `aria-controls` pointing to the content container ID
   - Must include `aria-expanded` (initially `false`)
   - Should include `aria-haspopup="listbox"` for appropriate semantics

2. A **content container** with class `disclosure-items-container`
   - Must have an `id` matching the toggle's `aria-controls`

#### Attributes

- `name` (optional) - Groups multiple disclosures together so only one in the group can be expanded at a time

#### CSS Classes

- `.disclosure-toggle` - Required class for the toggle button
- `.disclosure-items-container` - Required class for the content container
- `.disclosure-container` - Optional wrapper class for styling
- `.as-popover` - Modifier class to enable popover positioning mode

#### Keyboard Interactions

- **Escape** - Closes the disclosure and returns focus to the toggle button

#### Mouse Interactions

- **Click Toggle** - Opens/closes the disclosure
- **Click Outside** - Closes the disclosure when clicking anywhere outside the component

## Architecture & Code Explanation

### Web Component Implementation

The component is built using the Custom Elements API:

```javascript
class FioriDisclosure extends HTMLElement {
  // Private static selectors for DOM querying
  static #selectors = {
    disclosureToggle: ".disclosure-toggle",
    disclosureItemsContainer: ".disclosure-items-container",
  };

  // Private instance field for cached elements
  #elements;
```

#### Key Design Patterns

**1. Private Fields for Encapsulation**

Uses JavaScript private class fields (`#`) to prevent external access:

```javascript
#elements;                    // Cached DOM elements
#getElements()               // Retrieves required elements
#getIsExpanded()             // Checks expansion state
#toggleDrawer(isExpanded)    // Toggles the disclosure
#handleKeyboardEvents(event) // Handles keyboard interactions
#clickOutside(event)         // Handles click outside behavior
#collapseGroup(groupName)    // Collapses grouped disclosures
#addEventListeners()         // Sets up event delegation
```

**2. Static Selector Management**

Centralizes all CSS selectors as static private fields for maintainability:

```javascript
static #selectors = {
  disclosureToggle: ".disclosure-toggle",
  disclosureItemsContainer: ".disclosure-items-container",
};
```

**3. Element Caching**

Elements are queried once in the constructor and cached for performance:

```javascript
constructor() {
  super();
  this.#elements = this.#getElements();
  this.#addEventListeners();
}
```

**4. ARIA State Management**

The component manages `aria-expanded` to control visibility via CSS:

```javascript
#toggleDrawer(isExpanded) {
  const { disclosureToggle } = this.#elements;
  disclosureToggle.setAttribute("aria-expanded", !isExpanded);
}
```

**5. Event Delegation**

Uses event listeners on the document for click outside and keyboard events:

```javascript
document.addEventListener("click", this.#clickOutside.bind(this));
document.addEventListener("keyup", this.#handleKeyboardEvents.bind(this));
```

### CSS Architecture

**CSS Custom Properties**

The component uses CSS custom properties for easy theming:

```css
:root {
  --border-default: 1px solid #ccc;
  --disclosure-background-color: #fff;
  --size-8: 0.5rem;
  --size-16: 1rem;
  --trigger-block-size: 2.5rem;
  --top-layer: 900;
}
```

**CSS-Based Visibility**

Content visibility is controlled entirely through CSS using the `aria-expanded` attribute:

```css
.disclosure-items-container {
  display: none; /* Hidden by default */
}

.disclosure-toggle[aria-expanded="true"] + .disclosure-items-container {
  display: flex; /* Shown when toggle is expanded */
}
```

**Popover Positioning**

The `.as-popover` modifier enables absolute positioning:

```css
.disclosure-container.as-popover {
  position: relative;

  .disclosure-items-container {
    inline-size: 100%;
    inset-block-start: var(--trigger-block-size);
    position: absolute;
    z-index: var(--top-layer);
  }
}
```

**Modern CSS Features**

- Logical properties (`inline-size`, `block-size`, `inset-block-start`)
- Nesting syntax for better organization
- CSS custom properties for theming

### Event Flow

1. **User clicks toggle button** → `#toggleDrawer()` toggles `aria-expanded`
2. **CSS responds** → Visibility changes based on `[aria-expanded="true"]` selector
3. **Grouped behavior** → If `name` attribute exists, `#collapseGroup()` closes siblings
4. **Click outside** → `#clickOutside()` detects and closes disclosure
5. **Escape key** → `#handleKeyboardEvents()` closes and returns focus

## Styling

### CSS Custom Properties

Customize the component by overriding these CSS custom properties:

```css
:root {
  /* Border styling */
  --border-default: 1px solid #ccc;

  /* Colors */
  --disclosure-background-color: #fff;

  /* Spacing */
  --size-8: 0.5rem;
  --size-16: 1rem;

  /* Sizing */
  --trigger-block-size: 2.5rem;

  /* Z-index */
  --top-layer: 900;
}
```

### Custom Styling Examples

```css
/* Custom theme colors */
.my-disclosure {
  --disclosure-background-color: #f8f9fa;
  --border-default: 2px solid #007bff;
}

/* Custom button styling */
.my-disclosure .disclosure-toggle {
  background: linear-gradient(to bottom, #fff, #f0f0f0);
  border-radius: 0.25rem;
}

/* Custom content styling */
.my-disclosure .disclosure-items-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 0.25rem 0.25rem;
}
```

### Pointer Event Management

The component uses `pointer-events: none` on toggle button children to ensure consistent click targeting:

```css
.disclosure-toggle {
  /* Ensures child elements don't trigger separate click events */
  * {
    pointer-events: none;
  }
}
```

## Accessibility

The component is built with accessibility as a core principle:

### ARIA Implementation

- **`aria-expanded`**: Indicates whether content is expanded (`true`) or collapsed (`false`)
- **`aria-controls`**: Links the toggle button to the content container via ID
- **`aria-haspopup="listbox"`**: Indicates the button controls a listbox popup

### Keyboard Navigation

- **Escape Key**: Closes the disclosure and returns focus to the toggle button
- **Tab Key**: Standard tab navigation through interactive elements within the disclosure

### Screen Reader Support

Screen readers announce:

- The current state (expanded/collapsed) via `aria-expanded`
- The relationship between button and content via `aria-controls`
- The type of popup via `aria-haspopup`

### Focus Management

When closing via Escape key, focus automatically returns to the toggle button:

```javascript
if (event.key === "Escape" && isExpanded) {
  this.#toggleDrawer(isExpanded);
  disclosureToggle.focus(); // Return focus
}
```

## Browser Support

This component uses modern web standards and requires:

- **Custom Elements v1**: For Web Component functionality
- **ES6+ JavaScript**: Private class fields, arrow functions
- **CSS Nesting**: For nested CSS selectors (or use a PostCSS plugin)
- **Logical CSS Properties**: `inline-size`, `block-size`, etc.

**Minimum browser versions:**

- Chrome 111+ (for CSS nesting)
- Firefox 117+ (for CSS nesting)
- Safari 16.5+ (for CSS nesting)
- Edge 111+ (for CSS nesting)

**Polyfills/Alternatives:**

For older browsers, consider:

- Flattening CSS nesting
- Using physical properties instead of logical ones
- Polyfilling Custom Elements

## Performance

- **Lazy Evaluation**: Elements are cached once in the constructor
- **Event Delegation**: Minimal event listeners (one per component + two document-level)
- **CSS-Based Visibility**: No JavaScript required for showing/hiding content
- **Efficient Querying**: Uses `O(1)` attribute lookups and cached element references
- **Minimal DOM Manipulation**: Only updates `aria-expanded` attribute

## Common Use Cases

### 1. Filter Sidebar

```html
<aside class="filters">
  <fiori-disclosure name="sidebar-filters">
    <button
      class="disclosure-toggle"
      type="button"
      aria-controls="category-filters"
      aria-expanded="false"
    >
      <span>Categories</span>
    </button>
    <div class="disclosure-items-container" id="category-filters">
      <!-- Category checkboxes -->
    </div>
  </fiori-disclosure>

  <fiori-disclosure name="sidebar-filters">
    <button
      class="disclosure-toggle"
      type="button"
      aria-controls="price-filters"
      aria-expanded="false"
    >
      <span>Price Range</span>
    </button>
    <div class="disclosure-items-container" id="price-filters">
      <!-- Price range inputs -->
    </div>
  </fiori-disclosure>
</aside>
```

### 2. FAQ Accordion

```html
<section class="faq">
  <fiori-disclosure>
    <button
      class="disclosure-toggle"
      type="button"
      aria-controls="faq1"
      aria-expanded="false"
    >
      <span>How do I reset my password?</span>
    </button>
    <div class="disclosure-items-container" id="faq1">
      <p>To reset your password, click on "Forgot Password"...</p>
    </div>
  </fiori-disclosure>

  <fiori-disclosure>
    <button
      class="disclosure-toggle"
      type="button"
      aria-controls="faq2"
      aria-expanded="false"
    >
      <span>How do I contact support?</span>
    </button>
    <div class="disclosure-items-container" id="faq2">
      <p>You can contact support by...</p>
    </div>
  </fiori-disclosure>
</section>
```

### 3. Dropdown Menu

```html
<nav>
  <fiori-disclosure class="disclosure-container as-popover">
    <button
      class="disclosure-toggle"
      type="button"
      aria-controls="user-menu"
      aria-expanded="false"
    >
      <span>User Menu</span>
    </button>
    <div class="disclosure-items-container" id="user-menu">
      <ul>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  </fiori-disclosure>
</nav>
```

## Contributing

When contributing to this component, please follow these guidelines:

### Code Style

- Use private class fields (`#`) for internal methods and properties
- Use static private fields for shared constants
- Follow the existing naming conventions (camelCase for methods)
- Add JSDoc comments for public APIs

### Testing Checklist

- [ ] Test keyboard navigation (Escape key)
- [ ] Test click outside behavior
- [ ] Test grouped disclosure behavior
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Test in all supported browsers
- [ ] Verify ARIA attributes are correct
- [ ] Check focus management

### Performance Considerations

- Avoid unnecessary DOM queries (use cached elements)
- Minimize DOM manipulation
- Use CSS for visual changes when possible
- Consider event listener cleanup if adding new events

## License

This component is part of the common-components library. Please refer to the main project license for usage terms.
