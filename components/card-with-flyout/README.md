# Card with Flyout Component

A responsive card component with a flyout menu that appears when the user clicks on the options button. This component is designed to display content in a card format with an accessible options menu that appears as a popover.

## Features

- Responsive card layout with image, title, and description
- Options button that triggers a flyout menu
- Uses the HTML `popover` API for the flyout menu
- CSS Anchor Positioning for precise positioning of the flyout menu
- Fallback positioning when the flyout would overflow the viewport
- Fully accessible with proper ARIA attributes and keyboard support
- No JavaScript required (uses native browser APIs)

## How It Works

The component consists of:

1. **Card Container**: A container that holds the card content and options button
2. **Media Container**: Displays an image or other media
3. **Content Container**: Contains the title and description text
4. **Options Button**: A button that triggers the flyout menu
5. **Options Menu**: A popover menu that appears when the options button is clicked

The component uses the HTML `popover` API to show/hide the flyout menu and CSS Anchor Positioning to position the menu relative to the button. A polyfill is included for browsers that don't support these features.

## Usage

### HTML Structure

```html
<li class="card-container">
  <div class="card-media-container">
    <img
      src="./path/to/image.webp"
      height="500"
      width="750"
      alt="Description of the image"
    />
  </div>
  <div class="card-content-container">
    <a href="/link-to-content">
      <h2>Card Title</h2>
    </a>
    <p>Card description text goes here...</p>
  </div>
  <button
    class="card-options-trigger"
    type="button"
    popovertarget="unique-id-for-options"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
      />
    </svg>
    <span class="visually-hidden">Open options</span>
  </button>
  <ul class="reset-list card-options" id="unique-id-for-options" popover>
    <li><a href="/option1">Option 1</a></li>
    <li><a href="/option2">Option 2</a></li>
    <li><a href="/option3">Option 3</a></li>
  </ul>
</li>
```

### CSS Files

The component includes three CSS files:

1. `reset.css`: A CSS reset to ensure consistent styling across browsers
2. `main.css`: The main styling for browsers that support CSS Anchor Positioning
3. `main-with-polyfill.css`: Styling with polyfill support for browsers that don't support CSS Anchor Positioning

### Including the Component

```html
<head>
  <!-- Polyfill for CSS Anchor Positioning -->
  <script type="module">
    if (!("anchorName" in document.documentElement.style)) {
      import("https://unpkg.com/@oddbird/css-anchor-positioning");
    }
  </script>

  <!-- CSS Reset -->
  <link rel="stylesheet" type="text/css" href="css/reset.css" media="screen" />

  <!-- Choose one of the following based on your browser support needs -->
  <!-- For browsers supporting CSS Anchor Positioning -->
  <!-- <link rel="stylesheet" type="text/css" href="css/main.css" media="screen"> -->

  <!-- For all browsers (includes polyfill support) -->
  <link
    rel="stylesheet"
    type="text/css"
    href="css/main-with-polyfill.css"
    media="screen"
  />
</head>
```

## Browser Compatibility

- The component uses the HTML `popover` API, which is supported in modern browsers
- CSS Anchor Positioning is a newer feature with limited browser support
- A polyfill is included for browsers that don't support CSS Anchor Positioning
- The component is designed to work in all modern browsers with the polyfill

## CSS Customization

You can customize the appearance of the card by modifying the CSS variables:

```css
:root {
  --default-spacing: 1rem; /* Spacing between cards and internal padding */
  --options-inline-size: 13rem; /* Width of the options menu */
}
```

Other styling aspects can be customized by modifying the CSS classes in the `main.css` or `main-with-polyfill.css` files.

## Accessibility Features

- The options button includes a visually hidden label for screen readers
- The popover menu is properly associated with the button using `popovertarget`
- The component uses semantic HTML elements for better accessibility
- The component is keyboard accessible
