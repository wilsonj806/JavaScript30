# Notes for Project 02 - JS Clock

## List of JS methods/ functions/ global objects used

- `.getSeconds()`
- `.getMinutes()`
- `.getHours()`
- `.style`
- `.transform`
- `setInterval()`
- `Date()`
- `document`

## List of new CSS properties

- `transform-origin`
- `transition`

## Logic/ architecture

We first initialize 3 variables that represent the following

- The element that has a class of `.second-hand`
- The element that has a class of `.min-hand`
- The element that has a class of `.hour-hand`

This is done by using `document.querySelector('.class_name_here')`

The `setDate()` function is then initialized which contains the following:

- `const now` is initialized and it is defined as the global object `Date()`
- The hours, minutes, and seconds are initialized as variables and then access `now` via the `.getUnitsOfTime` methods to obtain the current hour, minutes, and seconds
- Then seconds, minutes, and hours are converted to degrees to correspond with the hands on a clock
    - Note that because the hour hand makes two rotations around the clock per day, the formula becomes `(2*h)/24` where `h=24`
- Finally a rotate transform is added
    - It's first done by chaining the `.style` property, and the `.transform` property with the respective hands
        - So you have `HTMLElement`accessing `.style` and within that the `.transform`
    - Once we have `exampleHand.style.transform` we set it to `roatate(Xdeg)` where `X` is `${exampleDegrees}`

The last thing to run is the `setInterval()` function

- Syntax-wise it's `setInterval(funcToRun, duration_in_milliseconds)`
- Here it's `setInterval(setDate, 1000)`
