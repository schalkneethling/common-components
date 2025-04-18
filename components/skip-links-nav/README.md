# Skip Links navigation

This component allows users to easily jump to some of the main landmarks of your web page or application. By default, it has links to skip to your main navigation, site search, and the main content area. Feel free to edit the provided HTML as needed.

To use the component, link the stylesheet in the `head` of your document or main template:

```html
<link rel="stylesheet" type="text/css" href="main.css" media="screen" />
```

Then add the following HTML as the first element after the opening `body` tag:

```html
<body>
  <nav id="nav-access" aria-labelledby="skip-links-nav-label">
    <span class="visually-hidden" id="skip-links-nav-label">Skip links</span>
    <ul class="skip-links-nav">
      <li>
        <a href="#main-nav">Skip to main navigation</a>
      </li>
      <li>
        <a href="#content">Skip to main content</a>
      </li>
      <li>
        <a href="#main-q">Skip to search</a>
      </li>
    </ul>
  </nav>
</body>
```

It is also critical to ensure that:

1. The `id` referenced for each achor element exists on the page
2. The element you are linking to is focusable. If not, add `tabindex="-1"` to the element.

For example:

```html
<nav id="main-nav" tabindex="-1">...</nav>

<main id="main-content" tabindex="-1">...</main>
```

## Custom styling

The following custom properties are available for you to override:

```css
--skip-links-nav-link-background-color: rgba(255 255 255 / 90%);
--skip-links-nav-inline-size: 100%;
--skip-links-nav-link-color: #212121;
--skip-links-nav-outline: 0.0625rem solid #622aff;
--skip-links-nav-padding: 1rem;
--skip-links-nav-text-align: center;
--skip-links-nav-z-index: 999;
```

## How does it work?

When you [open the demo page](https://schalkneethling.github.io/common-components/components/skip-links-nav/), you will see a page with some links and content. You will _not_ see the skip-links navigation. Pressing the tab key on your keyboard will move focus to the first focusable element. Because anchor (`<a>`) elements are interactive and thus focusable elements, the first link in the list will receive focus and trigger the CSS to show the currently focused link.

> NOTE: Because the links are only hidden visually, they are also available to screen reader users. Also, be sure to read this article by TPGi: [When Is a Skip Link Needed?](https://www.tpgi.com/when-is-a-skip-link-needed/)

Questions, comments, suggestions? [Please raise an issue here on GitHub](https://github.com/schalkneethling/common-components/issues).
