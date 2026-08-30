// src/modules/settings.ts
/**
 *
 */
import * as SettingsType from '../types/settings.type';




export function initSettings() {
    // 1. Das globale Einstellungs-Objekt initialisieren
    const logCurrentSettings = () => {
        console.log('Aktuelle Gesamt-Einstellungen:', globalSettings);
    };
    const globalSettings = getGlobalSettings();
    // 2. Alle Formulare einzeln holen
    const themeForm = getForm('themeForm') as HTMLFormElement;
    const playerForm = getForm('playerForm') as HTMLFormElement;
    const sizeForm = getForm('sizeForm') as HTMLFormElement;
    addEventListenerForForm(getForm('themeForm'), 'selectedTheme', (val) => globalSettings.theme.selectedTheme = val as SettingsType.GameTheme, logCurrentSettings);
    addEventListenerForForm(getForm('playerForm'), 'selectedPlayer', (val) => globalSettings.player.selectedPlayer = val as SettingsType.ChoosedPlayer, logCurrentSettings);
    addEventListenerForForm(getForm('sizeForm'), 'selectedBoardSize', (val) => globalSettings.board.selectedBoardSize = val as SettingsType.BoardSize, logCurrentSettings);
    watchGlobalSettings(globalSettings);
}

function getGlobalSettings() {
    const globalSettings: SettingsType.GameSettings = {
        theme: { selectedTheme: null },
        player: { selectedPlayer: null },
        board: { selectedBoardSize: null }
    };
    return globalSettings;
}

function getForm(form: string) {
    const $form = document.getElementById(form) as HTMLFormElement | null;
    return $form;
}

function addEventListenerForForm(form: HTMLFormElement | null, inputName: string, updateFn: (value: string | null) => void, logFn: () => void) {
    if (!form) return;

    form.addEventListener('change', () => {
        const formData = new FormData(form);
        const value = formData.get(inputName);

        updateFn(typeof value === 'string' ? value : null);
        logFn();
    });
}
