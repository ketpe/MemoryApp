(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`<!DOCTYPE html>\r
<html lang="en">\r
\r
<head>\r
    <meta charset="UTF-8">\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r
    <title></title>\r
</head>\r
\r
<body>\r
    <main id="main-container-start" class="main-container-start">\r
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
    </main>\r
</body>\r
\r
</html>`,t=`<!DOCTYPE html>\r
<html lang="en">\r
\r
<head>\r
    <meta charset="UTF-8">\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r
    <title></title>\r
</head>\r
\r
<body>\r
\r
\r
\r
</body>\r
\r
</html>`,n=document.getElementById(`main-container`);function r(){n.innerHTML=``,n.innerHTML=e,document.getElementById(`hero-btn`)?.addEventListener(`click`,i)}function i(){n.innerHTML=``,n.innerHTML+=t}r();