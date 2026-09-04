// Zentraler Event-Listener für alle Änderungen im Dokument
import { GameSettings, GameTheme, ChoosedPlayer, BoardSize } from "../types/settings.type";
import { Game } from '../modules/game.module'

/**
 * Hier wird ein Proxhandler für die globalSettings erstellt
 */
const settingsHandler: ProxyHandler<any> = {
    get(target, prop) {
        const VALUE = target[prop];
        if (VALUE && typeof VALUE === 'object') {
            return new Proxy(VALUE, settingsHandler);
        }
        return VALUE;
    },

    set(target, prop, VALUE) {
        target[prop] = VALUE;

        if (!hasAnyNull(globalSettings)) {
            enableStartBtn();
        }
        return true;
    }
};

/**
 *  GlobalSettings wird mit einem Proxy erstellt um diese überwachen zu können.
 */

export let globalSettings: GameSettings = new Proxy({
    theme: { selectedTheme: 'cTheme' },
    player: { selectedPlayer: null },
    board: { selectedBoardSize: null }
}, settingsHandler)

/**
 * schaltet den Btn für den Spielbeginn frei
 */
function enableStartBtn(): void {
    const startBtn = document.getElementById('game-start-btn') as HTMLButtonElement
    startBtn.disabled = false;
    addEventListener('click', startGame)
}
function startGame(): void {
    const GAME = new Game(globalSettings);

}

/**
 * Hilfsfunktion zur Überprüfung für Proxy ob in dem Object noch eine null ist. Prüft auch verschachtelte objecte
 */
function hasAnyNull(obj: any): boolean {
    for (const key in obj) {
        if (obj[key] === null) {
            return true;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (hasAnyNull(obj[key])) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Initialisiert Eventlistner für das ganze dokument, prüft ob es ein RadioBtn ist und leitet dann zur unterscheidung weiter
 */
export function initSettings(): void {
    document.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        console.log(target);

        if (target && target.type === 'radio') {
            const settingName = target.name;
            const selectedValue = target.value;
            const label = document.querySelector<HTMLLabelElement>(`label[for="${target.id}"]`)?.innerHTML;
            processInput(settingName, selectedValue, label);
        }
    });
}

/**
 * Wird vom Eventlistner aufgerufen und gibt an die jeweilige Einstellungsfunktion weiter
 * @param name
 * @param value
 * @param label
 */
function processInput(name: string, value: string, label?: string): void {
    switch (name) {
        case 'selectedTheme':
            adjustTheme(value, label);
            globalSettings.theme.selectedTheme = value as GameTheme;
            break;
        case 'selectedPlayer':
            adjustPlayer(value, label);
            globalSettings.player.selectedPlayer = value as ChoosedPlayer;
            break;
        case 'selectedBoardSize':
            globalSettings.board.selectedBoardSize = value as BoardSize;
            adjustBoard(value, label);
            break;
    }
}


function adjustTheme(value: string, label?: string) {
    const previewThemeText = document.getElementById('preview-theme');
    const previewThemeImg = document.getElementById('setting_preview-Picture-img') as HTMLImageElement;
    if (previewThemeText) {
        previewThemeText.innerHTML = label ?? '';
    }
    if (previewThemeImg) {
        previewThemeImg.src = `../assets/preview-${value}.png`
    }
}

function adjustPlayer(value: string, label?: string) {
    const previewPlayerText = document.getElementById('preview-player');
    if (previewPlayerText) {
        previewPlayerText.innerHTML = label ?? '';
    }
}

function adjustBoard(value: string, label?: string) {
    const previewBoardText = document.getElementById('preview-board');
    if (previewBoardText) {
        previewBoardText.innerHTML = label ?? '';
    }
}

