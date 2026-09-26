// Zentraler Event-Listener für alle Änderungen im Dokument
import { GameSettings, GameTheme, ChoosedPlayer, BoardSize } from "../types/settings.type";
import { Game } from '../modules/game.module'
/**
 * Hier wird ein Proxhandler für die globalSettings erstellt
 */
const SETTINGS_HANDLER: ProxyHandler<any> = {
    get(TARGET, prop) {
        const VALUE = TARGET[prop];
        if (VALUE && typeof VALUE === 'object') {
            return new Proxy(VALUE, SETTINGS_HANDLER);
        }
        return VALUE;
    },

    set(TARGET, prop, VALUE) {
        TARGET[prop] = VALUE;

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
    board: { selectedBoardSize: null },
}, SETTINGS_HANDLER)

let settingsListenerInitialized = false;

/**
 * schaltet den Btn für den Spielbeginn frei
 */
function enableStartBtn(): void {
    const START_BTN = document.getElementById('game-start-btn') as HTMLButtonElement | null
    if (!START_BTN) return;
    START_BTN.disabled = false;
    START_BTN.addEventListener('click', startGame, { once: true });
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
    if (settingsListenerInitialized) return;
    settingsListenerInitialized = true;

    document.addEventListener("change", (event: Event) => {
        const TARGET = event.target as HTMLInputElement;

        if (TARGET?.type === "radio") {
            const LABEL = document.querySelector<HTMLLabelElement>(`LABEL[for="${TARGET.id}"]`);
            processInput(TARGET.name, TARGET.value, LABEL?.innerHTML);
        }
    });
}

/**
 * Wird vom Eventlistner aufgerufen und gibt an die jeweilige Einstellungsfunktion weiter
 * @param name
 * @param value
 * @param LABEL
 */
function processInput(name: string, value: string, LABEL?: string): void {
    switch (name) {
        case 'selectedTheme':
            adjustTheme(value, LABEL);
            globalSettings.theme.selectedTheme = value as GameTheme;
            break;
        case 'selectedPlayer':
            adjustPlayer(value, LABEL);
            globalSettings.player.selectedPlayer = value as ChoosedPlayer;
            break;
        case 'selectedBoardSize':
            globalSettings.board.selectedBoardSize = value as BoardSize;
            adjustBoard(value, LABEL);
            break;
    }
}


function adjustTheme(value: string, LABEL?: string) {
    const PREVIEW_THEME_TEXT = document.getElementById('preview-theme');
    const PREVIEW_THEME_IMG = document.getElementById('setting_preview-Picture-img') as HTMLImageElement;
    if (PREVIEW_THEME_TEXT) {
        PREVIEW_THEME_TEXT.innerHTML = LABEL ?? '';
    }
    if (PREVIEW_THEME_IMG) {
        PREVIEW_THEME_IMG.src = `../assets/preview-${value}.png`
    }
}

function adjustPlayer(value: string, LABEL?: string) {
    const PREVIEW_PLAYER_TEXT = document.getElementById('preview-player');
    if (PREVIEW_PLAYER_TEXT) {
        PREVIEW_PLAYER_TEXT.innerHTML = LABEL ?? '';
    }
}

function adjustBoard(value: string, LABEL?: string) {
    const PREVIEW_BOARD_TEXT = document.getElementById('preview-board');
    if (PREVIEW_BOARD_TEXT) {
        PREVIEW_BOARD_TEXT.innerHTML = LABEL ?? '';
    }
}
export function resetSettings() {
    globalSettings.theme.selectedTheme = "cTheme";
    globalSettings.player.selectedPlayer = null;
    globalSettings.board.selectedBoardSize = null;
}
