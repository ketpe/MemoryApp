import { Card, GameState } from "../types/game.type";
import { GameUi } from "./game.ui";
import { loadGameover, loadFinalScreen } from "../main";


export class GameLogic {
    private state: GameState;
    private gameUi: GameUi;

    /**
     * Initializes the game logic.
     * @param Gamestate Current game state.
     * @param GameUi UI handler for the game.
     */
    constructor(Gamestate: GameState, GameUi: GameUi) {
        this.state = Gamestate;
        this.gameUi = GameUi;
    }

    /**
     * Flips the selected card and adds it to the flipped collection.
     * @param CLICKED_CARD The card to flip.
     */
    public setflippCardsState(CLICKED_CARD: Card) {
        CLICKED_CARD.isFlipped = true;
        this.state.flippedCards.push(CLICKED_CARD);

    }

    /**
     * Compares the two flipped cards to check for a match.
     */
    public checkmatch() {
        this.state.isLocked = true;
        const CARD1 = this.state.flippedCards[0];
        const CARD2 = this.state.flippedCards[1];
        if (CARD1.value === CARD2.value) {
            this.cardMatch(CARD1, CARD2);
        } else {
            this.cardMismatch(CARD1, CARD2);
            this.togglePlayer();
        }
    }

    /**
     * Handles successful card matches.
     * @param CARD1 First matched card.
     * @param CARD2 Second matched card.
     */
    private cardMatch(CARD1: Card, CARD2: Card) {
        this.state.matchedCards.push(CARD1, CARD2);
        this.state.cards.forEach(card => {
            if (card.id === CARD1.id || card.id === CARD2.id) {
                card.isMatched = true;
                this.addPoints();
            }
        });
        this.state.flippedCards.splice(0, 2);
        this.state.isLocked = false;
    }

    /**
     * Handles mismatched cards by flipping them back after a delay.
     * @param CARD1 First mismatched card.
     * @param CARD2 Second mismatched card.
     */
    private cardMismatch(CARD1: Card, CARD2: Card) {
        setTimeout(() => {
            CARD1.isFlipped = false;
            CARD2.isFlipped = false;
        }, 1000);
        this.state.flippedCards.splice(0, 2);
        this.state.isLocked = false;
    }

    /**
     * Switches the active player.
     */
    private togglePlayer() {
        this.state.currentPlayer = this.state.currentPlayer === 'pBlue' ? 'pOrange' : 'pBlue';
    }

    /**
     * Increases points for the current player.
     */
    public addPoints() {
        this.state.currentPlayer === "pBlue" ? this.state.pointsPlayerBlue += 1 : this.state.pointsPlayerOrange += 1;
    }

    /**
     * Triggers the game-over sequence.
     */
    public startMatchGameover() {
        this.state.isLocked = true;
        loadGameover();
        this.gameUi.setCurrentPoints();
        setTimeout(() => {
            loadFinalScreen();
            this.gameUi.loadAttributesForFinalpage();
        }, 2500);
    }

    /**
     * Determines the winner based on points.
     */
    public getMatchWinner() {
        if (this.state.pointsPlayerBlue > this.state.pointsPlayerOrange) this.state.matchWinner = "pBlue";
        else if (this.state.pointsPlayerBlue < this.state.pointsPlayerOrange) this.state.matchWinner = "pOrange";
        else if (this.state.pointsPlayerBlue === this.state.pointsPlayerOrange) this.state.matchWinner = "draw";
    }


}