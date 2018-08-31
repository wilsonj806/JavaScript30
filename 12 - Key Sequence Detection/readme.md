# Notes for Project 12 Key Sequence Detect

## List of new methods
```javascript
Array.prototype.splice()
Array.prototype.join('')
Array.prototype.includes();
```

## Notes

This one's pretty straight forwards so not much needs to be explained.

- The `Array.prototype.splice()` function lets you change the contents of an array by removing and or adding new elements
  - [MDN reference on splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  - The first argument for the splice function tells where in the array to start
    - If it's a positive integer then it starts at the given index and goes front to back
    - If it's a negative integer, then it starts at the end of the array and goes back to front instead to the given index
    - In this case we said `pressed.splice(-secretCode.length-1) so we're starting at the end of the array and checking up to the sixth element from the end
  - The second argument for the splice function tells the function how many array elements that aren't the selected elements to remove
    - In this case it's every other array element past the sixth element from the end of the array