/**
 * Represents the available game themes.
 */
export type GameTheme = "cTheme" | "gTheme" | "dTheme" | "fTheme" | null;

/**
 * Represents the available player choices.
 */
export type ChoosedPlayer = "pBlue" | "pOrange" | null;

/**
 * Represents the available board sizes.
 */
export type BoardSize = "bSize1" | "bSize2" | "bSize3" | null;

/**
 * Form state for the game theme.
 */
export interface ThemeForm {
    selectedTheme: GameTheme;
}

/**
 * Form state for player selection.
 */
export interface ChoosedPlayerForm {
    selectedPlayer: ChoosedPlayer;
}

/**
 * Form state for board size selection.
 */
export interface BoardSizeForm {
    selectedBoardSize: BoardSize;
}

/**
 * Complete game settings configuration.
 */
export interface GameSettings {
    theme: ThemeForm;
    player: ChoosedPlayerForm;
    board: BoardSizeForm;
    /** Indicates if the game has been initialized. */
    Initialized: boolean;
}
