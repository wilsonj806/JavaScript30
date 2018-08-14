# Notes on Project 09 Dev Tools Domination

## List of methods
```javascript
console.log();
console.log('Hello I am a %s string!', '+:)');
console.log('%c I am some great text','font-size:24px;background-color:pink;');
console.warn('stuff is wrong but not necessarily broken');
console.error('stuff is broken');
console.info('here is info');
console.assert(1==2,'input is false');
console.clear();
console.dir(document.querySelector('.domElement'));
console.group();
console.groupCollapsed();
console.groupEnd();
console.count();
console.time('fetch time');
console.timeEnd('fetch time');
console.table();
```

## Notes

Most of this is pretty self explanatory but there are some details that shouldn't be neglected

### Console.log() and Console.dir()

- [MDN reference on console.log()](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
- [MDN reference on console.dir()](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)


When you log an object, use the following code:
```javascript
console.log(JSON.parse(JSON.stringify(obj)));
```
- This lets you see the value of obj at the moment that you're printing it

A couple of practical differences when you use `console.log()` and `console.dir()` on a DOM element
    - `console.log()` prints the element in an HTML like tree
    - `console.dir()` prints the element in a JSON like tree
    - This difference is handy if you want to see how JS interprets the DOM and traverses it

### Console.group()

- [MDN reference on console.group()](https://developer.mozilla.org/en-US/docs/Web/API/Console/group)

Console group does what it sounds like it does, it lets you group console messages together like the following example:
```javascript
console.group('I am starting a group');
    console.log('I am in this group');
    console.log('I am also in this group');
    console.log('Hey look I am in the group too');
console.groupEnd();
console.log('I am not in a group :(');
```
And the output looks like this:
![Sample output](https://github.com/wilsonj806/JavaScript30/blob/master/09%20-%20Dev%20Tools%20Domination/sample-output.PNG?raw=true)

### Other notes

- `console.count()` will be handy for counting loops and array accesses and such
- `console.assert()` is nice for checking if your program's logic processing is working correctly

