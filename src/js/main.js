console.log('It`s work')
window.onload = init
const RENDER_ROOT_POPUP = '.popup'
const RENDER_COUNT_POPUP = '.v-count'
const RENDER_BTN_RESET_POPUP = '.alert__btn-reset'


function count(_name) {
    // init
    let i = 0
    let name = _name
    const saveToBD = val => localStorage.setItem(name, val)
    // check localstorage
    let ls_i = +localStorage.getItem(name)// + strToInt
    // if the value in localstorage exists then apply it
    if (ls_i !== null && Number.isInteger(ls_i)) { i = ls_i }
    // main
    return function () {
        // return object with api
        return {
            inc: () => { ++i; saveToBD(i); return i },
            getValue: () => i,
            reset: () => { i = 0; saveToBD(i); return i },
            setValue: (val) => { i = val; saveToBD(i); return i },
            name: () => name,
            saveToBD: val => localStorage.setItem(name, val)
        }
    }
}

// object model POPUP
const popup = {
    // set render DOM node
    init: ({ rootClassName, countClassName }) => {
        popup.elemRoot = document.querySelector(rootClassName)
        popup.elemCount = document.querySelector(countClassName)
        popup.elemBtnReset = document.querySelector(RENDER_BTN_RESET_POPUP)
    },
    property: ({ getValue, reset }) => {
        // addEvent onClick
        popup.getValue = getValue
        // this=popup
        popup.reset = reset
        return popup
    },
    // <div class=RENDER_ROOT_POPUP visible=true>
    open: () => {
        // set data-visible=true for css [data-visible=true]{display:block;}
        popup.elemRoot.dataset.visible = true

    },

    // <div class=RENDER_ROOT_POPUP visible=false>
    close: (e) => {
        // if click to div class=popup or button class=alert__btn-close then popup.visible=false
        if (e.target.classList.contains('popup') ||
            e.target.classList.contains('alert__btn-close')
        ) {
            // this=popup
            popup.elemRoot.dataset.visible = false
        }

    },

    // render i in span class=RENDER_COUNT_POPUP
    renderCount: (val) => {
        popup.elemCount.innerText = val
    },

    // reset
    showResetBtn: () => {
        popup.elemBtnReset.dataset.visible = true
    },

    hideResetBtn: () => {
        popup.elemBtnReset.dataset.visible = false
    },

    resetCount: () => {
        //_reset()->
        popup.reset() //{ getValue, reset } = property
        //popup.renderCount(0)
        popup.renderCount(popup.getValue()) // from  { getValue, reset } = property
        popup.hideResetBtn()
    }

}
const state = {
    popup: false,
    counts: []
}



function init() {
    // проверить localStorage

    // init PopUp
    popup.init({
        rootClassName: RENDER_ROOT_POPUP,
        countClassName: RENDER_COUNT_POPUP
    })
    // загрузить данные в state
    window.counts = []
    // example for 3 button (inc)
    counts.push(count("id1"))
    counts.push(count("id2"))
    counts.push(count("id3"))
}


const onClick = (id) => {
    // item element arr of counts
    const item = window.counts.find(element => {
        if (element().name() === id) { console.log('if::', element()); return element }
    })

    let N = item().inc()

    const monada = popup.property(item())
    
    // if count>5 show btn-reset
    if (N > 5) monada.showResetBtn()
}
