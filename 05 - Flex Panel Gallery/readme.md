# Notes on Project 05 Flex Panel Gallery

## List of CSS concepts/ properties used
```css
flex
flex-grow
flex-shrink
flex-basis
transition:flex;
```

## CSS notes

First:
- `div.panels` is the main flex container
withthin that, we have the 4 or 5 `div.panel` elements which also act as flex containers for the items inside

- `transition` is actual shorthand for 4 other CSS properties:
    ```css
    transition-property
    transition-duration
    transition-timing-function
    transition-delay
    ```
- For transition-property, the default value is `all`, which means that the transition animation is applied to everything that changes states (i.e `:hover` or the JS event, `'click'`)
    - In the case of our panels, the first transition tracks the state of `flex-grow`
    - When `flex-grow`'s value changes, it starts the transition animation for the translation of the off screen text

- In the case of the offset text in each panel, the state it's tracking is the `flex-grow` property and when the value of `flex-grow` changes, it spits out the following in the console:
```json
TransitionEvent{isTrusted:true, propertyName: "flex-grow", elapsedTime: 0.7, pseudoElement:"",type:"transitionend",...}
    bubbles:true
    cancelBubble:false
    ...
    path:Array(6)
        0: div.panel5.open.open-active
        1: div.panels
        2: body
        3: html
        4: document
        5: Window {postMessage:f, blur :f, focus:f, close:f, frames:window,...}
    ...
    propertyname: "flex-grow"
    pseudoElement:""
    returnvalue: true
    srcElement: div.panel.panel5.open.open-active
    target:div.panel.panel5.open.open-active
    timeStamp: 6364
    type: "transitionend"
    __proto__: TransitionEvent
```


## JS notes

It's pretty straight forwards:

You need to grab the `.panel` divs from the DOM and assign it a JS variable

You need to listen for two events, one for when you click on a panel, and one when the panel finishes animating to its next state

You need two functions:

- One toggles the `.open` class when you click on a `.panel` element

- One toggles the `.open-active` class after the `.panel` element's flex animation ends

    -Need to check which event it does it for though
    
    -Check this with the console
