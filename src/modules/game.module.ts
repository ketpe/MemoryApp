import { GameSettings, GameTheme } from "../types/settings.type";
import { Card, GameState, matchWinner } from "../types/game.type";
import { CONTENT, render, renderCard, loadGameover, loadFinalScreen } from "../main";
import gamepage from '../template/game-page.html?raw';
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
            pointsPlayerOrange: 0,
            matchWinner: null,
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
        document.getElementById('game_cards')?.setAttribute(
            'data-boardSize',
            this.globalSettings.board.selectedBoardSize as string
        );
        this.setCurrentPlayerStateHTML();
        this.createDeck();
        this.addEventlistnerforCards();
        this.addEventlistnerforDialog();
    }

    private setCurrentPlayerStateHTML() {
        this.chooseImgForTheme();
        this.setCurrentPoints();
        this.flippCards();
        this.setDialogText();
    }
    private setDialogText() {
        const REF_BTN_BACK = document.getElementById('btn-back');
        const REF_BTN_EXIT = document.getElementById('btn-exit');
        if (!REF_BTN_BACK || !REF_BTN_EXIT) return;
        if (this.globalSettings.theme.selectedTheme === "cTheme" || "dTheme") {
            REF_BTN_BACK.innerHTML = 'Back to game';
            REF_BTN_EXIT.innerHTML = 'Exit game';
        }
        if (this.globalSettings.theme.selectedTheme === "gTheme") {
            REF_BTN_BACK.innerHTML = 'No, back to game';
            REF_BTN_EXIT.innerHTML = 'Yes, quit game';
        }
        if (this.globalSettings.theme.selectedTheme === "fTheme") {
            REF_BTN_BACK.innerHTML = 'NO, BACK TO GAME';
            REF_BTN_EXIT.innerHTML = 'EXIT GAME';
        }

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
        //FIXME -
        // this.state.pointsPlayerBlue = this.state.pointsPlayerOrange;
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
            });
    }


    public handleCardClick(cardId: number) {
        if (this.state.isLocked) return;
        const clickedCard = this.state.cards.find(card => card.id === cardId);
        if (clickedCard && !clickedCard.isFlipped) {
            clickedCard.isFlipped = true;
            this.state.flippedCards.push(clickedCard);

        }
        if (this.state.flippedCards.length == 2) {
            this.state.isLocked = true;
            this.checkmatch();
        }
        if (this.state.matchedCards.length == 2) {
            this.state.isLocked = true;
            loadGameover();
            this.setCurrentPoints();
            setTimeout(() => {
                loadFinalScreen();
                this.loadAttributesForFinalpage();
            }, 2500);
        }
        // if (this.state.matchedCards.length === this.state.cards.length) {
        //     this.state.isLocked = true;
        //     loadGameover();
        //     this.setCurrentPoints();
        //     setTimeout(() => {
        //         loadFinalScreen();
        //         this.loadAttributesForFinalpage();
        //     }, 2500);
        // }
    }

    private loadAttributesForFinalpage() {
        // this.state.pointsPlayerBlue = this.state.pointsPlayerOrange;
        if (this.state.pointsPlayerBlue > this.state.pointsPlayerOrange) this.state.matchWinner = "pBlue";
        else if (this.state.pointsPlayerBlue < this.state.pointsPlayerOrange) this.state.matchWinner = "pOrange";
        else if (this.state.pointsPlayerBlue === this.state.pointsPlayerOrange) this.state.matchWinner = "draw";
        if (!this.state.matchWinner) return;
        const REF_WINNER_ICON = document.getElementById('final-center-img') as HTMLElement;
        const REF_WINNER_TEXT = document.getElementById('final-center-winnerheadline') as HTMLElement;
        const REF_FINAL_CENTER = document.querySelector('.final-center') as HTMLElement;
        const REF_WINNER_TEXT_HEADLINE = document.getElementById('final-center-firstheadline') as HTMLElement;
        if (!REF_WINNER_ICON || !REF_WINNER_TEXT || !REF_WINNER_TEXT_HEADLINE || !REF_FINAL_CENTER) return;
        REF_FINAL_CENTER.setAttribute('data-winner', this.state.matchWinner);
        this.setAttributesforWinner(this.state.matchWinner, REF_WINNER_ICON, REF_WINNER_TEXT, REF_WINNER_TEXT_HEADLINE);
        this.setBtnAttributesforBtn();
    }

    private setAttributesforWinner(matchWinner: string, WINNER_ICON: HTMLElement, WINNER_TEXT: HTMLElement, WINNER_HEADLINE: HTMLElement) {
        if (matchWinner === 'pBlue') {
            WINNER_HEADLINE.innerHTML = ("The winner is")
            WINNER_ICON.classList = ("final-center-img-blue");
            WINNER_TEXT.innerHTML = ("Blue Player");
            WINNER_TEXT.style
        } else if (matchWinner === 'pOrange') {
            WINNER_HEADLINE.innerHTML = ("The winner is")
            WINNER_ICON.classList = ("final-center-img-orange");
            WINNER_TEXT.innerHTML = ("Orange Player");
        } else {
            WINNER_HEADLINE.innerHTML = ("It's a")
            WINNER_ICON.classList = ("final-center-img-draw");
            WINNER_TEXT.innerHTML = ("DRAW");
        }
    }

    setBtnAttributesforBtn() {
        const REF_BACK_BTN = document.getElementById("btn-backToStart")?.querySelector('span');
        if (!REF_BACK_BTN) return;
        if (this.globalSettings.theme.selectedTheme === 'cTheme') {
            REF_BACK_BTN.innerHTML = "Back to Start";
        } else {
            REF_BACK_BTN.innerHTML = "Home";

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
    private addEventlistnerforDialog() {
        const DIALOG = document.getElementById('exit-dialog') as HTMLDialogElement
        console.log(DIALOG);

        const OPEN_DIALOG = document.getElementById('btn-exit-dialog') as HTMLButtonElement;
        console.log(OPEN_DIALOG);

        const CLOSE_DIALOG = document.getElementById('btn-back') as HTMLButtonElement;
        console.log(CLOSE_DIALOG);

        if (DIALOG && OPEN_DIALOG && CLOSE_DIALOG) {

            OPEN_DIALOG.addEventListener('click', () => this.openDialog(DIALOG))
            CLOSE_DIALOG.addEventListener('click', () => this.closeDialog(DIALOG))
        } else {
            console.log('Fehler');

        };
    }

    private openDialog(DIALOG: HTMLDialogElement) {
        DIALOG.showModal();
    }

    private closeDialog(DIALOG: HTMLDialogElement) {
        DIALOG.close();
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
