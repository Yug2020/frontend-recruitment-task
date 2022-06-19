# Test

Initial data:
> layout done in figma

Target:
>Make rwd with wcag



## Layout made according to BEM methodology
Used PUG
```
index.pug (configurable title)
    layout.pug
        popup.pug (alert)
        content.pug
```

## Layout styles
Used SASS
```scss
main.sass
    @import url('https://fonts.googleapis.com...') (connecting fonts)
    @import "_const" layout colors and sizes)
    @import "_mediaquery" (mixin mediaQuery point)
    @import "_rwd" (mixin rwd for text and title )
    @import "_common" (common UI title, btn)
    @import "_alert" (styles for popup)
    @import "_content" (styles for contenta)
```

## JS (vanila)
``` js
function init() {
    // init PopUp
    // set render NODE DOM
    popup.init({
        rootClassName: RENDER_ROOT_MODAL,
        countClassName: RENDER_COUNT_ALERT
    })
    // load data to state
    window.counts = []
    // example for 3 button (inc)
    counts.push(count("id1"))// demo
    counts.push(count("id2"))// work
    counts.push(count("id3"))// demo

    // set inert
    setFocusMain()
}
```

**function count(_name)**

>Creates a counter.

**object popup<object>**

>Controls the popup


**Secondary functions**

> setFocusModal()
> setFocusMain()
> setScrollBody(<bool>)