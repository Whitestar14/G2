// utils.js

/**
 * Creates a new HTML element with the specified type, classes, attributes, content, and event listeners.
 *
 * @param {string} type - The type of HTML element to create (e.g. 'div', 'button', 'p').
 * @param {string[]} [classes] - An array of CSS class names to add to the element.
 * @param {Object} [attributes] - An object of key-value pairs representing attributes to add to the element.
 * @param {(string|Node)[]} [content] - The content to add to the element, which can be a string or a Node object.
 * @param {Object} [events] - An object of key-value pairs representing event listeners to add to the element.
 * @returns {HTMLElement} The created HTML element.
 */

/**
 * Creates a container element and appends the provided nodes to it.
 *
 * @param {string} value - The CSS class name to add to the container element.
 * @param {...Node} nodes - The nodes to append to the container.
 * @returns {HTMLElement} The created container element.
 */
export function createElement(
  type,
  classes = [],
  attributes = {},
  content = [],
  events = {}
) {
  const element = document.createElement(type);

  // Add classes
  classes.forEach((className) => element.classList.add(className));

  // Add attributes
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  // Add content
  if (typeof content === "string") {
    element.textContent = content;
  } else {
    content.forEach((node) => {
      if (typeof node === "string") {
        element.appendChild(document.createTextNode(node));
      } else {
        element.appendChild(node);
      }
    });
  }

  // Add event listeners
  for (const [event, handler] of Object.entries(events)) {
    element.addEventListener(event, handler);
  }

  return element;
}

// Create container for the absolutely positioned buttons. Clearly, this
// is the only way out of the positioning dichotomy

export function createContainer(value, ...nodes) {
  const container = document.createElement("div");
  container.className = value + "-container";
  document.body.appendChild(container);

  nodes.forEach((node) => {
    container.appendChild(node);
  });

  return container;
}

