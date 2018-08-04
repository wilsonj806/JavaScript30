# Notes on Project 03 Array Cardio Part 1

## List of Methods and Functions used
```javascript
    Array.prototype.filter()
    Array.prototype.map()
    Array.prototype.sort()
    Array.prototype.reduce()
    String.prototype.split()
    console.table();
```
## Notes on every Array method used (should also write this all down)

### Array.prototype.filter()

- TL;DR the filter method accepts a function where you put the filtering parameters in and compare it to the input array.
    - Once that is done, the end result is passed as values in a new array
- For `Array.prototype.filter()` filtering out values, syntax is as follows:
    ```javascript
    const Array = [1,2,3,4,5];
    const filter_requirements = 3;
    const newArray = Array.prototype.filter(
        function (ArrayVal){
            return ArrayVal >= filter_requirements;
    });
    console.table(newArray);
    ``` 
- In **Exercise 1** of the Array Cardio challenge, the following is the expanded version of that code:

    ```javascript
    const bornYears = inventors.filter(

        function yearFilter(invent){
            return invent.year >= 1500 && invent.year <1600;
        }
    );
    console.table(bornYears);
    ```

    
- Reference the MDN page on [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
    - Note that you can do quite a lot more with it


### Array.prototype.map()

- TL;DR the map method creates a new array populated with the results of a function that performs an operation on the input array's element 
- For `Array.prototype.map()` syntax is as follows and using the array from the `Array.prototype.filter()` example:
    ```javascript
    const derivedArray = Array.prototype.map(
    
        function (ArrayVal){
            return ArrayVal * 2;
    });
    console.table(derivedArray);
    ```
- This would return an Array whose elements are 2 times the value of the elements in `const Array`
- In the **Exercise** 2 of the Array Cardio challenge where you string together the first and last names, the solution looks like this expanded:
    ```javascript
    const fullName = inventors.map(
        function stringConcatenate(invent){
            `${inventor.first} ${inventor.last}`;
    });
    console.log(fullName);
    ```
- Note that the above solution uses template literal strings to construct the full name

- Reference the MDN page on [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 

### Array.prototype.sort()

- TL;DR the sort method sorts the elements of a given array/ object based on the user's sorting criteria and passes that into a new array/ object
- For `Array.prototype.sort()` syntax is as follows for both array and object:
    ```javascript
    const newArray = [6,3,2,4,5,1];
    const newObj = [
        {name:'Chocolate Chip Cookie', flavor:'Chocolate Chip', quantity:1},
        {name:'Oatmeal Raisin Cookie', flavor:'Oatmeal Raisin', quantity:3},
        {name:'Sugar Cookie', flavor:'Sugar', quantity:4},
        {name:'Raspberry and Almond Shortbread', flavor:'Raspberry Jam and Almond', quantity:8}
    ];

    const sortedArr = newArray.sort();
    console.log(sortedArr);

    const sortedObj = newObj.sort(
        function(quant1,quant2){
            if (quant1.quantity > quant2.quantity){
                return 1;
            }
            else{
                return -1;
            }
    });
    console.table(sortedObj);
    ```
- Note that for sorting an object we used the super long hand version of conditional statements
    - We can use ternary operators to write it out shorter so it'd look like this instead:
    ```javascript
    quant1.quantity> quant2.quantity ? 1:-1;
    ```
    - Where the `?` represents the ternary operator

- Reference the MDN page on [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### Array.prototype.reduce()

- TL;DR the reduce method takes the elements of an array and then applies a function to it to reduce it to a single value. The return value is then stored in an accumulator.
- For `Array.prototype.reduce()` syntax is as follows for an array being reduced without an initial value and with one:
    ```javascript
    const array2 = [1,2,3,4,5];
    const reduced = array2.reduce(
        function (accumulator, currentVal){
            console.log(accumulator);
            return accumulator + currentVal;
    });
    console.log(reduced); // Should return 15
    const reducedInit = array2.reduce(
        function (accumulator,currentVal){
            return accumulator + currentVal;
    },5);
    console.log(reducedInit); // Should return 20
    ```
- So, at the very start, array2.reduce() does the following if there's not initial value provided:
    ```matlab
    accumulator = array2[i = 0] = 1
    currentVal = array2[i + 1] = 2
    ```
- Then when it finishes the specified operation it stores the finished operation in the accumulator and then currentVal is advanced like so:
    ```matlab
    accumulator = previous total
    currentVal = array2[i=1+1]
    ```
- If you need to see that in action then check the above example code, `accumulator` is printed in the console every time it goes to the next index

- Syntax for using `Array.prototype.reduce()` to count instances in an object/ array are a bit different
- We'll use **Exercise 8** as the example below since it's pretty sensible
    ```javascript
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];
    const transportation = data.reduce(
        function (obj,item){
            if (!obj[item]){
            obj[item] = 0;
            } 
            obj[item]++;
            console.log(`${obj[item]} ${item}`);
            return obj;
    },{});
    console.log(transportation);
    ```
- Some notes as follows:
    - Because we want the output to be an object, we need to intialize the object, which is done as follows:
    ```javascript
    const transportation = data.reduce(function(){function_here;},{});
    ```
    - Note that the empty wavy brackets is how we initialize our object
        - And if you intialized an object in the dev tool console it'd spit this out
        ```
        __prot__:
            constructor: f Object();
            etc
        ```
    - Also, we can't just suddenly start counting up, which is the following conditional statement:
    ```javascript
    if (!obj[item]){
    obj[item]=0;
    }
    ```
    - So this checks if the property `item` doesn't exist in the object `obj` and if that is true, then it initializes it by setting it equal to zero
    - If `obj[item]` does exist then it increments it up and the reduce function sweeps through the array's elements to count the number of instances.
    
- Reference the MDN page on [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) for additional uses of it





