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