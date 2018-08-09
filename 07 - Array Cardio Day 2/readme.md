# Notes on Project 07 Array Cardio Part 02

## List of new methods used
```javascript
Array.prototype.some()
Array.prototype.every()
Array.prototype.find()
Array.prototype.findIndex()
Array.prototype.slice()
Array.prototype.splice()
```

## Notes on the methods used

- Array.prototype.some() checks if at least one element in the target array matches the selection criteria
    - Here's the [MDN reference on .some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
    - Below is the first exercise from the project but expanded:
```javascript
    const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
    ];

    const oneAdult = people.some(
    function matcher(person){
        const currentYear = (new Date()).getFullYear();
        if (currentYear - person.year >= 19){
            return true;
        }
    });
    console.log({oneAdult});
```
- Array.prototype.every() on the other hand checks if *every* element in an array matches the selection criteria
    - Here's the [MDN reference on .every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
    - So here's the expanded version from the project, it's pretty much got the same internals as the people.some() example
```javascript
    const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
    ];

    const everyAdult = people.every(
    function matcher(person){
        const currentYear = (new Date()).getFullYear();
        if (currentYear - person.year >= 19){
            return true;
        }
    });
    console.log({everyAdult});
```
- Note that `Array.prototype.some()` and `Array.prototype.every()` returns a boolean

- Array.prototype.find() is a bit like Array.prototype.filter() but it just returns the element that you were searching for
    - Here's the [MDN reference on .find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
    - Below is the expanded version of the .find() exercise from the project
```javascript
    const comments = [
      { text: 'Love this!', id: 523423 },
      { text: 'Super good', id: 823423 },
      { text: 'You are the best', id: 2039842 },
      { text: 'Ramen is my fav food ever', id: 123523 },
      { text: 'Nice Nice Nice!', id: 542328 }
    ];
    
    const findID = comments.find(
        function lookUp(search){
            return search.id === 823423;
    });
    console.log(findID);
```
- Note that the output from the console for `console.log(findID)`is the following:
```json
{text: "Super good", id: 823423}
    id:823423
    text:"Super good"
    __proto__:Object
```
- Also note that in the exercise, we use an implicit `return` as the function was a single line (i.e no curly brackets)

- Array.prototype.findIndex() on the other hand returns the index of the element that matches the selection criteria
    - Here's the [MDN reference on .findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
    - Here's the [MDN reference on .slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
    - Below is the expanded version of the .findIndex() exercise from the project using the `const comments` array
```javascript
    const findIndex = comments.findIndex(
        function lookUp(search){
            return search.id === 823423;
    });
    console.log(findIndex);
    // comments.splice(findIndex,1); this is one way to do it, but some people prefer making a copy of the array without the desired index value. We're doing the latter
    const newComments =[
        ...comments.slice(0,findIndex),
        ...comments.slice(findIndex+1)
    ];
    console.table(comments);
    
    console.table(newComments);
```
- Note that `.findIndex()` only returns the index of the desired element (in this case it's index = 1)
- Also note the use of `.slice()` to add values from specific indexes of `comments`
    - The slice method works by returning a shallow copy of the parent array into a new array object from the start of the array (index = 0) to an end index if specified
    - The syntax for that is as follows:
```javascript
    Array.prototype.slice(startIndex, endIndex)
```
- First note that if there's no value for `endIndex` specified then slice will just continue until the last element of the array is copied
- In the case of our `newComments` array, we first slice in the values of the `comments` array from the zeroth index to the `findIndex`-th index
    - Then we continue slicing in the rest of `comments` in after the `findIndex`-th's value
    - **Also note, we needed to spread the values of the** `comments` **array otherwise we'd get 2 nested arrays**
