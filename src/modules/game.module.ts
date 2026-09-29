import { GameSettings, GameTheme } from "../types/settings.type";
import { resetSettings } from "../modules/settings";
import { GameState } from "../types/game.type";
import { CONTENT, render, renderCard, loadSettings } from "../main";
import gamepage from '../template/game-page.html?raw';
import '../styles/main.scss';
import { createProxy } from "./gameStateProxy";
import { CardService } from "./card.service";
import { GameUi } from "./game.ui";
import { GameLogic } from "./game.logic";

/**
 * Main game controller class.
 * Handles initialization, game state management, and UI coordination.
 */
export class Game {
    private globalSettings: GameSettings;
    CONTENT: HTMLElement;
    private state: GameState;
    private cardService: CardService;
    private gameUi: GameUi;
    private gameLogic: GameLogic;

    constructor(globalSettings: GameSettings) {
        this.cardService = new CardService();
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
        this.gameUi = new GameUi(this.globalSettings, CONTENT, this.state, this);
        this.gameLogic = new GameLogic(this.state, this.gameUi);
        this.gameUi.setGameLogic(this.gameLogic);
        this.cardService.setGameLogic(this);
    }



    /**
     * Initializes the game, sets HTML attributes, and generates the card deck.
     */
    initGame() {
        render(gamepage, 'main-container-game');
        if (!this.CONTENT) return;
        this.CONTENT.setAttribute('data-theme', this.globalSettings.theme.selectedTheme as string);
        document.body.setAttribute('data-theme', this.globalSettings.theme.selectedTheme as string)
        this.CONTENT.setAttribute('data-boardSize', this.globalSettings.board.selectedBoardSize as string);
        document.getElementById('game_cards')?.setAttribute(
            'data-boardSize',
            this.globalSettings.board.selectedBoardSize as string
        );
        this.setCurrentPlayerStateHTML();
        this.createDeck();
        this.cardService.addEventlistnerforCards();
        this.gameUi.addEventlistnerforDialog();
    }


    /**
     * Updates the UI based on state changes.
     */
    updateGame() {
        this.setCurrentPlayerStateHTML();
    }

    /**
     * Updates player-specific UI elements.
     */
    private setCurrentPlayerStateHTML() {
        this.gameUi.chooseImgForTheme();
        this.gameUi.setCurrentPoints();
        this.gameUi.flippCards();
        this.gameUi.setDialogText();
    }

    /**
     * Handles user interaction with cards.
     * @param CARD_ID - The ID of the clicked card.
     */
    public handleCardClick(CARD_ID: number) {
        if (this.state.isLocked) return;
        const CLICKED_CARD = this.state.cards.find(card => card.id === CARD_ID);
        if (CLICKED_CARD && !CLICKED_CARD.isFlipped) {
            this.gameLogic.setflippCardsState(CLICKED_CARD);
        }
        if (this.state.flippedCards.length == 2) {
            this.gameLogic.checkmatch();
        }
        if (this.state.matchedCards.length === this.state.cards.length) {
            this.gameLogic.startMatchGameover();
        }
    }

    /**
     * Determines numeric board size based on settings.
     * @returns {number} The board size.
     */
    private loadBoardSize() {
        const BOARD_SIZE = this.globalSettings.board.selectedBoardSize === 'bSize1' ? 16 : this.globalSettings.board.selectedBoardSize === 'bSize2' ? 24 : this.globalSettings.board.selectedBoardSize === 'bSize3' ? 36 : 0;
        return BOARD_SIZE;
    }

    /**
     * Generates and renders the card deck.
     */
    private createDeck() {
        const THEME: GameTheme = this.loadTheme();
        const BOARD_SIZE: number = this.loadBoardSize();
        if (!THEME || !BOARD_SIZE) return;
        this.state.cards = this.cardService.createCardArray(THEME, BOARD_SIZE);
        const BOARD_CARDES = this.state.cards.map(el => this.cardService.creatCardHTML(el, THEME)).join('');
        if (!BOARD_CARDES) return;
        renderCard(BOARD_CARDES, 'game_cards', BOARD_SIZE);
    }

    /**
     * Retrieves the selected game theme.
     * @returns {GameTheme} The active theme.
     */
    private loadTheme() {
        let theme: GameTheme = this.globalSettings.theme.selectedTheme;
        return theme;
    }

    /**
     * Handles navigation back to the start page.
     */
    public handleBackClick() {
        resetSettings();
        loadSettings();
    }
}

