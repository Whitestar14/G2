# Changelog for Supersky Adventures Game Development Cycle

## Version 2.1.4b

### Fixed

- Updated the `createGameOverModal` function in the `gameOver.js` module to use the `createElement` function from the utility component module to create the modal content.
- Fixed the issue with creating a `<span>` element inside a `<p>` element using the `content` parameter of the `createElement` function.

### Changed

- Switched from a B&G theme style to a sepia-esque game theme tease.
- Changed the `supersky adventures` logo from `cloudboy` to `cloudjumper`.
- Refractored version.js from being entirely dependent on ui.js by containing its styles in './styles.css'
- Improved scoring system to increase score based on scoreticks and included a scoring multiplier that increases over time.

## Version 2.1.4a

### Added

- Integrated `handleInput` function to ensure the player object is correctly referenced when the game is restarted.
- Enhanced the `createElement` utility function to handle element creation and updates correctly.

### Changed

- Refactored `gameLoop.js` to include the `handleInput` function and ensure proper canvas element management.
- Updated `gameOver.js` to call the `resetGame` function correctly and manage the game over modal.
- Modified `ui.js` to ensure buttons are only created once, their event listeners are attached correctly, and focus is removed from buttons after they are clicked to avoid conflicts with the spacebar jump action.
- Improved `main.js` to correctly initialize the game and match the updated function signatures.
- Enhanced `collisions.js` to ensure collision detection is correctly managed.
- Refined `score.js` to manage the score correctly.
- Improved `player.js` to manage the player object correctly, including updating position and jumping logic.
- Enhanced `obstacles.js` to manage obstacles correctly, including updating positions and rendering.

### Fixed

- Resolved issues with the invalid canvas element error when clicking the restart button.
- Fixed the spacebar jump and button focus conflict by removing focus from the buttons after they are clicked.
- Addressed issues with duplicate UI elements by ensuring buttons are only created once.

## Version 2.1.3

### Fixed

- Major bug and logic fixes.
- Resolved the infinite jumping bug from player and canvas height determinant misappropriation.
- Fixed the new canvas instance on restart button click.
- Improved the obstacle spawning logic for plausible landing conditions.

### Changed

- Hammered a new and simplistic UI design.
- Cleaned the codebase of redundant code.
- Combined version.js and createButton.js into ui.js.

### Added

- Background and jumping special effects integrated.
- Included more keyboard event codes for jumping for cross-platform compatibility.
- Responsiveness for mobile and tablet screens.
- Reintegrated start button on Start Screen with version info, modules refactoring following suit.

## Version 2.1.2

### Added

- Integrated a pause button to allow players to pause and resume the game.
- Implemented a restart button to reset the game state and start a new game.
- Containerized the buttons in separate modules.

### Changed

- Positioned the pause and restart buttons at the bottom of the game canvas for better accessibility.
- Improved the restart button functionality to reset the game state without reloading the page.

### Fixed

- Fixed an issue where the pause button would only work once, preventing the game from resuming after being paused.

### Removed

- Removed the "play" button and version display functionality.

## Version 2.1.1

### Changed

- Refactored the codebase into separate modules for better organization and maintainability.
- Implemented a more realistic score incrementing system based on player progress.

### Fixed

- Resolved issues with player jumping functionality.

## Version 2.0.0 (Final Release)

### Added

- Completed development cycle with final optimizations and bug fixes.
- Game is now ready for deployment and public release.

## Version 1.9.0

### Fixed

- Resolved remaining issues with the game over modal and ensured smooth functionality.
- Conducted thorough testing to ensure stability and reliability of the game.

## Version 1.8.0

### Changed

- Made adjustments to the HTML structure to remove redundancy and improve efficiency.
- Optimized CSS styles for better rendering across different browsers.

## Version 1.7.0

### Fixed

- Addressed issues with redundant code and optimized performance.
- Fixed bugs related to the game over modal functionality.

## Version 1.6.0

### Added

- Bundled all JavaScript code into a single file for improved organization and performance.
- Enhanced overall code readability and maintainability.

## Version 1.5.0

### Changed

- Refactored JavaScript code to operate the game entirely through dynamically generated elements.
- Updated CSS styles to accommodate the changes in the HTML structure.

## Version 1.4.0

### Added

- Improved the game over modal to have a more comic-like appearance.
- Included a changelog file to track development progress.

## Version 1.3.0

### Fixed

- Fixed issues with the close button functionality in the game over modal.
- Ensured consistent styling across different screen sizes.

## Version 1.2.0

### Changed

- Refactored HTML to be generated dynamically using JavaScript.
- Modified CSS styles for better responsiveness and appearance.

### Removed

- Removed speech bubble from game over modal.

## Version 1.1.0

### Added

- Implemented speech bubble styling to enhance game over modal appearance.
- Added close button functionality to the game over modal

todo: canvas resizing affects ctx score text [find out how to manipulate it].
Error handling: when gameLoop does not fire, when canvas does not clear, when audio file does not load etc.
Summary of Potential Solutions:
Optimizing the Game Loop:
Minimize Function Calls: Reduce the number of function calls within the game loop by combining related tasks.
Efficient Collision Detection: Use spatial partitioning techniques like quad-trees or grid-based methods to optimize collision detection.
Frame Rate Management: Implement frame rate management to ensure the game runs smoothly even under heavy load.
Optimizing Rendering:
Partial Redraws: Instead of redrawing the entire canvas, only redraw the areas that have changed.
Offscreen Canvas: Use an offscreen canvas for complex drawing operations to reduce the load on the main canvas.

Sure, here's a streamlined todo list based on my previous suggestions:

1. Optimize game loop:
   - Combine related tasks to minimize function calls
   - Use a single loop for updating and rendering
2. Implement game states:
   - Introduce enumerable constants for different game states (e.g., Menu, Playing, Paused, GameOver)
   - Update gamestate accordingly in `gameLoop` function
3. Efficient collision detection:
   - Use spatial partitioning techniques like quad-trees or grid-based methods to narrow down potential collisions to a smaller subset of objects
4. Frame rate management:
   - Implement frame rate management logic that limits frames per second (FPS) or updates per second (UPS) based on target device capabilities or user settings preferences
5. Reduce redundant calculations:
   - Eliminate unnecessary calculations throughout the project to minimize processing power consumption
6. Profile tests:
   - Run regular profile tests to identify performance bottlenecks and optimize accordingly
