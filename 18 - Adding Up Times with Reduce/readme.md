# Notes on Project 18 Adding Up Times With Reduce

## Architecture

This one is also pretty straight-forwards. The end goal is to get the total duration from a list of videos.
  - It's a fairly common problem to solve and different pages have different ways of presenting video duration
  - Here we get duration via the `[data-time]` data attribute

So first we grab the HTML elements with the `[data-time]` attribute, convert it to an array, and assign it to the variable *listTime*.
  ```javascript
   const listTime = Array.from(document.querySelectorAll('[data-time]'));
  ```
  - We convert it to an array as a large amount of array methods don't work on Node Lists
    - `document.querySelectorAll()` retrieves DOM elements as a Node List

Next we define a variable `seconds` which looks like the following:
  ```javascript
    const seconds = listTime.map(video=>video.dataset.time).map((entry)=>{
      const [min, s] = entry.split(':').map(parseFloat);
      return (min * 60) + s;
    }).reduce((total,current)=> total + current);
  ```
`seconds` is the end result of doing quite a bit to the variable `listTime`
  - First we use `Array.prototype.map()` to grab the value of `[data-time]` for each element in *listTime*
  - From there we use `Array.prototype.map()` again to process the `[data-time]` value
    - processing involves first splitting each value into 2 via `String.prototype.split()` on each entry
      - the `String.prototype.split()` method returns an array
    - then we use `Array.prototype.map()` and apply the `parseFloat()` function on it to convert it to a float
  - The final results from this are assigned to the *min* and *s* variables via destructuring
  - We then perform some math to convert minutes to seconds and return that value for further manipulation
  - Finally we use `Array.prototype.reduce()` to sum up all of the duration values returned from our `Array.prototype.map()` calls

  The rest from here is pretty easy and is just a matter of converting the seconds to hours, then taking the remainder and rounding it down to get minutes, and then finally taking the remainder from converting minutes.