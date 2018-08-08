# Notes on Project 06 Ajax Type Ahead

## List of JS methods and etc used
```javascript
RegExp()
.json()
.replace()
.then()
fetch()
```

## Logic/ Architecture

The overall goal of this project is to try to see if a user's input city matches with an external data source. More specifically, we have a JSON file with cities and some information in it. We need to import it into our HTML file and then figure out a way to see if the user's input matches.

- So the HTML file starts out with a variable that already includes a link to the JSON object in question.

- We then initialize an empty array called `cities` and use the following to import the data and plug it in the the newly initialized array. It's the following from the solution but expanded.
```javascript
fetch(endpoint)
.then(
    function importer (blob) {
    return blob.json();
}).then(
    function pusher (data){
    return cities.push(...data);
});
```
- From there we need to initialize two functions, one that finds out if there's a match from the user input, and another that returns whether or not there's a match

### findMatches function

- The first function looks like this:
```javascript
function findMatches(wordToMatch,cities){
    return cities.filter(place=>{
    
    //figure out if the city/ state matches
    // .match() is a regular expression
    const regex = new RegExp(wordToMatch, 'gi');
    //console.log(place.city.match(regex));
    return place.city.match(regex) || place.state.match(regex);
});
}
```
- the  `findMatches` function passes in the user input and the array `cities` as the input and then returns the result from filtering out values of the `cities` array

- The filtering function takes an input of place and then initializes `regex` as a new instance of a Regular Expression object with the following inputs:
    - First the user input `wordToMatch`
    - Second the string `gi` which in this case means the following:
        - `g` represents **Global Match** so that the RegExp continues through the entire array to find matches
        - `i` represents **Ignore Case** so the RegExp construct isn't case sensitive
- From there if there's a *match* of city OR state then it returns it for future manipulation

### displayMatches function

- The `displaymatches` function looks like this:
```javascript
function displayMatches(){
    //console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    //console.log(matchArray);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join(''); //combines multiple items in an arry into a string
    //console.table(html);
    suggestions.innerHTML = html;
}
```

- The `displayMatches` fucntion starts by initializing a local variable `matchArray` which calls the function `findMatches` and tells it to process the user's input (done via the event listener later) and the `cities` array

- Then the results of the `findMatches` function are processed again

- A new variable `html` is initialized as a new array which applies the `.map()` array method on our new `matchArray` and performs the following operation on it:
        - First the RegExp global object is reinitialized locally and takes in `this.value` and `gi` as inputs
            - `gi` was explained in the previous subsection so lookg there
        - Then two new variables are initialized that use the `.replace()` string method to replace the value of `regex` with a template literal string that's the following:
```html
<span class="hl">${cityName}</span>
<span class="hl">${stateName}</span>
 ```
 - Then finally the `.map()` method finally returns the following template literal string:
```html
<li>
    <span class="name">${cityName}, ${stateName}</span>
    <span class="population">${numberWithCommas(place.population)}</span>
</li>
```

### Final declarations

- So with the two functions declared we need two more variables to access the DOM and select any HTML elements with the class `.seach` and `.suggestions`
- Then we need to create two event listeners that listen for when two things happen to any element with the class `.search`:
    - `'change'`
    - `'keyup'`
- The event listeners then pass those values into the callback function `displayMatches`

## List of concepts introduced

There's quite a lot of different things that have been introduced in this challenge. Regular Expressions is covered in Free Code Camp but AJAX requests and responses aren't. Both will still be covered to the best of my ability.

### Regular Expressions

Regular Expressions/ RegExp are patterns used to match character combinations in strings. 

- Javascript also makes regular expressions a global object for convenience
- You construct a regular expression with expression literals or with a constructor function as seen in the following:
```javascript
const regex = new RegExp('string-pattern-here',flags);
```
- A couple of things about the RegExp constructor:
    - The input where you put your string pattern in can be replaced with a variable so as long as it's a string
    - The flags input indicates any extra conditions you want to add to your regex object
        - In the case of this project, we use the flags *g* and *i* so that our regex object searches everything and isn't case sensitive
        

### AJAX fetching and promises

AJAX fetching and promises

AJAX (asynchronous java and xml) [wiki article on it](https://en.wikipedia.org/wiki/Ajax_(programming))

