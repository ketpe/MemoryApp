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
</body>`,n=`<main id="main-container" class="main-container-gameover">\r
    <section class="game-over-center">\r
        <h1 class="game-over-center-headline">Game over</h1>\r
        <span class="game-over-center-sumary">\r
            <p>Final score</p>\r
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
        </span>\r
\r
    </section>\r
</main>`,r=`<main id="main-container" class="main-container-final">\r
\r
    <header class="final-header">\r
        <img src="" alt="">\r
    </header>\r
    <section class="final-center">\r
        <h2 id="final-center-firstheadline" class="final-center-firstheadline"></h2>\r
        <h1 id="final-center-winnerheadline" class="final-center-winnerheadline"></h1>\r
        <span id="final-center-img" class="final-center-img"></span>\r
        <button type="button" aria-label="back to Start Button" id="btn-backToStart" class="btn-backToStart ">\r
            <span></span>\r
        </button>\r
    </section>\r
</main>`,i=`<header class="game_header">\r
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
        <div class="game_header_center_icon" id="game_header_center_icon">\r
            <img id="currentPlayer-icon-img" src="../public/assets/labelBlueCtheme.svg" alt="" srcset="">\r
        </div>\r
    </section>\r
    <section class="game_header_right">\r
        <button id="btn-exit-dialog" class="secondary-btn" type="button">\r
\r
            <span>Exit game</span>\r
        </button>\r
    </section>\r
</header>\r
<section id="game_cards" class="game_cards">\r
\r
</section>\r
<dialog id="exit-dialog">\r
    <aside class="dialog-content">\r
        <span>Are you sure you want to quit the game ?</span>\r
        <div class="dialog-btn">\r
            <button class="btn-back" id="btn-back" type="button"></button>\r
            <button class="btn-exit" id="btn-exit" type="button"></button>\r
        </div>\r
    </aside>\r
</dialog>`;function a(e,t){return new Proxy(e,{get(e,n){let r=e[n];return typeof r==`object`&&r?a(r,t):r},set(e,n,r){return e[n]=r,t(),!0}})}var o=class{globalSettings;CONTENT;state;constructor(e){this.globalSettings=e,this.CONTENT=y;let t={cards:[],flippedCards:[],matchedCards:[],currentPlayer:this.globalSettings.player.selectedPlayer,isLocked:!1,pointsPlayerBlue:0,pointsPlayerOrange:0,matchWinner:null};this.state=a(t,()=>this.updateGame()),this.initGame()}updateGame(){this.setCurrentPlayerStateHTML()}initGame(){C(i,`main-container-game`),this.CONTENT&&(this.CONTENT.setAttribute(`data-theme`,this.globalSettings.theme.selectedTheme),this.CONTENT.setAttribute(`data-boardSize`,this.globalSettings.board.selectedBoardSize),document.getElementById(`game_cards`)?.setAttribute(`data-boardSize`,this.globalSettings.board.selectedBoardSize),this.setCurrentPlayerStateHTML(),this.createDeck(),this.addEventlistnerforCards(),this.addEventlistnerforDialog())}setCurrentPlayerStateHTML(){this.chooseImgForTheme(),this.setCurrentPoints(),this.flippCards(),this.setDialogText()}setDialogText(){let e=document.getElementById(`btn-back`),t=document.getElementById(`btn-exit`);!e||!t||(this.globalSettings.theme.selectedTheme,e.innerHTML=`Back to game`,t.innerHTML=`Exit game`,this.globalSettings.theme.selectedTheme===`gTheme`&&(e.innerHTML=`No, back to game`,t.innerHTML=`Yes, quit game`),this.globalSettings.theme.selectedTheme===`fTheme`&&(e.innerHTML=`NO, BACK TO GAME`,t.innerHTML=`EXIT GAME`))}chooseImgForTheme(){let e=document.getElementById(`currentPlayer-icon-img`);e&&(this.globalSettings.theme.selectedTheme===`cTheme`?this.setCthemePlayerIcon(e):this.setPlayerIcon(e))}setCthemePlayerIcon(e){this.state.currentPlayer===`pBlue`?e.setAttribute(`src`,`../public/assets/labelBlueCtheme.svg`):e.setAttribute(`src`,`../public/assets/labelOrangeCtheme.svg`)}setPlayerIcon(e){let t=document.getElementById(`game_header_center_icon`);t&&(e.setAttribute(`src`,`../public/assets/chess_pawnWhite.svg`),this.state.currentPlayer===`pBlue`?t.style.backgroundColor=`#1FAAFC`:t.style.backgroundColor=`#F58E39`)}setCurrentPoints(){let e=document.getElementById(`blueScore`),t=document.getElementById(`orangeScore`);!e&&!t||(e.innerHTML=this.state.pointsPlayerBlue.toString(),t.innerHTML=this.state.pointsPlayerOrange.toString())}flippCards(){this.state.cards.forEach(e=>{let t=document.getElementById(String(e.id));if(t){if(e.isFlipped===!0){let e=t.closest(`.card`);e&&e.classList.add(`is-flipped`)}else{let e=t.closest(`.card`);e&&e.classList.remove(`is-flipped`)}}})}handleCardClick(e){if(this.state.isLocked)return;let t=this.state.cards.find(t=>t.id===e);t&&!t.isFlipped&&(t.isFlipped=!0,this.state.flippedCards.push(t)),this.state.flippedCards.length==2&&(this.state.isLocked=!0,this.checkmatch()),this.state.matchedCards.length==2&&(this.state.isLocked=!0,T(),this.setCurrentPoints(),setTimeout(()=>{E(),this.loadAttributesForFinalpage()},2500))}loadAttributesForFinalpage(){if(this.state.pointsPlayerBlue>this.state.pointsPlayerOrange?this.state.matchWinner=`pBlue`:this.state.pointsPlayerBlue<this.state.pointsPlayerOrange?this.state.matchWinner=`pOrange`:this.state.pointsPlayerBlue===this.state.pointsPlayerOrange&&(this.state.matchWinner=`draw`),!this.state.matchWinner)return;let e=document.getElementById(`final-center-img`),t=document.getElementById(`final-center-winnerheadline`),n=document.querySelector(`.final-center`),r=document.getElementById(`final-center-firstheadline`);!e||!t||!r||!n||(n.setAttribute(`data-winner`,this.state.matchWinner),this.setAttributesforWinner(this.state.matchWinner,e,t,r),this.setBtnAttributesforBtn())}setAttributesforWinner(e,t,n,r){e===`pBlue`?(r.innerHTML=`The winner is`,t.classList=`final-center-img-blue`,n.innerHTML=`Blue Player`):e===`pOrange`?(r.innerHTML=`The winner is`,t.classList=`final-center-img-orange`,n.innerHTML=`Orange Player`):(r.innerHTML=`It's a`,t.classList=`final-center-img-draw`,n.innerHTML=`DRAW`)}setBtnAttributesforBtn(){let e=document.getElementById(`btn-backToStart`)?.querySelector(`span`);e&&(e.innerHTML=this.globalSettings.theme.selectedTheme===`cTheme`?`Back to Start`:`Home`,e.addEventListener(`click`,()=>this.handleBackClick()))}handleBackClick(){v(),x()}checkmatch(){let e=this.state.flippedCards[0],t=this.state.flippedCards[1];e.value===t.value?this.cardMatch(e,t):(this.cardMismatch(e,t),this.togglePlayer())}togglePlayer(){this.state.currentPlayer=this.state.currentPlayer===`pBlue`?`pOrange`:`pBlue`}cardMatch(e,t){this.state.matchedCards.push(e,t),this.state.cards.forEach(n=>{(n.id===e.id||n.id===t.id)&&(n.isMatched=!0,this.addPoints())}),this.state.flippedCards.splice(0,2),this.state.isLocked=!1}cardMismatch(e,t){setTimeout(()=>{e.isFlipped=!1,t.isFlipped=!1},1e3),this.state.flippedCards.splice(0,2),this.state.isLocked=!1}addPoints(){this.state.currentPlayer===`pBlue`?this.state.pointsPlayerBlue+=1:this.state.pointsPlayerOrange+=1}loadBoardSize(){return this.globalSettings.board.selectedBoardSize===`bSize1`?16:this.globalSettings.board.selectedBoardSize===`bSize2`?24:this.globalSettings.board.selectedBoardSize===`bSize3`?36:0}createDeck(){let e=this.loadTheme(),t=this.loadBoardSize();if(!e||!t)return;this.state.cards=this.createCardArray(e,t);let n=this.state.cards.map(t=>this.creatCardHTML(t,e)).join(``);n&&w(n,`game_cards`,t)}addEventlistnerforCards(){let e=document.getElementById(`game_cards`);e&&e.addEventListener(`click`,e=>{let t=e.target.closest(`.card`);if(t){let e=Number(t.id);this.handleCardClick(e)}})}addEventlistnerforDialog(){let e=document.getElementById(`exit-dialog`),t=document.getElementById(`btn-exit-dialog`),n=document.getElementById(`btn-back`);e&&t&&n?(t.addEventListener(`click`,()=>this.openDialog(e)),n.addEventListener(`click`,()=>this.closeDialog(e))):console.log(`Fehler`)}openDialog(e){e.showModal()}closeDialog(e){e.close()}creatCardHTML(e,t){return`<button aria-label="card-btn" id="${e.id}" class="card">
    <div class="card__inner">
        <div class="card__face" style="background-image: url(./assets/cards/${t}/${t}Card_1.png)"></div>
        <div class="card__face card__face--back" style="background-image: url(${e.value})"></div>
    </div>
</button>`}loadTheme(){return this.globalSettings.theme.selectedTheme}createCardArray(e,t){let n=[];for(let r=2;r<=t/2+1;r++){let t={value:`./assets/cards/${e}/${e}Card_${r}.png`,isFlipped:!1,isMatched:!1};n.push({...t,id:r*10+1}),n.push({...t,id:r*10+2})}return this.shuffleCards(n),n}shuffleCards(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}},s={get(e,t){let n=e[t];return n&&typeof n==`object`?new Proxy(n,s):n},set(e,t,n){return e[t]=n,f(c)||u(),!0}},c=new Proxy({theme:{selectedTheme:`cTheme`},player:{selectedPlayer:null},board:{selectedBoardSize:null}},s),l=!1;function u(){let e=document.getElementById(`game-start-btn`);e&&(e.disabled=!1,e.addEventListener(`click`,d,{once:!0}))}function d(){new o(c)}function f(e){for(let t in e)if(e[t]===null||typeof e[t]==`object`&&e[t]!==null&&f(e[t]))return!0;return!1}function p(){l||(l=!0,document.addEventListener(`change`,e=>{let t=e.target;if(t?.type===`radio`){let e=document.querySelector(`label[for="${t.id}"]`);m(t.name,t.value,e?.innerHTML)}}))}function m(e,t,n){switch(e){case`selectedTheme`:h(t,n),c.theme.selectedTheme=t;break;case`selectedPlayer`:g(t,n),c.player.selectedPlayer=t;break;case`selectedBoardSize`:c.board.selectedBoardSize=t,_(t,n)}}function h(e,t){let n=document.getElementById(`preview-theme`),r=document.getElementById(`setting_preview-Picture-img`);n&&(n.innerHTML=t??``),r&&(r.src=`../assets/preview-${e}.png`)}function g(e,t){let n=document.getElementById(`preview-player`);n&&(n.innerHTML=t??``)}function _(e,t){let n=document.getElementById(`preview-board`);n&&(n.innerHTML=t??``)}function v(){c.theme.selectedTheme=`cTheme`,c.player.selectedPlayer=null,c.board.selectedBoardSize=null}var y=document.getElementById(`main-container`);function b(){x()}function x(){C(e,`main-container-startPage`),document.getElementById(`hero-btn`)?.addEventListener(`click`,S)}function S(){C(t,`main-container-settingsPage`),p()}function C(e,t){y.innerHTML=e,y.className=t}function w(e,t,n){let r=document.getElementById(t);r.innerHTML=e;let i=n===16?4:6;r.style.setProperty(`--Board-Size`,String(i))}function T(){C(n,`main-container-gameover`)}function E(){C(r,`main-container-final`)}b();