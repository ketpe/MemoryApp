(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`<main id="main-container" class="main-container-start">\r
    <article class="hero">\r
        <section class="hero_headers">\r
            <span class="hero_headers-firstline">It's play time.</span>\r
            <span class="hero_headers-secondline">Ready to play?</span>\r
        </section>\r
        <button id="hero-btn" class="primary_button" type="submit">\r
            <div class="primary_button--first_icon" alt=""></div>\r
            <span>Play</span>\r
            <div class=" primary_button--second_icon" alt=""></div>\r
        </button>\r
    </article>\r
    <img class="hero-bg-icon" src="./public/assets/stadia_controller.svg" alt="" srcset="">\r
</main>`,t=`<body>\r
    <h1 class="settings_headline">Settings</h1>\r
    <div class="main-content-container">\r
        <article class="setting_options">\r
            <section class="settings_radioBtns">\r
                <div class="settings_radioBtns_headContainer">\r
                    <img src="./assets/palette.svg" alt="palette icon" srcset="">\r
                    <h2 class="settings_radioBtns_headline">Game themes</h2>\r
                </div>\r
                <form id="themeForm" class="settings_radioBtns-theme" action="">\r
                    <div class="radioBtn">\r
                        <input type="radio" id="theme1" name="selectedTheme" value="cTheme">\r
                        <label for="theme1">Code vibes Theme</label>\r
                    </div>\r
                    <div class="radioBtn">\r
                        <input type="radio" id="theme2" name="selectedTheme" value="gTheme">\r
                        <label for="theme2">Gaming Theme</label>\r
                    </div>\r
                    <div class="radioBtn">\r
                        <input type="radio" id="theme3" name="selectedTheme" value="dTheme">\r
                        <label for="theme3">DA Projects Theme</label>\r
                    </div>\r
                    <div class="radioBtn">\r
                        <input type="radio" id="theme4" name="selectedTheme" value="fTheme">\r
                        <label for="theme4">Foods theme</label>\r
                    </div>\r
                </form>\r
                <div class="settings_radioBtns_headContainer">\r
                    <img src="./assets/chess_pawn.svg" alt="palette icon" srcset="">\r
                    <h2 class="settings_radioBtns_headline">Choose player</h2>\r
                </div>\r
                <form id="playerForm" class="settings_radioBtns-player" action="">\r
                    <div class="radioBtn">\r
                        <input type="radio" id="pBlue" name="selectedPlayer" value="pBlue">\r
                        <label for="pBlue">Blue</label>\r
                    </div>\r
                    <div class="radioBtn">\r
                        <input type="radio" id="pOrange" name="selectedPlayer" value="pOrange">\r
                        <label for="pOrange">Orange</label>\r
                    </div>\r
                </form>\r
                <div class="settings_radioBtns_headContainer">\r
                    <img src="./assets/boadIcon.svg" alt="palette icon" srcset="">\r
                    <h2 class="settings_radioBtns_headline">Board size</h2>\r
                </div>\r
                <form id="sizeForm" class="settings_radioBtns-board" action="">\r
                    <div class="radioBtn">\r
                        <input type="radio" id="bSize1" name="selectedBoardSize" value="bSize1">\r
                        <label for="bSize1">16 cards</label>\r
                    </div>\r
                    <div class="radioBtn">\r
                        <input type="radio" id="bSize2" name="selectedBoardSize" value="bSize2">\r
                        <label for="bSize2">24 cards</label>\r
                    </div>\r
                    <div class="radioBtn">\r
                        <input type="radio" id="bSize3" name="selectedBoardSize" value="bSize3">\r
                        <label for="bSize3">36 cards</label>\r
                    </div>\r
                </form>\r
            </section>\r
        </article>\r
        <article class="setting_preview">\r
            <section class="setting_preview-Picture">\r
                <img id="setting_preview-Picture-img" class="setting_preview-Picture-img"\r
                    src="../assets/preview-cTheme.png" alt="">\r
            </section>\r
            <section class="setting_preview-board">\r
                <span id="preview-theme" class="preview-theme">Game theme</span>\r
                <img src="../assets/line6.svg" alt="" srcset="">\r
                <span id="preview-player" class="preview-player">Player</span>\r
                <img src="../assets/line6.svg" alt="" srcset="">\r
                <span id="preview-board" class="preview-board">Board size</span>\r
                <button id="game-start-btn" class="small-button" type="submit" disabled>\r
                    <img class="small-button-img" src="../assets/smart_display.svg" alt="play button">\r
                    <span>Start</span>\r
                </button>\r
            </section>\r
        </article>\r
    </div>\r
</body>`,n=`<body>\r
    <main class="main-container-game">\r
\r
        <header class="game_header">\r
            <section class="game_header_left">\r
                <div class="game_header_left_score-Blue">\r
                    <span class="score_color-blue">Blue</span>\r
                    <span id="blueScore" class="score">0</span>\r
                </div>\r
                <div class="game_header_left_score-Orange">\r
                    <span class="score_color-orange">Orange</span>\r
                    <span id="orangeScore" class="score">6</span>\r
                </div>\r
            </section>\r
            <section class="game_header_center">\r
                <span class="game_header_center_text">\r
                    Current player:\r
                </span>\r
                <img id="currentPlayer-icon" src="../public/assets/labelBlueCtheme.svg" alt="" srcset="">\r
            </section>\r
            <section class="game_header_right">\r
                <button class="secondary-btn" type="submit">\r
\r
                    <span>Exit game</span>\r
                </button>\r
            </section>\r
        </header>\r
        <section id="game_cards" class="game_cards">\r
\r
        </section>\r
    </main>\r
    <script type="module" src="/src/main.ts"> <\/script>\r
</body>`,r=class{globalSettings;CONTENT;state;constructor(e){this.globalSettings=e,this.state={cards:[],flippedCards:[],currentPlayer:this.globalSettings.player.selectedPlayer,isLocked:!1},this.CONTENT=m,this.initGame()}initGame(){_(n,`main-container-game`),this.CONTENT&&(this.CONTENT.setAttribute(`data-theme`,this.globalSettings.theme.selectedTheme),this.CONTENT.setAttribute(`data-boardSize`,this.globalSettings.board.selectedBoardSize),this.createDeck())}shuffleCards(){}handleCardClick(e){this.state.isLocked}loadBoardSize(){return this.globalSettings.board.selectedBoardSize===`bSize1`?16:this.globalSettings.board.selectedBoardSize===`bSize2`?24:this.globalSettings.board.selectedBoardSize===`bSize3`?36:0}createDeck(){let e=this.loadTheme(),t=this.loadBoardSize();if(!e||!t)return;let n=this.createCardArray(e,t);console.log(n);let r=n.map(t=>this.creatCardHTML(t,e)).join(``);console.log(r),r&&v(r,`game_cards`,t)}creatCardHTML(e,t){return`<button aria-label="card-btn" id="${e.id}" class="card">
    <div class="card__inner">
        <div class="card__face" style="background-image: url(./assets/cards/${t}/${t}Card_1.png)"></div>
        <div class="card__face card__face--back" style="background-image: url(${e.value})"></div>
    </div>
</button>`}loadTheme(){return this.globalSettings.theme.selectedTheme}createCardArray(e,t){let n=[];for(let r=2;r<=t/2+1;r++){let t={value:`./assets/cards/${e}/${e}Card_${r}.png`,isFlipped:!1,isMatched:!1};n.push({...t,id:r*10+1}),n.push({...t,id:r*10+2})}return n}},i={get(e,t){let n=e[t];return n&&typeof n==`object`?new Proxy(n,i):n},set(e,t,n){return e[t]=n,c(a)||o(),!0}},a=new Proxy({theme:{selectedTheme:`cTheme`},player:{selectedPlayer:null},board:{selectedBoardSize:null}},i);function o(){let e=document.getElementById(`game-start-btn`);e.disabled=!1,addEventListener(`click`,s)}function s(){new r(a)}function c(e){for(let t in e)if(e[t]===null||typeof e[t]==`object`&&e[t]!==null&&c(e[t]))return!0;return!1}function l(){document.addEventListener(`change`,e=>{let t=e.target;if(console.log(t),t&&t.type===`radio`){let e=t.name,n=t.value,r=document.querySelector(`label[for="${t.id}"]`)?.innerHTML;u(e,n,r)}})}function u(e,t,n){switch(e){case`selectedTheme`:d(t,n),a.theme.selectedTheme=t;break;case`selectedPlayer`:f(t,n),a.player.selectedPlayer=t;break;case`selectedBoardSize`:a.board.selectedBoardSize=t,p(t,n)}}function d(e,t){let n=document.getElementById(`preview-theme`),r=document.getElementById(`setting_preview-Picture-img`);n&&(n.innerHTML=t??``),r&&(r.src=`../assets/preview-${e}.png`)}function f(e,t){let n=document.getElementById(`preview-player`);n&&(n.innerHTML=t??``)}function p(e,t){let n=document.getElementById(`preview-board`);n&&(n.innerHTML=t??``)}var m=document.getElementById(`main-container`);function h(){m.innerHTML=``,m.innerHTML=e,m.className=`main-container-startPage`,document.getElementById(`hero-btn`)?.addEventListener(`click`,g)}function g(){_(t,`main-container-settingsPage`),l()}function _(e,t){m.innerHTML=e,m.className=t}function v(e,t,n){let r=document.getElementById(t);r.innerHTML=e;let i=n/4;r.style.setProperty(`--Board-Size`,String(i))}h();