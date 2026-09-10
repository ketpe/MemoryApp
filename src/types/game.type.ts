import { ChoosedPlayer } from "../types/settings.type"
export interface Card {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export interface GameState {
    cards: Card[];
    flippedCards: Card[];
    currentPlayer: ChoosedPlayer;
    isLocked: boolean;
}