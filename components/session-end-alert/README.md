# Session End Alert Component

A customizable web component that manages session timeouts and alerts users before their session expires. This component helps improve user experience by providing a proactive notification system that allows users to extend their session before being logged out.

## Features

- Configurable session timeout duration
- Cross-tab synchronization using localStorage
- Accessible dialog implementation
- Custom callback support for session extension
- Automatic session monitoring when switching between tabs

## Use Case

This component is particularly useful for:

- Systems with security timeout requirements
- Scenarios where user activity needs to be monitored
- Applications where maintaining session state is critical

## Installation

Add the component to your project:

```html
<script src="path/to/session-end-alert.js" type="module"></script>
```

## Usage

1. Add the component markup to your HTML:

```html
<session-end-alert>
  <dialog id="session-end-alert-dialog">
    <p>
      Your session is about to expire. Please click the "Extend Session" button
      to continue.
    </p>
    <button class="button primary">Extend Session</button>
  </dialog>
</session-end-alert>
```

2. Configure and initialize the component:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const sessionEndAlert = document.querySelector("session-end-alert");

  sessionEndAlert
    .configure(
      90000, // Duration in milliseconds (90 seconds in this example)
      () => {
        // Callback function when session is extended
        console.log("Session extended");
        // Add your session extension logic here
      },
    )
    .startTimer();
});
```

## Configuration Options

### Duration

The time in milliseconds before showing the alert dialog. Default is 1 hour (3600000ms).

### Callback Function

A required function that executes when the user clicks the "Extend Session" button. Use this to implement your session extension logic (e.g., making an API call to refresh the token).

## API Reference

### Methods

#### `configure(duration, callback)`

Sets up the component with custom duration and callback function.

- `duration`: Number of milliseconds before showing the alert
- `callback`: Function to execute when extending the session
- Returns: The component instance for method chaining

#### `startTimer()`

Begins the session countdown and initializes event listeners.

## Customization

The component uses a standard HTML dialog element, allowing you to customize its appearance using CSS.

## Browser Support

This component uses modern web technologies including:

- Custom Elements
- ES6 Classes
- Private class fields
- Dialog element

Ensure your target browsers support these features or provide appropriate polyfills.

## Example Implementation

```javascript
// Initialize the session alert with a 5-minute timeout
const sessionEndAlert = document.querySelector("session-end-alert");

sessionEndAlert
  .configure(300000, async () => {
    try {
      // Example: Call your API to extend the session
      const response = await fetch("/api/extend-session", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        // Handle error or redirect to login
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Failed to extend session:", error);
      window.location.href = "/login";
    }
  })
  .startTimer();
```

## Best Practices

1. Set an appropriate timeout duration based on your security requirements
2. Implement proper error handling in your callback function
3. Consider user experience when styling the alert dialog
4. Test the component across different tabs and windows
5. Ensure your session extension logic is secure and properly validated

## License

This component is part of the Fiori Common Components collection, licensed under MIT.
