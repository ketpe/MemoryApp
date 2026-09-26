import { Card, GameState, matchWinner } from "../types/game.type";
import { GameSettings, GameTheme } from "../types/settings.type";
import { GameLogic } from "./game.logic";
import { Game } from "./game.module";

export class GameUi {
    private globalSettings: GameSettings;
    CONTENT: HTMLElement;
    private state: GameState;
    private gameLogic?: GameLogic;
    private game: Game;

    constructor(globalSettings: GameSettings, CONTENT: HTMLElement, gameState: GameState, game: Game) {
        this.globalSettings = globalSettings;
        this.CONTENT = CONTENT;
        this.state = gameState;
        this.game = game;

    }
    public setGameLogic(gameLogic: GameLogic) {
        this.gameLogic = gameLogic;
    }

    public chooseImgForTheme() {
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

    public setDialogText() {
        const REF_BTN_BACK = document.getElementById('btn-back');
        const REF_BTN_EXIT = document.getElementById('btn-exit');
        if (!REF_BTN_BACK || !REF_BTN_EXIT) return;
        if (this.globalSettings.theme.selectedTheme === "cTheme" || this.globalSettings.theme.selectedTheme === "dTheme") {
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

    public setCurrentPoints() {
        const REF_BLUE_POINTS = document.getElementById('blueScore') as HTMLElement;
        const REF_ORANGE_POINTS = document.getElementById('orangeScore') as HTMLElement;
        if (!REF_BLUE_POINTS && !REF_ORANGE_POINTS) return;
        REF_BLUE_POINTS.innerHTML = this.state.pointsPlayerBlue.toString();
        REF_ORANGE_POINTS.innerHTML = this.state.pointsPlayerOrange.toString();
    }

    public flippCards() {
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

    public loadAttributesForFinalpage() {
        if (!this.gameLogic) return;
        this.gameLogic.getMatchWinner();
        if (!this.state.matchWinner) return;
        const REFS = this.getFinalScreenRefs();
        if (!REFS) return;
        REFS.REF_FINAL_CENTER.setAttribute('data-winner', this.state.matchWinner);
        this.setAttributesforWinner(this.state.matchWinner, REFS.REF_WINNER_ICON, REFS.REF_WINNER_TEXT, REFS.REF_WINNER_TEXT_HEADLINE);
        this.setBtnAttributesforBtn();
    }

    private getFinalScreenRefs() {
        const REF_WINNER_ICON = document.getElementById('final-center-img') as HTMLElement;
        const REF_WINNER_TEXT = document.getElementById('final-center-winnerheadline') as HTMLElement;
        const REF_FINAL_CENTER = document.querySelector('.final-center') as HTMLElement;
        const REF_WINNER_TEXT_HEADLINE = document.getElementById('final-center-firstheadline') as HTMLElement;
        if (!REF_WINNER_ICON || !REF_WINNER_TEXT || !REF_WINNER_TEXT_HEADLINE || !REF_FINAL_CENTER) { return null }
        return { REF_WINNER_ICON, REF_WINNER_TEXT, REF_FINAL_CENTER, REF_WINNER_TEXT_HEADLINE }
    }

    private setAttributesforWinner(matchWinner: string, WINNER_ICON: HTMLElement, WINNER_TEXT: HTMLElement, WINNER_HEADLINE: HTMLElement) {
        if (matchWinner === 'pBlue') {
            WINNER_HEADLINE.innerHTML = ("The winner is")
            WINNER_ICON.classList = ("final-center-img-blue");
            WINNER_TEXT.innerHTML = ("Blue Player");
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

    public setBtnAttributesforBtn() {
        const REF_BACK_BTN = document.getElementById("btn-backToStart")?.querySelector('span');
        if (!REF_BACK_BTN || !this.gameLogic) return;
        if (this.globalSettings.theme.selectedTheme === 'cTheme') {
            REF_BACK_BTN.innerHTML = "Back to Start";
        } else {
            REF_BACK_BTN.innerHTML = "Home";
        }
        REF_BACK_BTN.addEventListener('click', () => this.game.handleBackClick())
    }

    public addEventlistnerforDialog() {
        const DIALOG = document.getElementById('exit-dialog') as HTMLDialogElement
        const OPEN_DIALOG = document.getElementById('btn-exit-dialog') as HTMLButtonElement;
        const CLOSE_DIALOG = document.getElementById('btn-back') as HTMLButtonElement;

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
}