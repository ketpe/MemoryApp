export type GameTheme = "cTheme" | "gTheme" | "dTheme" | "fTheme" | null;
export type ChoosedPlayer = "pBlue" | "pOrange" | null;
export type BoardSize = "bSize1" | "bSize2" | "bSize3" | null;

export interface ThemeForm {
    selectedTheme: GameTheme;
}
export interface ChoosedPlayerForm {
    selectedPlayer: ChoosedPlayer;
}
export interface BoardSizeForm {
    selectedBoardSize: BoardSize;
}
export interface GameSettings {
    theme: ThemeForm;
    player: ChoosedPlayerForm;
    board: BoardSizeForm;
}