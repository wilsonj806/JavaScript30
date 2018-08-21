/*
* 11- Custom HTML5 Video Player
* Version 1.0.0
* Date Started: 08-21-18
* Last Updated: 08-21-18
*/

/* Variable declaration/ DOM element retrieval */

const player = document.querySelector('.player');
const video = player.querySelector('video.player__video');
const toggle = player.querySelector('button.toggle');
const slider = player.querySelectorAll('input.player__slider');
const seekBar = player.querySelector('.progress__filled');
const seekBack = player.querySelector('.progress');
const skipButton = document.querySelectorAll('[data-skip]');
const fullscreenButton = document.querySelector('button[name="fullscreen"]');


seekBar.style.setProperty('flex-basis',`0%`);

// Functions below

function skip(e){
let inc = parseFloat(this.dataset.skip);
video.currentTime+=inc;
}

function seekBarAdjust(e){
let percent = (video.currentTime / video.duration) * 100;
seekBar.style.flexBasis = `${percent}%`; // .flexBasis is an accessible method within .style
}

function scrub(e){
let setTime = (e.offsetX/seekBack.offsetWidth) * video.duration; 
video.currentTime = setTime;
}

function slideAdjust(e){
video[this.name] = this.value;
}

// there's a faster way to do this by accessing the video.paused property
function playVideo(e){
const method = video.paused ? 'play' : 'pause';
video[method]();
/*
if (!video.paused){
video.play();
return;
}
if (video.paused){
video.pause();
return;
}
*/
}

function updateIcon(e){
const icon = this.paused ? '►':'▌▐';
toggle.textContent = icon;
}

function fullscreenToggle(){
(document.webkitFullscreenElement == null) ? video.webkitRequestFullscreen() : video.webkitExitFullscreen();
/*
if (document.webkitFullscreenElement == null){
video.webkitRequestFullscreen();
return;
}
if (document.webkitFullscreenElement){
video.webkitExitFullscreen();
return;
}
*/
}

/* Event listeners */

skipButton.forEach(button => button.addEventListener('click',skip));
slider.forEach(slide => slide.addEventListener('change', slideAdjust));
slider.forEach(slide => slide.addEventListener('mousemove', slideAdjust));

toggle.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', seekBarAdjust);

let mousedown = false; // tracks the mousedown state and returns a boolean
seekBack.addEventListener('click',scrub);
seekBack.addEventListener('mousemove',(e) => mousedown && scrub(e)); // Logical AND requires both be true so if mousedown is true then scrub(e) is run
seekBack.addEventListener('mousedown',() => mousedown = true);
seekBack.addEventListener('mouseup',() => mousedown = false);

fullscreenButton.addEventListener('click',fullscreenToggle);
video.addEventListener('fullscreenchange',(e) => console.log(e));