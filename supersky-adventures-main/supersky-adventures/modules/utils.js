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

