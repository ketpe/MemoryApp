import { Card } from "../types/game.type";
import { GameTheme } from "../types/settings.type";
import { Game } from "./game.module";

export class CardService {
    private gameModule?: Game;

    public setGameLogic(gameModul: Game) {
        this.gameModule = gameModul;
    }

    public createCardArray(THEME: GameTheme, BOARD_SIZE: number): Card[] {
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
        return this.shuffle(CARDS_ARRAY);
    }

    private shuffle(CARDS_ARRAY: Card[]): Card[] {
        for (let i = CARDS_ARRAY.length - 1; i > 0; i--) {
            const J = Math.floor(Math.random() * (i + 1));
            [CARDS_ARRAY[i], CARDS_ARRAY[J]] = [CARDS_ARRAY[J], CARDS_ARRAY[i]];
        }
        return CARDS_ARRAY;
    }

    public creatCardHTML(element: Card, THEME: string) {
        return `<button aria-label="card-btn" id="${element.id}" class="card">
         <div class="card__inner">
        <div class="card__face" style="background-image: url(./assets/cards/${THEME}/${THEME}Card_1.png)"></div>
        <div class="card__face card__face--back" style="background-image: url(${element.value})"></div>
    </div>
</button>`;
    }

    public addEventlistnerforCards() {
        const GAME_CARDS = document.getElementById("game_cards");
        if (!this.gameModule) return;
        if (GAME_CARDS) {
            GAME_CARDS.addEventListener('click', e => {
                const CARD_ELEMENT = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
                if (CARD_ELEMENT) {
                    const CARD_ID = Number(CARD_ELEMENT.id);
                    this.gameModule?.handleCardClick(CARD_ID);
                }
            });
        }
    }
}
