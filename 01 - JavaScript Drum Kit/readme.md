# Notes for Project 01 - JS Drum Kit

## List of methods used:

- `.querySelector`
- `.currentTime`
- `.play()`
- `.classList`
- `.add()`
- `.remove()`
- `.forEach`
- `.propertyName`
- `.querySelectorAll`
- `.forEach`
- `.addEventListener`

## Logic/ architecture

First you need 2 functions:

- One that adds the animation and the sound clip playing when you press a key
- One that removes the animation

You need one global variable that does the following:

- Stores all Selectors that have the class `.key` in it
- Adds an event listener that listens for the end of a transition
        - In this case it's listening ONLY for the end of the `transform` animation

You need one `window` event listener that listens for a `'keydown'` event

Within the `playSound` function, you need the following:

- Two `document.querySelector` calls
    - One for selecting/ playing audio
    - One for selecting the elements with the `.key` class to play an animation 
- A conditional `if` statement to `return` if there's no audio playing because a key connected to audio hasn't been pressed
- A `audio.currentTime = 0;` statement to re-initialize the audio clip at 0 whenever the key is pressed
    - This lets you spam the key
- `audio.play()` for playing the audio clip
- `key.classList.add('playing')` for doing two things
    - fetch the list of classes attached to the `const key` and thus elements with `.key` as a class
    - Adds the `playing` class to the `.key` elements
        - Note that you don't need to specify `.playing`

Within the `removeTransition` function you need the following:

- An `if` statement that checks the animation properties to make sure that it's not trying to remove every single animation (in this case, box shadow, scale, AND border-color) attached to the removeTransition event
- A `this.classList.remove('playing')`
    - The `this` keyword selects the `e` input which looks like `playSound('keydown')`
    - The `.classList` method grabs the list of classes from both `audio` elements and elements with the `.key` class
    - The `.remove('playing')` function removes the `'playing'` class from both


The global variable is labeled `const keys` and has the following:

- First set `const keys = document.querySelectorAll('.key')`
    - This goes into the document's DOM and returns a static NodeList of the document's elements that matches the specified selector (in this case, any element with the `.key` class)
- After that, we use `keys.forEach(key => key.addEventListener('transitionend', removeTransition))`
    - First the `.forEach()` method executes the input function for each entry in an array or a set object (in this case its `keys = document.querySelectorAll('.key')` so it's the list of elements with the class `.keys`)
    - The input function in this case is written with arrow notation and adds `key.addEventListener('transitionend', removeTransition)` to every entry of `const key`

The final line is `window.addEventListener('keydown', playSound)`

-  Here, `.addEventListener` is applied to the `window` object and waits for the `'keydown'` event and then is called back as the input for the `playSound` function

## Notes about everything

- `window` is a default object that represents the window that contains a DOM document
- `.addEventListener()` format is: `.addEventListener('event', function_for_event_callback)`
    - in the case of a key down we used `window.addEventListener('keydown', playSound)`
        - This then is read by the function later on as: `function playSound('keydown'){}`
- The `document.querySelectorAll` returns a Node List object but isn't actually an array even though you can use forEach on it
    - Node List also can either be a *live collection* or a *static collection*
        - In the case of `document.querySelectorAll` it returns a static collection
- `document.querySelector()` returns the first descendant of the `document` element that's being invoked that matches the specified group of selectors
    - In this case `document.querySelector('audio[data-key="${e.keyCode}"])` looks for any `audio` element with a `data-key` data attribute that matches the `keyCode` value accessed via the event from `window.addEventListener('keydown',playSound)`
    - And if you put this in ```javascript console.log(document.querySelector(`div[data-key="65"]`));``` it'd return the following:
        -`<div data-key="65" class="key playing">…</div>`    
- `.classList` returns a list 
    - so if you put `console.log(key.classList)` at the end of `function playsound(e){}` it spits out the following:
        - `DOMTokenList(2) ["key", "playing", value: "key playing"]`


# Notes for Project 01 - JS Drum Kit

## List of methods used:

- `.querySelector`
- `.currentTime`
- `.play()`
- `.classList`
- `.add()`
- `.remove()`
- `.forEach`
- `.propertyName`
- `.querySelectorAll`
- `.forEach`
- `.addEventListener`

## Logic/ architecture

First you need 2 functions:

- One that adds the animation and the sound clip playing when you press a key
- One that removes the animation

You need one global variable that does the following:

- Stores all Selectors that have the class `.key` in it
- Adds an event listener that listens for the end of a transition
        - In this case it's listening ONLY for the end of the `transform` animation

You need one `window` event listener that listens for a `'keydown'` event

Within the `playSound` function, you need the following:

- Two `document.querySelector` calls
    - One for selecting/ playing audio
    - One for selecting the elements with the `.key` class to play an animation 
- A conditional `if` statement to `return` if there's no audio playing because a key connected to audio hasn't been pressed
- A `audio.currentTime = 0;` statement to re-initialize the audio clip at 0 whenever the key is pressed
    - This lets you spam the key
- `audio.play()` for playing the audio clip
- `key.classList.add('playing')` for doing two things
    - fetch the list of classes attached to the `const key` and thus elements with `.key` as a class
    - Adds the `playing` class to the `.key` elements
        - Note that you don't need to specify `.playing`

Within the `removeTransition` function you need the following:

- An `if` statement that checks the animation properties to make sure that it's not trying to remove every single animation (in this case, box shadow, scale, AND border-color) attached to the removeTransition event
- A `this.classList.remove('playing')`
    - The `this` keyword selects the `e` input which looks like `playSound('keydown')`
    - The `.classList` method grabs the list of classes from both `audio` elements and elements with the `.key` class
    - The `.remove('playing')` function removes the `'playing'` class from both


The global variable is labeled `const keys` and has the following:

- First set `const keys = document.querySelectorAll('.key')`
    - This goes into the document's DOM and returns a static NodeList of the document's elements that matches the specified selector (in this case, any element with the `.key` class)
- After that, we use `keys.forEach(key => key.addEventListener('transitionend', removeTransition))`
    - First the `.forEach()` method executes the input function for each entry in an array or a set object (in this case its `keys = document.querySelectorAll('.key')` so it's the list of elements with the class `.keys`)
    - The input function in this case is written with arrow notation and adds `key.addEventListener('transitionend', removeTransition)` to every entry of `const key`

The final line is `window.addEventListener('keydown', playSound)`

-  Here, `.addEventListener` is applied to the `window` object and waits for the `'keydown'` event and then is called back as the input for the `playSound` function

## Notes about everything

- `window` is a default object that represents the window that contains a DOM document
- `.addEventListener()` format is: `.addEventListener('event', function_for_event_callback)`
    - in the case of a key down we used `window.addEventListener('keydown', playSound)`
        - This then is read by the function later on as: `function playSound('keydown'){}`
- The `document.querySelectorAll` returns a Node List object but isn't actually an array even though you can use forEach on it
    - Node List also can either be a *live collection* or a *static collection*
        - In the case of `document.querySelectorAll` it returns a static collection
- `document.querySelector()` returns the first descendant of the `document` element that's being invoked that matches the specified group of selectors
    - In this case `document.querySelector('audio[data-key="${e.keyCode}"])` looks for any `audio` element with a `data-key` data attribute that matches the `keyCode` value accessed via the event from `window.addEventListener('keydown',playSound)`
    - And if you put this in ```javascript console.log(document.querySelector(`div[data-key="65"]`));``` it'd return the following:
        -`<div data-key="65" class="key playing">…</div>`    
- `.classList` returns a list 
    - so if you put `console.log(key.classList)` at the end of `function playsound(e){}` it spits out the following:
        - `DOMTokenList(2) ["key", "playing", value: "key playing"]`
