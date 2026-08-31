// Zentraler Event-Listener für alle Änderungen im Dokument
import { GameSettings } from "../types/settings.type";

let globalSettings: GameSettings;

/**
 * Initialisiert Eventlistner für das ganze dokument, prüft ob es ein RadioBtn ist und leitet dann zur unterscheidung weiter
 */
export function initSettings(): void {

    document.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
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
            break;
        case 'selectedPlayer':
            adjustPlayer(value, label);
            break;
        case 'selectedBoardSize':
            adjustBoard(value, label);
            break;
    }
}


function adjustTheme(value: string, label?: string) {
    const previewThemeText = document.getElementById('preview-theme');
    const previewThemeImg = document.getElementById('setting_preview-Picture-img') as HTMLImageElement;
    globalSettings
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

function adjustBoard(wert: string, label?: string) {
    const previewBoardText = document.getElementById('preview-board');
    if (previewBoardText) {
        previewBoardText.innerHTML = label ?? '';
    }
}
