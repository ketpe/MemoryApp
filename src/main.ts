import './styles/main.scss';

import startpage from './template/start-page.html?raw';
import settingsPage from './template/settings-page.html?raw';
import { initSettings } from './modules/settings';
const CONTENT = document.getElementById("main-container") as HTMLElement;


function init(): void {
  CONTENT.innerHTML = "";
  CONTENT.innerHTML = startpage;
  CONTENT.className = "main-container-startPage";
  const START_BTN = document.getElementById('hero-btn') as HTMLElement;
  START_BTN?.addEventListener('click', loadSettings);
};

function loadSettings(): void {
  render(settingsPage, "main-container-settingsPage");
  initSettings();

};

function render(template: string, className: string): void {
  CONTENT.innerHTML = template;
  CONTENT.className = className;
}

init();

