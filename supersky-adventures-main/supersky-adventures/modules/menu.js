// menu.js
import { createElement } from "./utils.js";

export default class Menu {
  constructor(gameLoop) {
    this.gameLoop = gameLoop;
    this.createMenuButton();
    this.createInGameMenu();
    this.addEventListeners();
  }

  createMenuButton() {
    const menuButton = createElement(
      "button",
      ["menu-button"],
      { id: "menuButton" },
      "Menu"
    );
    document.body.appendChild(menuButton);
  }

  createInGameMenu() {
    const inGameMenu = createElement("div", ["hidden"], { id: "inGameMenu" }, [
      createElement("h2", [], {}, "Game Menu"),
      createElement("label", [], { for: "framerateSlider" }, "Framerate:"),
      createElement("input", ["framerate-slider"], {
        type: "range",
        id: "framerateSlider",
        min: "30",
        max: "240",
        step: "10",
        value: "60",
      }),
      createElement(
        "span",
        ["framerate-value"],
        { id: "framerateValue" },
        "60"
      ),
      createElement("span", [], {}, " FPS"),
      createElement(
        "button",
        ["apply-settings"],
        { id: "applySettings" },
        "Apply"
      ),
      createElement("button", ["close-menu"], { id: "closeMenu" }, "Close"),
    ]);
    document.body.appendChild(inGameMenu);
  }

  addEventListeners() {
    document
      .getElementById("menuButton")
      .addEventListener("click", this.toggleMenu.bind(this));
    document
      .getElementById("applySettings")
      .addEventListener("click", this.applySettings.bind(this));
    document
      .getElementById("closeMenu")
      .addEventListener("click", this.toggleMenu.bind(this));
    document
      .getElementById("framerateSlider")
      .addEventListener("input", this.updateFramerateValue.bind(this));
  }

  toggleMenu() {
    document.getElementById("inGameMenu").classList.toggle("hidden");
  }

  applySettings() {
    const framerate = parseInt(
      document.getElementById("framerateSlider").value
    );
    this.gameLoop.setFramerate(framerate);
    this.startFramerateLoop(framerate);
    this.toggleMenu();
  }

  updateFramerateValue() {
    const framerate = parseInt(
      document.getElementById("framerateSlider").value
    );
    document.getElementById("framerateValue").innerText = framerate;
  }
}
