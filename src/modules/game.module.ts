import { GameSettings, GameTheme } from "../types/settings.type";
import { Card, GameState } from "../types/game.type";
import { CONTENT, render, renderCard } from "../main";
import gamepage from '../template/game-page.html?raw';
import cards from '../template/cards.html?raw';
import '../styles/main.scss';
import { createProxy } from "./gameStateProxy";

export class Game {
    private globalSettings: GameSettings;
    CONTENT: HTMLElement;
    private state: GameState;

    constructor(globalSettings: GameSettings) {
        this.globalSettings = globalSettings;
        this.CONTENT = CONTENT;
        const RAW_STATE: GameState = {
            cards: [],
            flippedCards: [],
            matchedCards: [],
            currentPlayer: this.globalSettings.player.selectedPlayer,
            isLocked: false,
            pointsPlayerBlue: 0,
            pointsPlayerOrange: 0
        };
        this.state = createProxy(RAW_STATE, () => this.updateGame());
        this.initGame();
    }

    /**
     * SCHRITT 1: Die Update-Zentrale
     * Diese Funktion wird jetzt AUTOMATISCH vom Proxy aufgerufen,
     * sobald sich IRGENDETWAS im State ändert (z.B. currentPlayer wechselt oder Karten ändern sich).
     */
    updateGame() {
        this.setCurrentPlayerStateHTML();
        // Falls du später das Spielfeld basierend auf Karten-Status neu rendern willst, kommt das auch hier rein.
    }

    /**
     * Initialisiert das Spiel, setzt die Attribute fürs HTML und startet das erstellen des Decks.
     */
    initGame() {
        render(gamepage, 'main-container-game');
        if (!this.CONTENT) return;
        this.CONTENT.setAttribute('data-theme', this.globalSettings.theme.selectedTheme as string);
        this.CONTENT.setAttribute('data-boardSize', this.globalSettings.board.selectedBoardSize as string);
        this.setCurrentPlayerStateHTML();
        this.createDeck();
        this.addEventlistnerforCards();
    }

    private setCurrentPlayerStateHTML() {
        this.chooseImgForTheme();
        this.setCurrentPoints();
        this.flippCards();
    }

    private chooseImgForTheme() {
        const PLAYER_ICON: HTMLElement | null = document.getElementById('currentPlayer-icon-img');
        if (!PLAYER_ICON) return;
        this.globalSettings.theme.selectedTheme === 'cTheme' ? this.setCthemePlayerIcon(PLAYER_ICON) : this.setPlayerIcon(PLAYER_ICON);
    }

    private setCthemePlayerIcon(PLAYER_ICON: HTMLElement) {
        this.state.currentPlayer === 'pBlue'
            ? PLAYER_ICON.setAttribute('src', '../public/assets/labelBlueCtheme.svg')
            : PLAYER_ICON.setAttribute('src', '../public/assets/labelOrangeCtheme.svg');
    }

    private setPlayerIcon(PLAYER_ICON: HTMLElement) {
        const PLAYER_ICON_BG = document.getElementById('game_header_center_icon');
        if (!PLAYER_ICON_BG) return;
        PLAYER_ICON.setAttribute('src', '../public/assets/chess_pawnWhite.svg');
        this.state.currentPlayer === 'pBlue'
            ? PLAYER_ICON_BG.style.backgroundColor = '#1FAAFC'
            : PLAYER_ICON_BG.style.backgroundColor = '#F58E39';
    }

    private setCurrentPoints() {
        const REF_BLUE_POINTS = document.getElementById('blueScore') as HTMLElement;
        const REF_ORANGE_POINTS = document.getElementById('orangeScore') as HTMLElement;
        if (!REF_BLUE_POINTS && !REF_ORANGE_POINTS) return;
        REF_BLUE_POINTS.innerHTML = this.state.pointsPlayerBlue.toString();
        REF_ORANGE_POINTS.innerHTML = this.state.pointsPlayerOrange.toString();
    }
    private flippCards() {
        this.state.cards.forEach(
            card => {
                const ELEMENT = document.getElementById(String(card.id));
                if (!ELEMENT) return;
                if (card.isFlipped === true) {
                    const CARD = ELEMENT.closest('.card');
                    if (CARD) {
                        CARD.classList.add("is-flipped")
                    }
                } else {
                    const CARD = ELEMENT.closest('.card');
                    if (CARD) {
                        CARD.classList.remove("is-flipped")
                    }
                }

                //  CARD_ELEMENT.classList.toggle("is-flipped");
            });
    }


    public handleCardClick(cardId: number) {
        if (this.state.isLocked) return;
        const clickedCard = this.state.cards.find(card => card.id === cardId);
        if (clickedCard && !clickedCard.isFlipped) {
            clickedCard.isFlipped = true;
            this.state.flippedCards.push(clickedCard);
            // Hier kommt später deine restliche Memory-Logik hin (z.B. flippedCards befüllen, vergleichen)
        }
        if (this.state.flippedCards.length == 2) {
            this.state.isLocked = true;
            this.checkmatch();
        }
    }

    private checkmatch() {
        const CARD1 = this.state.flippedCards[0];
        const CARD2 = this.state.flippedCards[1];
        if (CARD1.value === CARD2.value) {
            this.cardMatch(CARD1, CARD2);
        } else {
            this.cardMismatch(CARD1, CARD2);
            this.togglePlayer();
        }
    }
    private togglePlayer() {
        this.state.currentPlayer = this.state.currentPlayer === 'pBlue' ? 'pOrange' : 'pBlue';
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
    private addPoints() {
        this.state.currentPlayer === "pBlue" ? this.state.pointsPlayerBlue += 1 : this.state.pointsPlayerOrange += 1;
    }

    private loadBoardSize() {
        const board_Size = this.globalSettings.board.selectedBoardSize === 'bSize1' ? 16 : this.globalSettings.board.selectedBoardSize === 'bSize2' ? 24 : this.globalSettings.board.selectedBoardSize === 'bSize3' ? 36 : 0;
        return board_Size;
    }

    private createDeck() {
        const THEME: GameTheme = this.loadTheme();
        const BOARD_SIZE: number = this.loadBoardSize();
        if (!THEME || !BOARD_SIZE) return;
        this.state.cards = this.createCardArray(THEME, BOARD_SIZE);
        const BOARD_CARDES = this.state.cards.map(el => this.creatCardHTML(el, THEME)).join('');
        if (!BOARD_CARDES) return;
        renderCard(BOARD_CARDES, 'game_cards', BOARD_SIZE);
    }


    private addEventlistnerforCards() {
        const GAME_CARDS = document.getElementById("game_cards");
        if (GAME_CARDS) {
            GAME_CARDS.addEventListener('click', e => {
                const CARD_ELEMENT = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
                if (CARD_ELEMENT) {
                    const cardId = Number(CARD_ELEMENT.id);
                    this.handleCardClick(cardId);
                }
            });
        }
    }

    private creatCardHTML(element: Card, THEME: string) {
        return `<button aria-label="card-btn" id="${element.id}" class="card">
    <div class="card__inner">
        <div class="card__face" style="background-image: url(./assets/cards/${THEME}/${THEME}Card_1.png)"></div>
        <div class="card__face card__face--back" style="background-image: url(${element.value})"></div>
    </div>
</button>`;
    }

    private loadTheme() {
        let theme: GameTheme = this.globalSettings.theme.selectedTheme;
        return theme;
    }

    private createCardArray(THEME: string, BOARD_SIZE: number): Card[] {
        const CARDS_ARRAY: Card[] = [];
        for (let i = 2; i <= BOARD_SIZE / 2 + 1; i++) {
            const CARD_BASE = {
                value: `./assets/cards/${THEME}/${THEME}Card_${i}.png`,
                isFlipped: false,
                isMatched: false,
            };
            CARDS_ARRAY.push({ ...CARD_BASE, id: i * 10 + 1 });
            CARDS_ARRAY.push({ ...CARD_BASE, id: i * 10 + 2 });
        }
        this.shuffleCards(CARDS_ARRAY);
        return CARDS_ARRAY;
    }

    private shuffleCards(CARDS_ARRAY: Array<object>): Array<object> {
        for (let i = CARDS_ARRAY.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [CARDS_ARRAY[i], CARDS_ARRAY[j]] = [CARDS_ARRAY[j], CARDS_ARRAY[i]];
        }
        return CARDS_ARRAY;
    }
}
