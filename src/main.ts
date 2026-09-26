import './styles/main.scss';

import startpage from './template/start-page.html?raw';
import settingsPage from './template/settings-page.html?raw';
import gameoverPage from './template/gameover.html?raw';
import finalPage from './template/final-page.html?raw';
import { initSettings } from './modules/settings';
export const CONTENT = document.getElementById("main-container") as HTMLElement;


function init(): void {
  loadStartPage();
};

export function loadStartPage() {
  render(startpage, "main-container-startPage");

  const START_BTN = document.getElementById("hero-btn");
  START_BTN?.addEventListener("click", loadSettings);
}

function loadSettings(): void {
  render(settingsPage, "main-container-settingsPage");
  initSettings();

};

export function render(template: string, className: string): void {
  CONTENT.innerHTML = template;
  CONTENT.className = className;
}
export function renderCard(template: string, id: string, BOARD_SIZE: number): void {
  let card = document.getElementById(id) as HTMLElement;
  card.innerHTML = template;
  let size = BOARD_SIZE === 16 ? 4 : 6;
  card.style.setProperty('--Board-Size', String(size));
}

export function loadGameover(): void {
  render(gameoverPage, "main-container-gameover");
};
export function loadFinalScreen(): void {
  render(finalPage, "main-container-final");
};

init();
