# Memory Game

A classic memory game for two players, built with TypeScript, HTML, and SCSS. Choose a card theme, select the starting player and board size, and find as many matching pairs as possible.

## Features

- Two-player memory game with blue and orange players
- Four selectable card themes
- Three board sizes with 16, 24, or 36 cards
- Cards are shuffled randomly at the start of each game
- Score tracking, player turns, and win or draw detection
- Theme and board previews in the settings

## Prerequisites

- [Node.js](https://nodejs.org/) (including npm)

## Installation and Setup

```bash
git clone <repository-url>
cd Memory
npm install
npm run dev
```

After startup, Vite displays the local application URL in the terminal.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## How to Play

1. Open the settings from the start page.
2. Choose a theme, the starting player, and the board size.
3. Turn over two cards.
4. If they match, the current player scores a point and takes another turn.
5. If they do not match, they are turned face down again and the other player takes a turn.
6. Once all pairs have been found, the player with the most points wins. A tie results in a draw.

## Board Sizes

| Cards | Board |
| ---: | :--- |
| 16 | 4 × 4 |
| 24 | 4 × 6 |
| 36 | 6 × 6 |

Each image appears twice to form a matching pair.

## Available Themes

- **Code Vibes** (`cTheme`): Programming and technology-inspired images
- **Gaming** (`gTheme`): Images inspired by gaming
- **DA Projects** (`dTheme`): Images featuring Developer Akademie projects
- **Food** (`fTheme`): Food-inspired images

## Technologies

- HTML for page structure and templates
- TypeScript for game state, settings, and game logic
- SCSS for layouts and themes
- Vite as the development server and build tool
- DOM APIs for dynamic rendering and interactions

## Project Structure

```text
public/
  assets/
    cards/       Card images organized by theme
    draw/        Additional image assets
  fonts/         Local font files
src/
  modules/       Game, card, UI, and settings logic
  styles/        SCSS modules and themes
  template/      HTML templates for game views
  types/         TypeScript types for the game and settings
  main.ts        Application entry point
index.html
package.json
vite.config.ts
tsconfig.json
```

## Available npm Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Type-checks the project and creates a production build. |
| `npm run preview` | Serves the production build locally. |

## License
This project was created for educational and portfolio purposes.

## Developer
Peter Ketterlinus