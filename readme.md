# des-js

des-js is a javascript library containing differential equation solvers; it follows the component pattern. 

## Examples

An example comparing solutions of the exponential equation using onestep methods is currently in progress.

## API

### util

#### *arraySum*

*function(arrayOne, arrayTwo)*

Returns the array of the pair-wise sum of the elements in the two arrays.

#### *coordinatePair*

*function(x, y)*

Returns an object wrapper around *x* and *y* for ease of plotting the data.

### form

Set the form of the differential equation to be solved.

##### *linearODE*

*.coefficients*

Get/set the coefficients that multiply derivatives in the ODE, starting with the multiplier for the 0th derivative.

*.inhomogenuity*

Get/set the *f(x)* inhomogenous part of the ODE.

*function(x, yValues, n)*

Returns the value of the *n*th derivative given the value of *x* and *y* (including derivatives) at that point.

### onestep

Onestep methods are used to solve first-order linear ODEs.

#### *euler*

An implementation of the onestep [Euler](https://en.wikipedia.org/wiki/Euler_method) method is currently in progress.

*.y0*

Get/set the value of *y* at start of *xDomain*.

*.xDomain*

Get/set the start and end values of *x* to solve in the range.

*.h*

Get/set the step-size of the solver.

*.ode*

Get/set the first-order linear ODE to solve.

*function()*

Returns the calculated solution as an array of *coordinatePair* objects