# Notes on Project 17 Sort Without Articles

## Architecture

Logic is pretty simple for this one, we have a JS array of band names and we want to push them into a HTML unordered list that starts out empty. The catch is that the list needs to be in alphabetical order and should not include articles when ordering them.
  - Articles here include (*the, a, an*)


We need to have two variables at first and they're as follows:
  ```javascript
    const bands = [...'band names here'];
    const itemsList = document.querySelector('ul#bands');
  ```
  - We start with the `bands` variable
  - We technically don't need `itemsList` but I did it out of muscle memory

We need one function to process the elements inside the `bands` array
  ```javascript
    function stripList(bandName){
      return bandName.replace(/^(the | a | an )/i, '').trim();
    }
  ```
  - This function strips out the article in a string
    - it does it with the `String.prototype.replace()` method combined with the `String.prototype.trim()` method
    - we use regular expression to figure out if the first word in a band name matches our selection criteria
      - the carrot(`^`) is part of [RegEx special characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters) and is used to match the beginning of the input only
    - we also specify that we're replacing the article with nothing, which lets us trim the string with no issues

From there we introduce a new variable to hold the sorted list and set it's value equal to the following JS expression:
  ```javascript
    const sortedBands = bands.sort((a,b)=> (stripList(a) > stripList(b)) ? 1: -1);
  ```
  - A couple of things are happening here, first we're using `Array.prototpye.sort()` on the *bands* variable
  - Within the sort, we're applying the `stripList()` function on both inputs
    - this lets us sort array elements without the articles

Then finally, we spread the contents of the array into HTML list elements with the `Array.prototype.map()` method:
  ```javascript
    itemsList.innerHTML = sortedBands.map((band)=>{
      return`
      <li>${band}</li>
      `
    }).join('');
  ```