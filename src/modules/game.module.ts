import { GameSettings, GameTheme } from "../types/settings.type";
import { Card, GameState } from "../types/game.type";
import { CONTENT, render, renderCard } from "../main";
import gamepage from '../template/game-page.html?raw';
import cards from '../template/cards.html?raw';
import '../styles/main.scss';


export class Game {
    private globalSettings: GameSettings;
    CONTENT: HTMLElement;
    private state: GameState;


    constructor(globalSettings: GameSettings) {
        this.globalSettings = globalSettings;
        this.state = {
            cards: [],
            flippedCards: [],
            currentPlayer: this.globalSettings.player.selectedPlayer,
            isLocked: false
        };
        this.CONTENT = CONTENT;
        this.initGame()
    }

    initGame() {
        // this.state.cards = this.generateCards();
        // this.shuffleCards();

        render(gamepage, 'main-container-game');
        if (!this.CONTENT) return
        this.CONTENT.setAttribute('data-theme', this.globalSettings.theme.selectedTheme as string);
        this.CONTENT.setAttribute('data-boardSize', this.globalSettings.board.selectedBoardSize as string);
        this.createDeck();
    }


    private shuffleCards(): void {
        // Fisher-Yates Algorithmus
    }

    public handleCardClick(cardId: number) {
        if (this.state.isLocked) return;
        // Logik für flipCard und checkMatch
    }

    private loadBoardSize() {
        const board_Size = this.globalSettings.board.selectedBoardSize === 'bSize1' ? 16 : this.globalSettings.board.selectedBoardSize === 'bSize2' ? 24 : this.globalSettings.board.selectedBoardSize === 'bSize3' ? 36 : 0;
        return board_Size;
    }

    private createDeck() {
        const THEME: GameTheme = this.loadTheme();
        const BOARD_SIZE = this.loadBoardSize();
        if (!THEME || !BOARD_SIZE) return;
        const CARDS = this.createCardArray(THEME, BOARD_SIZE)
        console.log(CARDS);
        const BOARD_CARDES = CARDS.map(el => this.creatCardHTML(el, THEME)).join('')
        console.log(BOARD_CARDES);
        if (!BOARD_CARDES) return;
        renderCard(BOARD_CARDES, 'game_cards', BOARD_SIZE)
    }

    private creatCardHTML(element: Card, THEME: string) {
        return `<button aria-label="card-btn" id="${element.id}" class="card">
    <div class="card__inner">
        <div class="card__face" style="background-image: url(./assets/cards/${THEME}/${THEME}Card_1.png)"></div>
        <div class="card__face card__face--back" style="background-image: url(${element.value})"></div>
    </div>
</button>`
    }

    private loadTheme() {
        let theme: GameTheme = this.globalSettings.theme.selectedTheme;
        return theme;

    };

    private createCardArray(THEME: string, BOARD_SIZE: number): Card[] {
        const CARDS_ARRAY: Card[] = [];
        for (let i = 2; i <= BOARD_SIZE / 2 + 1; i++) {
            const CARD_BASE = {
                value: `./assets/cards/${THEME}/${THEME}Card_${i}.png`,
                isFlipped: false,
                isMatched: false,
            }
            CARDS_ARRAY.push({ ...CARD_BASE, id: i * 10 + 1 });
            CARDS_ARRAY.push({ ...CARD_BASE, id: i * 10 + 2 });
        }
        return CARDS_ARRAY;
    }

    /**
     * Mit creatDeck beginnen dazu die größe mit checkBoardSize festlegen in ner Variable
     *
     * mit loadTheme das Theme auslesen und in die const Theme legen
     *
     * dann an hand der Board größe ein array erstellen
     */

}