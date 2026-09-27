import { ChoosedPlayer } from "../types/settings.type"

/** Represents a single playing card. */
export interface Card {
    /** Unique identifier */
    id: number;
    /** Value displayed on the card */
    value: string;
    /** Whether the card is currently face-up */
    isFlipped: boolean;
    /** Whether the card has been successfully matched */
    isMatched: boolean;
}

/** Represents the current state of the game. */
export interface GameState {
    /** List of all cards in the game */
    cards: Card[];
    /** Cards currently turned face-up */
    flippedCards: Card[];
    /** List of all matched card pairs */
    matchedCards: Card[];
    /** The player whose turn it is */
    currentPlayer: ChoosedPlayer;
    /** Whether user interaction is temporarily blocked */
    isLocked: boolean;
    /** Score for the blue player */
    pointsPlayerBlue: number;
    /** Score for the orange player */
    pointsPlayerOrange: number;
    /** The final outcome of the game */
    matchWinner: matchWinner;
}

/** Possible game results. */
export type matchWinner = "pBlue" | "pOrange" | "draw" | null;

