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

    /**
     * Initialisiert das Spiel, setzt die Attribute fürs HTML und startet das erstellen des Decks.
     * @returns
     */
    initGame() {
        // this.state.cards = this.generateCards();
        render(gamepage, 'main-container-game');
        if (!this.CONTENT) return
        this.CONTENT.setAttribute('data-theme', this.globalSettings.theme.selectedTheme as string);
        this.CONTENT.setAttribute('data-boardSize', this.globalSettings.board.selectedBoardSize as string);
        this.createDeck();
        this.startGame();

    }
    private startGame() {
        this.setCurrentPlayerStateHTML();
        this.addEventlistnerforCards();
    }

    private setCurrentPlayerStateHTML() {
        this.chooseImgForTheme();
    };

    private chooseImgForTheme() {
        const PLAYER_ICON: HTMLElement | null = document.getElementById('currentPlayer-icon-img');
        if (!PLAYER_ICON) return;
        this.globalSettings.theme.selectedTheme === 'cTheme' ? this.setCthemePlayerIcon(PLAYER_ICON) : this.setPlayerIcon(PLAYER_ICON)
    }

    /** lädt bei auswahl des ctheme entweder das blaue oder organge Icon des aktuellen Spielers
     *
     */
    private setCthemePlayerIcon(PLAYER_ICON: HTMLElement) {
        this.state.currentPlayer === 'pBlue' ? PLAYER_ICON.setAttribute('src', '../public/assets/labelBlueCtheme.svg') : PLAYER_ICON.setAttribute('src', '../public/assets/labelOrangeCtheme.svg');
    }
    /** lädt bei auswahl eines anderen Themes wie c , das Icon des aktuellen Spielers und die Baakcgroundcolor des aktuellen spielers
     *
     */
    private setPlayerIcon(PLAYER_ICON: HTMLElement) {
        const PLAYER_ICON_BG = document.getElementById('game_header_center_icon');
        if (!PLAYER_ICON_BG) return;
        PLAYER_ICON.setAttribute('src', '../public/assets/chess_pawnWhite.svg')
        this.state.currentPlayer === 'pBlue' ? PLAYER_ICON_BG.style.backgroundColor = '#1FAAFC' : PLAYER_ICON_BG.style.backgroundColor = '#F58E39'
    }

    /**
     * Wird noch noch nicht verwendet!
     * @param cardId
     * @returns
     */
    public handleCardClick(cardId: number) {
        if (this.state.isLocked) return;
        // Logik für flipCard und checkMatch
    }
    /**
     * macht aus den strings der Boardgröße nummern
     * @returns
     */
    private loadBoardSize() {
        const board_Size = this.globalSettings.board.selectedBoardSize === 'bSize1' ? 16 : this.globalSettings.board.selectedBoardSize === 'bSize2' ? 24 : this.globalSettings.board.selectedBoardSize === 'bSize3' ? 36 : 0;
        return board_Size;
    }
    /**
     * Erstellt das Spieldeck.Theme,Boardgröße und Karten mit EventListner werden bereitgestellt
     * @returns
     */
    private createDeck() {
        const THEME: GameTheme = this.loadTheme();
        const BOARD_SIZE: number = this.loadBoardSize();
        if (!THEME || !BOARD_SIZE) return;
        this.state.cards = this.createCardArray(THEME, BOARD_SIZE);
        const BOARD_CARDES = this.state.cards.map(el => this.creatCardHTML(el, THEME)).join('')
        if (!BOARD_CARDES) return;
        renderCard(BOARD_CARDES, 'game_cards', BOARD_SIZE);

    }
    /**
     * Fügt jeder KArte einen Eventlistner hinzu und dreht die Karte bei anklicken um
     */
    private addEventlistnerforCards() {
        const GAME_CARDS = document.getElementById("game_cards")
        if (GAME_CARDS) {
            GAME_CARDS.addEventListener('click', e => {
                const CARD = (e.target as HTMLElement).closest(".card") as HTMLButtonElement
                if (CARD) {
                    CARD.classList.toggle("is-flipped");
                }
            })
        }
    }

    /**
     * HTML-Template zur erstellung der Karten
     */
    private creatCardHTML(element: Card, THEME: string) {
        return `<button aria-label="card-btn" id="${element.id}" class="card">
    <div class="card__inner">
        <div class="card__face" style="background-image: url(./assets/cards/${THEME}/${THEME}Card_1.png)"></div>
        <div class="card__face card__face--back" style="background-image: url(${element.value})"></div>
    </div>
</button>`
    }
    /**
     * Lädt das ausgewälte Theme
     * @returns
     */
    private loadTheme() {
        let theme: GameTheme = this.globalSettings.theme.selectedTheme;
        return theme;

    };
    /**
     * Erstellt ein Array mit Objekten der Karten in Menge der Boardsize, Jede KArte wird doppelt mit eigener ID erstellt. Das Array wird gemischt zurück gegeben
     * @param THEME
     * @param BOARD_SIZE
     * @returns
     */
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
        this.shuffleCards(CARDS_ARRAY);
        return CARDS_ARRAY;
    }
    /**
     * Sortiert das CARDS_ARRY random mit hilfe der Fisher-yates Schleife
     * @param CARDS_ARRAY
     * @returns
     */
    private shuffleCards(CARDS_ARRAY: Array<object>): Array<object> {
        for (let i = CARDS_ARRAY.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [CARDS_ARRAY[i], CARDS_ARRAY[j]] = [CARDS_ARRAY[j], CARDS_ARRAY[i]];
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