console.log('It`s work')
window.onload = init
// The class is needed to fire the event on the button
const ON_CLOSE_ROOT_MODAL_CLASS = 'modal' // event => close
const ON_CLOSE_ICO_MODAL_CLASS = 'alert__ico' // event => close
const ON_CLOSE_BTN_CLOSE_MODAL_CLASS = 'alert__btn-close' // event => close

const RENDER_MAIN = '.main'// for trigger  .main||.modal inert=true/false
const RENDER_ROOT_MODAL = '.modal' //popup.init
const RENDER_COUNT_ALERT = '.alert__v-count'//popup.init
const BTN_RESET_ALERT = '.alert__btn-reset'//popup.init


const MAX_COUNT = 5

//inert
const setFocusModal = () => {
    document.querySelector(RENDER_MAIN).setAttribute("inert", true)
    document.querySelector(RENDER_ROOT_MODAL).removeAttribute("inert")
}
const setFocusMain = () => {
    document.querySelector(RENDER_ROOT_MODAL).setAttribute("inert", true)
    document.querySelector(RENDER_MAIN).removeAttribute("inert")
}


function init() {
    // проверить localStorage

    // init PopUp
    // set render NODE DOM
    popup.init({
        rootClassName: RENDER_ROOT_MODAL,
        countClassName: RENDER_COUNT_ALERT
    })
    // загрузить данные в state
    window.counts = []
    // example for 3 button (inc)
    counts.push(count("id1"))
    counts.push(count("id2"))
    counts.push(count("id3"))

    // set inert
    setFocusMain()
}


const onClick = (id, e) => {
    //console.log(e.target)
    const btnInc = e.target
    // find item element arr of counts
    const item = window.counts.find(element => {

        if (element().getName() === id) { return element }
    })

    // console.log(typeof item)
    //console.log(!!item)
    //console.log(item)
    if (!!item) {
        // console.log('item=true')
        // getNextCount
        let N = item().inc()
        // getAPI
        const popupAPI = popup.property(item()) // get Property Item <Obj>
        // (check n>5) btnReset=visible
        if (N > MAX_COUNT) popupAPI.showResetBtn()
        // blur()
        btnInc.blur()
        // show popup
        popup.open()
        // show count
        popup.renderCount(popup.getValue())
    }




    // if count>5 show btn-reset

}

// Object count
function count(_name) {
    // constructor()

    let i = 0
    let name = _name
    // private
    const saveToBD = val => localStorage.setItem(name, val)
    const loadFromBD = () => +localStorage.getItem(name) // <int>
    const setItemBD = i => { saveToBD(i); return loadFromBD() }
    const getItemBD = () => { return +localStorage.getItem(name) }

    // init
    // check localstorage
    let bd_i = getItemBD()// + strToInt
    // if the value in localstorage exists then apply it
    //if (ls_i !== null && Number.isInteger(ls_i)) { i = ls_i }
    if (bd_i !== null && Number.isInteger(bd_i)) { i = bd_i }


    // main
    return function () {
        // return API object
        // public
        return {

            //inc: () => { ++i; saveToBD(i); return i },
            //inc: () => { ++i; saveToBD(i); return loadFromBD() },
            inc: () => { ++i; return setItemBD(i) },
            //getValue: () => i,
            getValue: () => loadFromBD(),
            //reset: () => { i = 0; saveToBD(i); return i },
            reset: () => { i = 0; saveToBD(i); return loadFromBD() },
            //setValue: (val) => { i = val; saveToBD(i); return i },
            //setValue: (val) => { i = val; saveToBD(i); return loadFromBD() },
            setValue: (val) => { i = val; return setItemBD(i) },
            getName: () => name
        }
    }
}

// object model POPUP
// popup.close()
// popup.reset()
// singelton
const popup = {
    // set render DOM node
    init: ({ rootClassName, countClassName }) => {
        popup.elemRoot = document.querySelector(rootClassName)
        popup.elemCount = document.querySelector(countClassName)
        popup.elemBtnReset = document.querySelector(BTN_RESET_ALERT)
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
        // inert
        setFocusModal()
    },
 
    // <div class=RENDER_ROOT_POPUP visible=false>
    close: (e) => {
       
        // if click to div class=popup or button class=alert__btn-close then popup.visible=false
        if (e.target.classList.contains(ON_CLOSE_ROOT_MODAL_CLASS) ||
            e.target.classList.contains(ON_CLOSE_ICO_MODAL_CLASS) ||
            e.target.classList.contains(ON_CLOSE_BTN_CLOSE_MODAL_CLASS)
        ) {
            // this=popup
            popup.elemRoot.dataset.visible = false
            // inert modal
            setFocusMain()
        }

    },

    // render i in span class=RENDER_COUNT_POPUP
    renderCount: (val) => {
        popup.elemCount.innerText = val


    },

    // reset
    showResetBtn: () => {
        popup.elemBtnReset.dataset.visible = true
        // set focus in btnReset
        // 
        window.setTimeout(function () {
            popup.elemBtnReset.focus()
        }, 0)

    },

    hideResetBtn: () => {
        popup.elemBtnReset.dataset.visible = false
    },

    resetCount: () => {
        // check yes/cancel
        let isCheckReset = confirm('After clicking the "OK" button, the counter will be reset. Proceed?')
        if (isCheckReset) {
            //_reset()->
            popup.reset() //{ getValue, reset } = property
            //popup.renderCount(0)
            popup.renderCount(popup.getValue()) // from  { getValue, reset } = property
            popup.hideResetBtn()
        }// if
    }// resetCount

}
