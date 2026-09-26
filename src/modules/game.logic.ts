import { Card, GameState } from "../types/game.type";
import { GameUi } from "./game.ui";
import { loadGameover, loadFinalScreen, loadStartPage } from "../main";


export class GameLogic {
    private state: GameState;
    private gameUi: GameUi;

    constructor(Gamestate: GameState, GameUi: GameUi) {
        this.state = Gamestate;
        this.gameUi = GameUi;
    }

    public setflippCardsState(CLICKED_CARD: Card) {
        CLICKED_CARD.isFlipped = true;
        this.state.flippedCards.push(CLICKED_CARD);

    }

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

    private cardMismatch(CARD1: Card, CARD2: Card) {
        setTimeout(() => {
            CARD1.isFlipped = false;
            CARD2.isFlipped = false;
        }, 1000);
        this.state.flippedCards.splice(0, 2);
        this.state.isLocked = false;
    }

    private togglePlayer() {
        this.state.currentPlayer = this.state.currentPlayer === 'pBlue' ? 'pOrange' : 'pBlue';
    }

    public addPoints() {
        this.state.currentPlayer === "pBlue" ? this.state.pointsPlayerBlue += 1 : this.state.pointsPlayerOrange += 1;
    }

    public startMatchGameover() {
        this.state.isLocked = true;
        loadGameover();
        this.gameUi.setCurrentPoints();
        setTimeout(() => {
            loadFinalScreen();
            this.gameUi.loadAttributesForFinalpage();
        }, 2500);
    }

    public getMatchWinner() {
        if (this.state.pointsPlayerBlue > this.state.pointsPlayerOrange) this.state.matchWinner = "pBlue";
        else if (this.state.pointsPlayerBlue < this.state.pointsPlayerOrange) this.state.matchWinner = "pOrange";
        else if (this.state.pointsPlayerBlue === this.state.pointsPlayerOrange) this.state.matchWinner = "draw";
    }


}