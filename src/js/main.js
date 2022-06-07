console.log('It`s work')
window.onload=init
const RENDER_ROOT_POPUP='.popup'
const RENDER_COUNT_POPUP='.v-count'
const RENDER_BTN_RESET_POPUP='.alert__btn-reset'


function count(_name){
    let i=0
    let name=_name
    return function(){
        return {
            inc:()=>{++i; return i},
            value:()=> i,
            reset:()=> {i=0; return i},
            set:(val)=> {i=val; return val},
            name:()=> name
        }
    }
}

const popup = {
    init:({rootClassName,countClassName})=>{
        console.log(rootClassName)
popup.elemRoot=document.querySelector(rootClassName)
popup.elemCount=document.querySelector(countClassName)
popup.elemBtnReset=document.querySelector(RENDER_BTN_RESET_POPUP)
    },
    property:({value, reset})=>{
        // addEvent onClick
        popup._reset = reset
        console.log(value())
        console.log(popup)
        return popup
    },
    open:()=>{
        console.log('show')
        console.log(popup.elemRoot)
        popup.elemRoot.dataset.visible=true
    //
    },
    close:(e)=>{
        console.log(e)
        if (e.target.classList.contains('popup')||
        e.target.classList.contains('alert__btn-close')
        )  {
            popup.elemRoot.dataset.visible=false
        }
        console.log(e)
        
    },

    setCount:(val)=>{
        popup.elemCount.innerText=val
    },

    // reset
    showResetBtn:()=>{
        console.log('BTN show')
        console.log(popup.elemRoot)
        popup.elemBtnReset.dataset.visible=true
    //
    },

    hideResetBtn:()=>{
        console.log('BTN show')
        console.log(popup.elemRoot)
        popup.elemBtnReset.dataset.visible=false
    //
    },

    resetCount:()=>{
        popup._reset()
        popup.setCount(0)
        popup.hideResetBtn()
    }

}
const state={
    popup:false,
    counts:[]
}



function init(){
    // проверить localStorage

    // init PopUp
    popup.init({
        rootClassName:RENDER_ROOT_POPUP,
        countClassName:RENDER_COUNT_POPUP
    })
    // загрузить данные в state
    window.counts=[]
    counts.push(count("id1"))
    counts.push(count("id2"))
    counts.push(count("id3"))
}


const onClick=(id)=>{
    console.log('click valueId=',id)
    
    const item=window.counts.find(element => {
        console.log(element())
        console.log(element().name())
        if (element().name()===id) {console.log('if::',element());return element}
    })

    //console.log(item().inc())
    let N = item().inc()
    console.log('model', N)
    


   const monada= popup.property(item())
   console.log(monada.open())
   console.log(monada.setCount(N))

   // if count>5 show btn-reset
   if (N>5) monada.showResetBtn()
}
