# Notes on Project 11 - Custom HTML5 Video Player

## List of new Javascript methods/ objects, etc
```javascript
HTMLMediaElement.defaultPlaybackRate = 1.0;
HTMLMediaElement.playbackRate = 1.0;
HTMLMediaElement.volume = 1.0;
HTMLMediaElement.play();
HTMLMediaElement.pause();
HTMLMediaElement.paused;
HTMLMediaElement.currentTime;
document.documentElement.style.flexBasis;
document.fullscreenElement;
document.requestFullscreen();
document.exitFullscreen();
```

## List of new concepts/ tools

[MDN tutorial on video and audio elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

- [The HTMLMediaElement interface](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
- [The Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)

## Logic explained

So we need to declare some variables/ fetch our DOM elements, make some functions, and add event listeners. Most of this is fairly straightforwards. 

### Variables

We need variables for the following DOM elements:
- video element
- the video player container
- play button
- the skip buttons
- the volume and playback rate sliders
- the video progress bar
- **BONUS** the fullscreen button

### Functions

We need a couple of functions:
- One for skipping ahead or back in the video by a preset amount `skip()`
- One for correctly indicating the current position of the video progress slider in relation to the video's length `seekBarAdjust()`
- One that let's us drag the video progress slider which will then go to the corresponding time stampe in the video `scrub()`
- One that will let us use the sliders to adjust both volume and playback rate
- One that let's us press a button to toggle pause and play
- One that will update the icon depending on the status of the video
- **BONUS** A function that toggles between fullscreen and not fullscreen

### Details

Notes and details as follows
- The `HTMLMediaElement.paused` property is not the same as the `HTMLMediaElement.pause()` function
    - Super basic but it's worth repeating
- **ALSO**, you can use brackets notation and declare variables to access object properties
    - See the `playVideo()` function from the project
    - Again, super basic but worth repeating
- You can use the logical AND operator to make something that resembles a conditional statement
    - so for `mousedown && scrub(e)` if `mousedown` is true then the statement returns `scrub(e)`
- All the conditional statements are simple enough that they can be shortened down to one line via the ternary operator
    - Do note that the expanded version of the conditional statements have been included anyways, it's just commented out
- The video progress bar update function and the scrub video function do two entirely seperate things and thus cannot be clumped into one function
    - **I.E Visually tracking video progress, and skipping to any point in the video via an interface item should not be clumped into the same function. It's probably/ is definitely a bad coding practice 
- **IMPORTANT** The Fullscreen API isn't fully supported/ standardized between browsers, so code will need to be changed or updated for compatability **AND** in future updates of the API
    - E.G Chrome and Mozilla use vendor prefixes with the Fullscreen API properties and methods

