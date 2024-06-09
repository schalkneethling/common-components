# Skip to navigation (Also known as an a11y nav)

This component allows users to easily jump to some of the main landmarks of your web page or application. By default, it has links to skip to your main navigation, site search, and the main content area.

Feel free to edit the HTML as needed. To use the component add the HTML as the first element after your `body` element and link the stylesheet.

## How does it work?

When you [open the demo page](https://schalkneethling.github.io/common-components/components/skip-to-nav/), you will see a blank page. Pressing the tab key on your keyboard will move focus to the first focusable element. Because anchor (`<a>`) elements are interactive and thus focusable elements, the first link in the list will receive focus and trigger the CSS to show the currently focused link visually.

Because of the way the HTML elements are hidden, these links are also available to screen reader users.

## HTML

```html
<body>
    <ul id="nav-access" class="skip-to-nav">
        <li>
            <a href="#main-nav">
                Skip to main navigation
            </a>
        </li>
        <li>
            <a href="#content">
                Skip to main content
            </a>
        </li>
        <li>
            <a href="#main-q">
                Skip to search
            </a>
        </li>
    </ul>
</body>
```

## CSS

```css
<link rel="stylesheet" type="text/css" href="css/main.css" />
```

Questions, comments, suggestions? [Please raise an issue here on GitHub](https://github.com/schalkneethling/common-components/issues).
