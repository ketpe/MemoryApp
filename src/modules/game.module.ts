import { GameSettings } from "../types/settings.type";
// import { globalSettings } from "./settings";
import { CONTENT, render } from "../main";
import gamepage from '../template/game-page.html?raw';
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
        console.log(CONTENT);

    }



}