# Notes from Project 03 - CSS and JS Variables

## List of methods/ functions/ etc shown

- `.dataset`
- `.sizing`
- `.style`
- `.setProperty`
- `.value`

## List of extra concepts introduced/ learned

- using CSS selectors to get specific elements
- using JS to dynamically change CSS variable values
- Data attributes as user set, custom properties for HTML elements

## Logic/ architecture

First we need to initialize the `const inputs` variable

- it accesses the document's DOM and grabs any element that matches the class `.controls` and `input` element selector. Typed out in code it looks like:
     ```javascript
     const inputs = document.querySelectorAll('.controls input')
     ```

Then we initialize a function `function handleUpdates()` that determines what to do when an input field is updated

- Within the function, the variable `const suffix` is initialized to read the custom data attribute `data-sizing` and store that value **OR** leave empty if there's no value for `data-sizing`
- Then we change the CSS property connected to the input that just recieved user input
    - Looks like this: 
        ```javascript document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)```
    - So we're accessing the document object, then accessing the root element of the document (here it's the HTML element), then accessing the style sheet, then finally setting the value of the CSS variable based on the element `<input name="example name">` and adding the suffix at the end so that the CSS knows what units it's working with

Finally we add event listeners that look for either a change in every input's value or mouse movements on the inputs

- Looks like the following:

    ```javascript
        inputs.forEach(input => input.addEventListener('change', handleUpdate));
        inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
    ```
    
## Notes

- Custom data attributes can be added to your HTML elements but need to be preceded by the `data` suffix
    - example:
    ```html
    <div data-name="Hello" data-time="noon"></div>
    ```
    - This can then be accessed in JS via the ```javascript .dataset``` property which reads the custom data attributes of an element
    - So if we wrote some JS real fast (see test.html) to log the data attributes of the above it'd return:
    ```
    DOMStringMap
    name: "Hello"
    time: "noon"
    __proto__: DOMStringMap
    ```
- You can use CSS selectors to target specific HTML elements (already kind of did this in the portfolio project)
    - So given the following elements:
    ```html
    <div class="sampleClass" name="sampleName1"></div>
    <div class="sampleClass" name="sampleName2"></div>
    <div class="otherClass"></div>
    ```   
    - you can target them like so:
    ```css
    div{/* CSS targets every div element */}
    div .otherClass{/* CSS only targets the div element with class of .otherClass */}
    div[name="sampleName2"]{/* CSS only targets div eleemnt with name attribute value of "sampleName2" */}
    ```
