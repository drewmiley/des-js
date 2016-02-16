# des-js

des-js is a javascript library containing differential equation solvers; it follows the component pattern. 

## Examples

### To run

To run an example, simply open the relevant **index.html** file in your browser. If there are any problems with this, run **grunt** in the relevant directory in a command window to build the latest version of the source files. 

## API

### chart

#### *base*

Basic implementation of d3fc's cartesian chart component for use in examples

#### *multi*

Basic implementation of d3fc's multi component for use in examples

### util

#### *arraySum*

*function(arrayOne, arrayTwo)*

Returns the array of the pair-wise sum of the elements in the two arrays.

#### *coordinatePair*

*function(x, y)*

Returns an object wrapper around *x* and *y* for ease of plotting the data.

### form

Set the form of the differential equation to be solved.

#### *linearODE*

*.coefficients*

Get/set the coefficients that multiply derivatives in the ODE, starting with the multiplier for the 0th derivative.

*.inhomogenuity*

Get/set the *f(x)* inhomogenous part of the ODE.

*function(x)*

Returns the evaulated value of the inhomogenuity and coefficients at the given *x*.

### onestep

Onestep methods are used to solve first-order linear ODEs.

#### *euler*

An implementation of the onestep [Euler](https://en.wikipedia.org/wiki/Euler_method) method is currently in progress.

#### *backwardeuler*

An implementation of the onestep [Backward Euler](https://en.wikipedia.org/wiki/Backward_Euler_method) method is currently in progress.

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