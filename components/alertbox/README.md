# Alertbox Web Component

A flexible, accessible web component system for displaying dismissible alert banners and notifications. This component provides an easy way to show contextual messages to users with proper ARIA attributes and customizable themes.

## Features

- **Web Component**: Built using modern Web Components API for maximum compatibility
- **Accessible**: Proper ARIA attributes, semantic markup, and keyboard navigation
- **Themable**: Multiple built-in themes (default, success, warning, critical)
- **Dismissible**: Optional dismiss functionality with customizable behavior
- **Interactive Actions**: Support for buttons and links within banners
- **Permanent Dismissal**: Banners can be permanently dismissed across sessions
- **Date Range Support**: Banners can be configured to show only within specific date ranges
- **Event System**: Comprehensive event system for tracking banner interactions
- **Configurable**: JSON-based configuration for easy setup
- **Validated**: Built-in schema validation using Zod
- **Icon Integration**: Seamless integration with the SVG Icon component

## Files Structure

```
alertbox/
├── index.html              # Demo page with usage examples
├── css/
│   ├── alertbox.css        # Main component styles
│   └── reset.css           # CSS reset
├── js/
│   ├── alertbox-manager.js # Main manager component
│   ├── alertbox-banner.js  # Individual banner component
│   ├── alertbox-events.js  # Event system
│   ├── alertbox-constants.js # Constants and selectors
│   ├── alertbox-manager.test.js # Unit tests
│   ├── alertbox-events.test.js # Event tests
│   └── validator/
│       └── schema.js       # Zod validation schema
└── README.md               # This documentation
```

## Installation

1. Copy the `alertbox` folder to your project
2. Include the required scripts in your HTML:

```html
<!-- Include the alertbox manager -->
<script src="./js/alertbox-manager.js" type="module"></script>

<!-- Include the SVG icon component (required for icons) -->
<script src="../svg-icon/svg-icon.js" type="module"></script>
```

## Examples

The component includes several example HTML files demonstrating different features:

- `index.html` - Basic usage examples
- `button-link.html` - Examples with action buttons and links
- `date-range.html` - Examples with date range functionality
- `date-range-invalid.html` - Examples of invalid date ranges
- `mixed.html` - Mixed examples showing various configurations
- `permanent.html` - Examples with permanent dismissal
- `session.html` - Examples with session-based dismissal

## Usage

### Basic Usage

```html
<!-- Create the alertbox manager -->
<alertbox-manager
  aria-labelledby="alertbox-heading"
  role="group"
  config="alertbox-config"
>
  <h2 class="visually-hidden" id="alertbox-heading">Site notifications</h2>
</alertbox-manager>

<!-- Define banners in a JSON script -->
<script id="alertbox-config" type="application/json">
  [
    {
      "id": "welcome",
      "message": "Welcome to our website!",
      "theme": "success"
    },
    {
      "id": "maintenance",
      "message": "Scheduled maintenance tonight at 2 AM",
      "theme": "warning",
      "dismissable": true
    },
    {
      "id": "upgrade",
      "message": "New features available!",
      "theme": "success",
      "action": {
        "type": "button",
        "label": "Learn More"
      },
      "dismissable": true
    }
  ]
</script>
```

### Programmatic Usage

```html
<alertbox-manager id="my-alertbox"></alertbox-manager>

<script>
  const alertbox = document.getElementById("my-alertbox");

  // Add a single banner
  alertbox.addBanner({
    id: "error-1",
    message: "Something went wrong. Please try again.",
    theme: "critical",
    dismissable: true,
  });

  // Add a banner with an action button
  alertbox.addBanner({
    id: "action-1",
    message: "Your session will expire soon",
    theme: "warning",
    action: {
      type: "button",
      label: "Extend Session",
    },
    dismissable: true,
  });

  // Add a banner with a link action
  alertbox.addBanner({
    id: "link-1",
    message: "Check out our new features",
    theme: "success",
    action: {
      type: "link",
      label: "View Features",
      url: "https://example.com/features",
      target: "_blank",
    },
    dismissable: true,
  });

  // Add multiple banners
  alertbox.addBanners([
    {
      id: "info-1",
      message: "New features are now available!",
      theme: "default",
      dismissable: true,
    },
    {
      id: "success-1",
      message: "Your changes have been saved.",
      theme: "success",
    },
  ]);
</script>
```

### Available Themes

The component supports four built-in themes:

- `default` - Neutral gray theme for general information
- `success` - Green theme for positive feedback
- `warning` - Orange theme for cautionary messages
- `critical` - Red theme for errors and urgent alerts

### Banner Configuration

Each banner is configured using a JavaScript object with the following properties:

| Property      | Type    | Required | Default   | Description                                        |
| ------------- | ------- | -------- | --------- | -------------------------------------------------- |
| `id`          | string  | Yes      | -         | Unique identifier for the banner                   |
| `message`     | string  | Yes      | -         | The text content to display (min 5 characters)     |
| `theme`       | string  | No       | `default` | Visual theme (default, success, warning, critical) |
| `dismissable` | boolean | No       | `false`   | Whether the banner can be dismissed                |
| `dismissType` | string  | No       | `page`    | Dismiss behavior (permanent, session, page)        |
| `role`        | string  | No       | `status`  | ARIA role (status, alert)                          |
| `action`      | object  | No       | -         | Interactive action (button or link)                |
| `dateRange`   | object  | No       | -         | Date range for when banner should be displayed     |

### Action Configuration

The `action` property allows you to add interactive elements to banners:

| Property | Type   | Required | Description                                        |
| -------- | ------ | -------- | -------------------------------------------------- |
| `type`   | string | Yes      | Action type: `button` or `link`                    |
| `label`  | string | Yes      | Text displayed on the action element               |
| `url`    | string | No       | URL for link actions (required for links)          |
| `target` | string | No       | Link target (`_self`, `_blank`, `_parent`, `_top`) |

### Date Range Configuration

The `dateRange` property allows you to control when banners are displayed:

| Property | Type   | Required | Description                     |
| -------- | ------ | -------- | ------------------------------- |
| `start`  | string | Yes      | Start date in YYYY-MM-DD format |
| `end`    | string | Yes      | End date in YYYY-MM-DD format   |

### Example Configurations

```javascript
// Basic informational banner
{
  "id": "info-1",
  "message": "This is a basic informational message"
}

// Dismissible success banner
{
  "id": "success-1",
  "message": "Your account has been created successfully!",
  "theme": "success",
  "dismissable": true
}

// Critical alert that cannot be dismissed
{
  "id": "critical-1",
  "message": "System maintenance in progress. Some features may be unavailable.",
  "theme": "critical",
  "role": "alert"
}

// Warning with session-based dismissal
{
  "id": "warning-1",
  "message": "Your session will expire in 15 minutes",
  "theme": "warning",
  "dismissable": true,
  "dismissType": "session"
}

// Banner with action button
{
  "id": "action-1",
  "message": "New features are available!",
  "theme": "success",
  "action": {
    "type": "button",
    "label": "Learn More"
  },
  "dismissable": true
}

// Banner with external link action
{
  "id": "link-1",
  "message": "Visit our documentation",
  "theme": "default",
  "action": {
    "type": "link",
    "label": "Open Docs",
    "url": "https://docs.example.com",
    "target": "_blank"
  },
  "dismissable": true
}

// Banner with permanent dismissal
{
  "id": "permanent-1",
  "message": "This banner will be permanently dismissed",
  "theme": "default",
  "dismissable": true,
  "dismissType": "permanent"
}

// Banner with date range
{
  "id": "date-range-1",
  "message": "This banner only shows during the specified date range",
  "theme": "warning",
  "dismissable": true,
  "dateRange": {
    "start": "2025-01-01",
    "end": "2025-01-31"
  }
}
```

## Styling

The component uses CSS custom properties for easy theming and customization:

### CSS Custom Properties

```css
:root {
  /* Base styling */
  --border-radius-base: 0.5rem;
  --banner-font-family: system-ui, sans-serif;
  --banner-font-size-message: 1.5rem;
  --banner-icon-size: 1.5rem;
  --banner-padding-block: 0.5rem;
  --banner-padding-inline: 1rem;

  /* Default theme */
  --banner-color-default-background: #e0e7f2;
  --banner-color-default-color: #0f1928;

  /* Success theme */
  --banner-color-success-background: #cae9cb;
  --banner-color-success-color: #10280f;

  /* Warning theme */
  --banner-color-warning-background: #f8e1c4;
  --banner-color-warning-color: #28190f;

  /* Critical theme */
  --banner-color-critical-background: #f4d7d7;
  --banner-color-critical-color: #280f0f;
}
```

### Custom Styling Examples

```css
/* Custom theme colors */
:root {
  --banner-color-success-background: #d4edda;
  --banner-color-success-color: #155724;
}

/* Custom banner styling */
.alertbox-banner {
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Custom dismiss button */
.alertbox-banner-dismiss {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.alertbox-banner-dismiss:hover {
  background: rgba(0, 0, 0, 0.2);
}
```

## API Reference

### AlertBoxManager

The main component that manages all alert banners.

#### Methods

- `addBanner(banner)` - Add a single banner
- `addBanners(banners)` - Add multiple banners
- `getBanners()` - Get all current banners

#### Attributes

- `config` - ID of the JSON script element containing banner configuration

#### Events

- `click` - Handles dismiss button clicks
- `alertbox-event` - Custom event dispatched for banner interactions

### AlertBoxBanner

Individual banner component (created automatically by the manager).

#### Attributes

- `id` - Unique identifier
- `role` - ARIA role (status or alert)
- `class` - CSS classes including theme class

## Event System

The alertbox component includes a comprehensive event system for tracking banner interactions. All events are dispatched on the `document` object with the event name `alertbox-event`.

### Event Types

The component dispatches the following event types:

- `shown` - When a banner is displayed
- `dismissed` - When a banner is dismissed
- `actioned` - When an action button or link is clicked
- `error` - When validation or other errors occur

### Event Details

All events include the following properties in their `detail` object:

| Property       | Type   | Description                                   |
| -------------- | ------ | --------------------------------------------- |
| `bannerConfig` | object | The complete banner configuration object      |
| `bannerId`     | string | The unique identifier of the banner           |
| `eventType`    | string | The type of event (shown, dismissed, etc.)    |
| `timestamp`    | string | ISO 8601 timestamp of when the event occurred |

Additional properties for specific event types:

- **dismissed**: `dismissType` - The type of dismissal (permanent, session, page)
- **actioned**: `actionType` - The type of action (button, link)
- **error**: `error` - The error object or validation issues

### Event Handling Example

```javascript
document.addEventListener("alertbox-event", (event) => {
  const { bannerConfig, bannerId, eventType, timestamp } = event.detail;

  switch (eventType) {
    case "shown":
      console.log(`Banner ${bannerId} was shown at ${timestamp}`);
      break;
    case "dismissed":
      console.log(
        `Banner ${bannerId} was dismissed (${event.detail.dismissType})`,
      );
      break;
    case "actioned":
      console.log(
        `Action ${event.detail.actionType} clicked on banner ${bannerId}`,
      );
      break;
    case "error":
      console.error("Alertbox error:", event.detail.error);
      break;
  }
});
```

## Accessibility

The component is built with accessibility in mind:

- **ARIA Roles**: Proper `role` attributes for screen readers
- **Semantic HTML**: Uses appropriate HTML elements
- **Keyboard Navigation**: Dismiss buttons are keyboard accessible
- **Screen Reader Support**: Includes visually hidden text for context
- **Focus Management**: Proper focus handling for interactive elements

### ARIA Implementation

```html
<!-- Manager with proper grouping -->
<alertbox-manager role="group" aria-labelledby="alertbox-heading">
  <h2 id="alertbox-heading" class="visually-hidden">Site notifications</h2>
</alertbox-manager>

<!-- Individual banner -->
<alertbox-banner role="status" class="alertbox-banner alertbox-banner-success">
  <!-- Banner content -->
</alertbox-banner>
```

## Browser Support

This component uses modern web standards and requires:

- ES6 modules support
- Custom Elements v1
- CSS Custom Properties
- Fetch API (for external configurations)

**Minimum browser versions:**

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Dependencies

- **SVG Icon Component**: Required for displaying icons in banners
- **Zod**: Used for schema validation (included in the component)

## Error Handling

The component includes comprehensive error handling:

- **Validation Errors**: Invalid banner configurations are logged and skipped
- **Duplicate IDs**: Duplicate banner IDs are ignored with a console warning
- **Missing Configuration**: Graceful handling of missing or invalid JSON config

```javascript
// Invalid banner will be logged and skipped
alertbox.addBanner({
  message: "Too short", // Error: Message must be at least 5 characters
});

// Duplicate ID will be ignored
alertbox.addBanner({ id: "existing", message: "First banner" });
alertbox.addBanner({ id: "existing", message: "Second banner" }); // Ignored
```

## Performance

- **Lazy Rendering**: Banners are only rendered when the manager is connected to the DOM
- **Efficient Updates**: Uses Map for O(1) banner lookups
- **Minimal DOM Manipulation**: Only updates necessary elements
- **Validation Caching**: Schema validation is optimized for performance

## Testing

The component includes comprehensive unit tests covering:

- Banner addition and management
- Validation error handling
- Duplicate ID prevention
- DOM integration
- Configuration loading
- Event system functionality
- Date range validation

### Test Files

- `alertbox-manager.test.js` - Tests for the main manager component
- `alertbox-events.test.js` - Tests for the event system

Run tests with your preferred test runner:

```bash
# Using Vitest (as configured)
npm test

# Or with Node.js
node alertbox-manager.test.js
node alertbox-events.test.js
```

## License

This component is part of the common-components library. Please refer to the main project license for usage terms.
