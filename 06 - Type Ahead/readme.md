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
    - First the user input `wordToMatch` is what the filter uses as the rule to check entries in the cities array against
        - i.e if `wordToMatch = 'wes'` then RegExp uses that string as the reference and then `place.city.match(regex)` returns whatever entry has `'wes'` in it 
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

Note that this section is not meant to be an exhaustive referenceon the two concepts. There's too much content to do so and this is only really so that I can have some beginning reference to go to.

### Regular Expressions [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

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
        
#### Special Character Overview

- There's also a vast array of special characters that regex uses in order to construct a regex pattern?
    - First a regex literal looks like this:
```javascript
var expressionLiteral = /ab*c/
```
- Note that it starts and ends with /.../
- In this case `/ab*c/` matches any character combination where a single `a` is followed by zero or more `b` characters and then is immediately followed by `c`
    - The `*` means 0 or more characters of the following character
    - So if we pass in the string `cbbabbbbcdebc`, the regex object will return `abbbbc` 
    - Also just like the RegExp object, we can apply flags to expression literals like so:
    ```javascript
    regex = /al*o/gi;
    ```
- 
#### RegExp methods    
    
- With that, there's several different RegExp methods and string methods that we can use to process our strings

Method syntax | Function
--------------|---------
`regex.exec()` | Executes a search and match in a string. Returns either an array of information or `null`
`regex.test()` | Tests for a match in a string. Returns `true` or `false`
`String.prototype.match(regex)` | Executes a search for a match in a string. It returns an array of information or null on a mismatch.
`String.prototype.search()` | Tests for a match in a string. It returns the index of the match, or -1 if the search fails
`String.prototype.replace(string , replacementString)` | Executes a search for a match in a string, and replaces the matched substring with a replacement substring.
`String.prototype.split()` | A String method that uses a regular expression or a fixed string to break a string into an array of substrings.

#### Examples

- Here's a couple of examples:
    - First lets initialize a regex object with both methods
```javascript
let rule = 'allo';
const regex1 = new RegExp(rule, 'gi');
const regex2 = /al*o/gi;
```
- Now let's do some fun things by declaring some strings:
```javascript
let string1 = "hallo mate";
let string2 = "wallow hallo";
let string3 = "Hey this dog is really cute and fluffy!";
```
- Now let's use regex and string methods to process them
```javascript
//console.table(regex1.exec(string1)); //This doesn't work right now
let result2 = string2.match(regex2);
let result3 = string3.replace(/dog/,'cat');
result2;
result3;
```
- The results can be found in the `sample-regex.json` file

### AJAX fetching, promises, and JSON

#### Some references:

1. [w3 Schools](https://www.w3schools.com/js/js_ajax_intro.asp)
2. [MDN AJAX Getting Started Reference](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
3. [Wikipedia Article](https://en.wikipedia.org/wiki/Ajax_(programming))
4. [MDN Fetch API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
5. [MDN Using Promises Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
6. [MDN Blob Reference](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
7. [MDN JSON Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

#### Intro to AJAX

So first, what is AJAX? AJAX stands for Asynchronous Java And XML and it is not a programming language but a method of requesting and retrieving data. The usual way to do it is to make a request for data and then wait as it gets downloaded to the client, but with AJAX you make a request for data, then perform other operations while the data loads in. 

Normally you'd use the XMLHttpRequest object to do it, but the new `Fetch API` was introduced as part of the Javascript [living standard](https://whatwg.org/faq#living-standard) which is more powerful/ flexible.

#### Notes on AJAX the Fetch method and Promises

Fetch gives a generic definition for `Request` and `Response` ojbects (along with whatever else is involved in network requests)
    - This sort of barebones/ catch-all definition means that you can use Request and Response relatively freely to build more complex backend data access tools
- Making a Fetch request is pretty straight-forwards, you just use the `GlobalFetch.fetch()` method
    - it's also implemented in multiple interfaces (or global objects?) such as `window` or `WorkerGlobalScope`
    - So syntax for the fetch method is as follows:
    ```javascript
    const jsonLink = 'www.exmapleURL.com/hello.json'
    fetch(jsonLink)
    ```
- Once a fetch method is called, a `Promise` is returned, which eventually gets resolved as a `Response` whether or not the request is fulfilled or not

Now, a `promise` is an object representing the eventual completion or failure of an asynchronous request (`fetch()` for example)
- A promise is pretty much a returned object which you attack callback functions to for when a request is completed
    - It makes the end function significantly readable as you just have a `.then()` method with the callback functions rather than passing the callback functions directly inside the function itself
    - Consider a function, `createAudioFileAsync()` that asynchronously generates a sound file given a certain configuration
        - In addition 2 more callback functions are introduced, one for a failure state and one for a success state
- Here's the function written normally:
```javascript
    function successCallback(result) {
      console.log("Audio file ready at URL: " + result);
    }
    function failureCallback(error) {
      console.log("Error generating audio file: " + error);
    }
    createAudioFileAsync(audioSettings, successCallback, failureCallback);

```
- Here's the function written with promises in mind:
```javascript
    createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```
- Which expanded looks like:
```javascript
    const promise = createAudioFileAsync(audioSettings); 
    promise.then(successCallback, failureCallback);
```
- Using promises has a couple of advantages and they are as follows
    - First, callbacks will never be called before the completion of current run of the Event Loop
    - Callbacks added with `.then()` even *after* the success or failure of the asynchronous operation, will be called after the current Event Loop finishes 
    - Multiple callbacks can be chained togather by using successive `.then()` calls
- In addition Promises lets you do more things:
    - Promises have a dedicated method for failure states called `.catch()`
        - More info at the [MDN Reference for .catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
    - you can easily chain them together
- And below is a general workflow for how the Fetch API works
![Image of Fetch API flow](https://mdn.mozillademos.org/files/15911/promises.png)

#### Notes on the .blob() method, JSON, and related

So first these are methods for processing our data now that we've actually recieved it. A lot of these methods are also going to be part of the Body mixin for the Fetch API as well. Also note that it is **highly** recommended that you complete the example in *Reference 7* at the beginning of this section if you do not know what JSON is, or if you only know how to use the Fetch API to perform AJAX operations.  

What is the Body mixin in the first place? 
    - The Body mixin of the Fetch API represents the body of the response/request, allowing you to declare what its content type is and how it should be handled.
    - It's also a collection of various methods that are used to process the retrieved data

- In our case, we're trying to parse our requested data as a JSON file so we'll need to use the `Body.json()` method to parse our JSON file (represented by the variable `endpoint`)
```javascript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
fetch(endpoint)
.then(
    function importer (blob) {
    return blob.json();
})
```
- The fetch method actually doesn't know what kind of data is being recieved, it's just fetching it
    - To the browser, it's just a whole bunch of raw data that could be anything from a picture to the JSON data that we actually want
    - You can see this if you tell the above javascript to only return the raw data, `blob` at the end of the promise
        - It's got a ton of empty property fields because it hasn't tried reading the raw data yet
- So we follow up on our fetch with the `Promise.prototype.then()`
    - When our promise is fullfilled, the `.then()` function takes the raw data that we just recieved from our fetch request and parses it as a JSON object file
    - You can see this as the end result of putting the above code into the browser console
    - It is **highly** recommended to plug this piece of code in with the `.json()` method attached and without it to understand the concept of Fetch and Promise better


