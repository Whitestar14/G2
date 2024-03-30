/** @format */

const versionInfo = {
  number: "2.0.0",
  type: "Stable",
  position: {
    bottom: "10px",
    right: "10px",
  },
  color: "#666",
};

export function displayVersionNumber() {
  const versionElement = document.createElement("p");
  versionElement.textContent = `Version: ${versionInfo.number} (${versionInfo.type} Release)`;
  versionElement.style.position = "absolute";
  versionElement.style.bottom = versionInfo.position.bottom;
  versionElement.style.right = versionInfo.position.right;
  versionElement.style.color = versionInfo.color;

  document.body.appendChild(versionElement);
}
