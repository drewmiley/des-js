(function() {
    'use strict';

    // Crazyness to get a strict mode compliant reference to the global object
    var global = null;
    /* jshint ignore:start */
    global = (1, eval)('this');
    /* jshint ignore:end */

    global.des = {
        chart: {
            example: {
                onestep: {
                    theta: {}
                }
            }
        },
        form: {},
        onestep: {},
        util: {}
    };
})();
(function(d3, fc, des) {
    'use strict';

    des.chart.base = function() {
        var basicChart = fc.chart.cartesian(d3.scale.linear(), d3.scale.linear())
            .yLabel('y')
            .yNice()
            .yOrient('left')
            .xLabel('x')
            .xBaseline(0)
            .xNice()
            .margin({left: 50,
                top: 30,
                right: 20,
                bottom: 30});
        return basicChart;
    };
})(d3, fc, des);
(function(d3, fc, des) {
    'use strict';

    des.chart.example.onestep.theta.backwardeuler = function(backwardeulerSolution) {
        var backwardEulerSolutionChart = des.chart.base()
            .chartLabel('Onestep Backward Euler solution')
            .xDomain(fc.util.extent().fields('x')(backwardeulerSolution))
            .yDomain(fc.util.extent().fields('y')(backwardeulerSolution));
        return backwardEulerSolutionChart;
    };
})(d3, fc, des);
(function(d3, fc, des) {
    'use strict';

    des.chart.example.onestep.theta.euler = function(eulerSolution) {
        var eulerSolutionChart = des.chart.base()
            .chartLabel('Onestep Euler solution')
            .xDomain(fc.util.extent().fields('x')(eulerSolution))
            .yDomain(fc.util.extent().fields('y')(eulerSolution));
        return eulerSolutionChart;
    };
})(d3, fc, des);
(function(d3, fc, des) {
    'use strict';

    des.chart.example.onestep.theta.midpoint = function(midpointSolution) {
        var midpointSolutionChart = des.chart.base()
            .chartLabel('Onestep Midpoint solution')
            .xDomain(fc.util.extent().fields('x')(midpointSolution))
            .yDomain(fc.util.extent().fields('y')(midpointSolution));
        return midpointSolutionChart;
    };
})(d3, fc, des);
(function(d3, fc, des) {
    'use strict';

    des.chart.multi = function() {
        // create a pair of series and some gridlines
        var line = fc.series.line()
          .xValue(function(d) { return d.x; })
          .yValue(function(d) { return d.y; });

        var gridlines = fc.annotation.gridline();

        // combine using a multi-series
        var multi = fc.series.multi()
          .series([gridlines, line]);
        return multi;
    };
})(d3, fc, des);
(function(des) {
    'use strict';

    des.util.arraySum = function(arrayOne, arrayTwo) {
        var arraySum = [];
        var arrayLength = Math.min(arrayOne.length, arrayTwo.length);
        for (var i = 0; i < arrayLength; i++) {
            arraySum[i] = arrayOne[i] + arrayTwo[i];
        }
        return arraySum;
    };
})(des);
(function(des) {
    'use strict';

    des.util.coordinatePair = function(x, y) {
        return {
            x: x,
            y: y
        };
    };
})(des);
(function(d3, des) {
    'use strict';

    des.form.linearODE = function() {

        // Set initial ODE to y = 0;
        var coefficients = [1];
        var inhomogeneity = d3.functor(0);

        function linearODE(x) {
            var fX = inhomogeneity.map(function(d) { return d(x); });
            var yDerivative = [];
            for (var i = 0; i < coefficients.length; i++) {
                yDerivative.push(coefficients[i](x));
            }
            return {
                fX: fX,
                yDerivative: yDerivative
            };
        }

        linearODE.coefficients = function(set) {
            if (!arguments.length) {
                return coefficients;
            }
            if (Array.isArray(set)) {
                coefficients = [];
                for (var i = 0; i < set.length; i++) {
                    coefficients.push(d3.functor(set[i]));
                }
            } else {
                coefficients = [d3.functor(set)];
            }
            return linearODE;
        };

        linearODE.inhomogeneity = function(set) {
            if (!arguments.length) {
                return inhomogeneity;
            }
            if (Array.isArray(set)) {
                inhomogeneity = [];
                for (var i = 0; i < set.length; i++) {
                    inhomogeneity.push(d3.functor(set[i]));
                }
            } else {
                inhomogeneity = [d3.functor(set)];
            }
            return linearODE;
        };

        return linearODE;
    };
})(d3, des);
(function(des) {
    'use strict';

    des.onestep.theta = function() {

        var parameter = 0.5;

        var y0 = [0];
        var xDomain = [0, 1];
        var h = 0.01;
        // Default ODE is y' = 0
        var ode = des.form.linearODE()
            .coefficients([0, 1]);

        var calculateNextY = function(currentY, currentODECoefficients, nextODECoefficients) {
            var nextYMultiplier = currentODECoefficients.yDerivative[1] * nextODECoefficients.yDerivative[1] +
                h * (1 - parameter) * currentODECoefficients.yDerivative[1] * nextODECoefficients.yDerivative[0];
            var currentYMultiplier = currentODECoefficients.yDerivative[1] * nextODECoefficients.yDerivative[1] -
                h * parameter * currentODECoefficients.yDerivative[0] * nextODECoefficients.yDerivative[1];
            var constant = des.util.arraySum(currentODECoefficients.fX.map(function(d) {
                    return h * parameter * nextODECoefficients.yDerivative[1] * d;
                }),
                nextODECoefficients.fX.map(function(d) {
                    return h * (1 - parameter) * currentODECoefficients.yDerivative[1] * d;
                }));
            return des.util.arraySum(constant, currentY.map(function(d) { return currentYMultiplier * d; }))
                .map(function(d) { return d / nextYMultiplier; });
        };

        function theta() {
            var solution = [des.util.coordinatePair(xDomain[0], y0)];
            var currentY = y0;
            var iterations = (xDomain[1] - xDomain[0]) / h;

            var currentODECoefficients = ode(xDomain[0]);
            var nextODECoefficients = ode(xDomain[0] + h);

            var nextY = calculateNextY(currentY, currentODECoefficients, nextODECoefficients);
            solution.push(des.util.coordinatePair(xDomain[0] + h, nextY));

            for (var i = 1; i < iterations; i++) {
                currentY = nextY;
                currentODECoefficients = ode(xDomain[0] + i * h);
                nextODECoefficients = ode(xDomain[0] + (i + 1) * h);

                nextY = calculateNextY(currentY, currentODECoefficients, nextODECoefficients);
                solution.push(des.util.coordinatePair(xDomain[0] + (i + 1) * h, nextY));
            }
            return solution;
        }

        theta.parameter = function(set) {
            if (!arguments.length) {
                return parameter;
            }
            parameter = set;
            return theta;
        };

        theta.y0 = function(set) {
            if (!arguments.length) {
                return y0;
            }
            if (Array.isArray(set)) {
                y0 = set;
            } else {
                y0 = [set];
            }
            return theta;
        };

        theta.xDomain = function(set) {
            if (!arguments.length) {
                return xDomain;
            }
            xDomain = set;
            return theta;
        };

        theta.h = function(set) {
            if (!arguments.length) {
                return h;
            }
            h = set;
            return theta;
        };

        theta.ode = function(set) {
            if (!arguments.length) {
                return ode;
            }
            ode = set;
            return theta;
        };

        return theta;
    };
})(des);