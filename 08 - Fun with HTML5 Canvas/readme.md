# Notes on Project 08 HTML Canvas

## List of new methods
```javascript
canvas.getContext()
.strokestyle
.lineJoin
.lineCap
.lineWidth
.beginPath()
.stroke()
.lineTo
```

## List of new events and related properties
```json
event = 'mousemove'
event = 'mouseup'
event = 'mouseout'
event = 'mousedown'
event.offsetX
event.offsetY
```

## List of new concepts

- Mouse position tracking
- Tracking and attaching numerical values to DOM elements (kinda)
- Javascript `canvas.getContext()` and HTML `<canvas>` ([MDN reference on it](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D))
- Intermediate variables for more functionality when you're using event listeners

## Logic/ architecture

### Initial set up

First, we need to access the canvas element with the `#draw` ID via `document.querySelector`

We also need to declare it a canvas object in JS via the `.getcontext()` method

From there we set settings for a whole bunch of canvas elements

We also need to declare 5 variables
- `isDrawing` is for tracking the state of the mouse
- `lastX` and `lastY` are for tracking the last position of the mouse
- `hue` is for incrementing the color of the stroke
-`direction` is for determining whether `hue` increments or decrements

### Primary functions

This function does multiple things as follows

- First, if `isDrawing` is false, then the function returns
- Otherwise it does the following
    - Set stroke style with a template literal string to use HSL values and the `hue` variable
    - start a path on the canvas
    - Move the path to the last X and Y position
    - Create a line to the current mouse position set by `e.offsetX/Y`
    - Create a stroke from the measured mouse positions
    - Set the last X and Y position equal to the current mouse position for the next run through of the script
    - increment `hue`
- The above is for making a stroke, next we need to modify the stroke's properties as we draw on the canvas
- This is done via the following
    - First if `hue = 360` we reset it to 0
    - Next if our line width is greater than or equal to 100 OR if our line width is less than or equal to one, we set `direction = false`
    - if direction is true, then we increment line width up
    - otherwise we decrement line width down
    
### Event listeners

For the event listeners we're listening for mouse events and using that to set the value of `isDrawing`

The only slightly complicated event listener is for `'mousedown'` and it's as follows:
```javascript
canvas.addEventListener('mousedown', (e) => {
isDrawing = true;
// update current mousedown position
[lastX, lastY] = [e.offsetX, e.offsetY];
});
```
- For this event listener we listen for when the mouse is pressed down and then set `isDrawing = true`
- We also update the values of `lastX` and `lastY` so that the stroke is consistent with what we expect from our HTML canvas.

The rest of the event listeners are fairly straight-forwards and feed into an anonymous function that sets the value of `isDrawing` depending on the event.
