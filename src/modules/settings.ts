// Zentraler Event-Listener für alle Änderungen im Dokument
import { GameSettings, GameTheme, ChoosedPlayer, BoardSize } from "../types/settings.type";
import { Game } from '../modules/game.module'
/**
 * Hier wird ein Proxhandler für die globalSettings erstellt
 */
const SETTINGS_HANDLER: ProxyHandler<any> = {
    get(TARGET, prop) {
        const VALUE = TARGET[prop];
        return (VALUE && typeof VALUE === 'object') ? new Proxy(VALUE, SETTINGS_HANDLER) : VALUE;
    },
    set(TARGET, prop, VALUE) {
        TARGET[prop] = VALUE;
        if (!hasAnyNull(globalSettings)) enableStartBtn();
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
    const BTN = document.getElementById('game-start-btn') as HTMLButtonElement | null;
    if (!BTN) return;
    BTN.disabled = false;
    BTN.onclick = () => new Game(globalSettings).initGame();
}

function startGame(): void {
    const GAME = new Game(globalSettings);
    GAME.initGame();
}

function hasAnyNull(obj: any): boolean {
    return Object.values(obj).some(val =>
        val === null || (typeof val === 'object' && hasAnyNull(val))
    );
}

export function initSettings(): void {
    if (settingsListenerInitialized) return;
    settingsListenerInitialized = true;
    document.addEventListener("change", (e: Event) => {
        const T = e.target as HTMLInputElement;
        if (T?.type === "radio") {
            const L = document.querySelector<HTMLLabelElement>(`[for="${T.id}"]`);
            processInput(T.name, T.value, L?.innerHTML);
        }
    });
}

/**
 * Wird vom Eventlistner aufgerufen und gibt an die jeweilige Einstellungsfunktion weiter
 * @param name
 * @param value
 * @param LABEL
 */
function processInput(name: string, value: string, L?: string): void {
    const MAPPERS: Record<string, Function> = {
        selectedTheme: () => { adjustTheme(value, L); globalSettings.theme.selectedTheme = value as any; },
        selectedPlayer: () => { adjustPlayer(value, L); globalSettings.player.selectedPlayer = value as any; },
        selectedBoardSize: () => { adjustBoard(value, L); globalSettings.board.selectedBoardSize = value as any; }
    };
    MAPPERS[name]?.();
}


function adjustTheme(v: string, L?: string) {
    const TXT = document.getElementById('preview-theme');
    const IMG = document.getElementById('setting_preview-Picture-img') as HTMLImageElement;
    if (TXT) TXT.innerHTML = L ?? '';
    if (IMG) IMG.src = `../assets/preview-${v}.png`;
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
