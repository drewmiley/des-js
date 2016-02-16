# des-js

des-js is a javascript library containing differential equation solvers; it follows the component pattern. 

## Examples / Solvers

### To run

To run an example, simply open the relevant html file in your browser. If there are any problems with this, run **grunt** in the relevant directory in a command window to build the latest version of the source files. 

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

#### *theta*

Theta methods are a family of onestep methods with a variable parameter.

*.parameter*

Get/set the parameter for the onestep scheme. There are 3 special values; 0 gives the [Backward Euler](https://en.wikipedia.org/wiki/Backward_Euler_method) scheme, 1 gives the [Euler](https://en.wikipedia.org/wiki/Euler_method) scheme, and 0.5 gives the [Midpoint](https://en.wikipedia.org/wiki/Midpoint_method) scheme. It is initially set to 0.5

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