import { GameSettings } from "../types/settings.type";
// import { globalSettings } from "./settings";
import { CONTENT, render, renderCard } from "../main";
import gamepage from '../template/game-page.html?raw';
import cards from '../template/cards.html?raw';
import '../styles/main.scss';


export class Game {
    private globalSettings: GameSettings;
    CONTENT: HTMLElement;


    constructor(globalSettings: GameSettings) {
        this.globalSettings = globalSettings;
        this.CONTENT = CONTENT;
        this.initGame()
    }

    initGame() {
        render(gamepage, 'main-container-game');
        if (!this.CONTENT) return
        this.CONTENT.setAttribute('data-theme', this.globalSettings.theme.selectedTheme as string);
        this.CONTENT.setAttribute('data-boardSize', this.globalSettings.board.selectedBoardSize as string);
        renderCard(cards, 'game_cards');
    }



}