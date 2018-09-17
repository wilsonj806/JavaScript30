# Notes on Project 16 Mouse Move Shadow

## Concepts used

Object destructuring

Event bubbling and effects on a mouse event listener applied to the parent element

Maths, lots of math

## Architecture

The main takeaway from this challenge is that, due to the way event bubbling works, child elements will mess with mouse event handlers.

First we need three variables and they're as follows:
  ```javascript
    const hero = document.querySelector('.hero'); // selects the div.hero DOM element
    const text = hero.querySelector('h1'); // selects the h1 DOM element
    const walk = 100; // or 100px
  ```

We also attach an event listener on the variable `hero` that listens for a mouse move event.

There's only one function in the JS script and it's as follows:
  ```javascript
    function shadow(e){
      // use destructuring for a quick object get
      const {offsetWidth: width, offsetHeight:height} = hero;
      let {offsetX: x, offsetY: y} = e;
      // if we're mousing over a child element when we're listening to the parent element, it gives the offset of the child
      if (this !== e.target){
        x = x + e.target.offsetLeft;
        y = y + e.target.OffsetTop;
      }
      //console.log(x);
      // (x / width) gives a percent of the width and likewise for (y/ height)
      const xWalk = Math.round((x / width * walk) - (walk/2)); // range is 100px, max = 50px, min = -50px
      const yWalk = Math.round((y / width * walk) - (walk/2));
      
      text.style.textShadow = `
      ${xWalk}px ${yWalk}px 0 rgba(255,0,0,0.7),
      ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,0,.7),
      ${xWalk}px ${yWalk * -1}px 0 rgba(0,0,255,0.7)
      `;

    }
  ```

Some notes about this:
  - We use a destructuring assignment on `hero` to assign variables to the following properties:
    - `const width = hero.offsetWidth`
    - `const height = hero.offsetHeight`
  - We then use a destructuring assignment on the event to assign variables to the following:
    - `let x = e.offsetX`
    - `let y = e.offsetY`
  - From there, a conditional statement is used to check for the following:
    ```javascript
      if (this !== e.target)
    ``` 
    - first, the `this` keyword here is the `hero` DOM element
    - with that out of the way, we need this conditional statement for a couple of reasons
      - when we mouse over the `h1` element nested in *hero*, JS still triggers the event listener thanks to event bubbling
      - however, as noted by the conditional statement, the target element stops reporting the position of the mouse relative to `hero`
      - instead, it switches to the `h1` element
    - so, if the conditional statement is met with a true response, we update *x* and *y* by adding an offsest to the current *x* and *y* position
      - this offset value is the distance of `h1` from the top and left sides of the window/ document
  - After that, we do some math to figure out where the text shadow should be positioned in the x and y axes
    - its pretty straight-forwards and it's basically `((position / totalLength) * offsetFactor) - (.5 * offsetFactor)`
  - Finally we use these values to change the `text-shadow` property of *text* with a template literal string