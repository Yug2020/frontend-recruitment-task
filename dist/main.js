console.log("It`s work"),window.onload=init;const RENDER_ROOT_POPUP=".popup",RENDER_COUNT_POPUP=".v-count",RENDER_BTN_RESET_POPUP=".alert__btn-reset";function count(e){let t=0,o=e;const n=e=>localStorage.setItem(o,e);e=+localStorage.getItem(o);return null!==e&&Number.isInteger(e)&&(t=e),function(){return{inc:()=>(++t,n(t),t),getValue:()=>t,reset:()=>(t=0,n(t),t),setValue:e=>(t=e,n(t),t),name:()=>o,saveToBD:e=>localStorage.setItem(o,e)}}}const popup={init:({rootClassName:e,countClassName:t})=>{popup.elemRoot=document.querySelector(e),popup.elemCount=document.querySelector(t),popup.elemBtnReset=document.querySelector(RENDER_BTN_RESET_POPUP)},property:({getValue:e,reset:t})=>(popup.getValue=e,popup.reset=t,popup),open:()=>{popup.elemRoot.dataset.visible=!0},close:e=>{(e.target.classList.contains("popup")||e.target.classList.contains("alert__btn-close"))&&(popup.elemRoot.dataset.visible=!1)},renderCount:e=>{popup.elemCount.innerText=e},showResetBtn:()=>{popup.elemBtnReset.dataset.visible=!0},hideResetBtn:()=>{popup.elemBtnReset.dataset.visible=!1},resetCount:()=>{popup.reset(),popup.renderCount(popup.getValue()),popup.hideResetBtn()}},state={popup:!1,counts:[]};function init(){popup.init({rootClassName:RENDER_ROOT_POPUP,countClassName:RENDER_COUNT_POPUP}),window.counts=[],counts.push(count("id1")),counts.push(count("id2")),counts.push(count("id3"))}const onClick=t=>{const e=window.counts.find(e=>{if(e().name()===t)return console.log("if::",e()),e});var o=e().inc();const n=popup.property(e());5<o&&n.showResetBtn()};