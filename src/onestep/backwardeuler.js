(function(des) {
    'use strict';

    des.onestep.backwardeuler = function() {

        var y0 = [0];
        var xDomain = [0, 1];
        var h = 0.01;
        // Default ODE is y' = 0
        var ode = des.form.linearODE()
            .coefficients([0, 1]);

        function backwardeuler() {
            var solution = [des.util.coordinatePair(xDomain[0], y0)];
            var currentY = y0;
            var iterations = (xDomain[1] - xDomain[0]) / h;

            var odeCoefficients = ode(xDomain[0]);

            var nextY = des.util.arraySum(odeCoefficients.fX.map(function(d) { return d * h; }),
                currentY.map(function(d) { return d * odeCoefficients.yDerivative[1]; }))
                .map(function(d) { return d / (h * odeCoefficients.yDerivative[0] + odeCoefficients.yDerivative[1]); });
            solution.push(des.util.coordinatePair(xDomain[0] + h, nextY));

            for (var i = 1; i < iterations; i++) {
                currentY = nextY;
                odeCoefficients = ode(xDomain[0] + i * h);

                nextY = des.util.arraySum(odeCoefficients.fX.map(function(d) { return d * h; }),
                currentY.map(function(d) { return d * odeCoefficients.yDerivative[1]; }))
                .map(function(d) { return d / (h * odeCoefficients.yDerivative[0] + odeCoefficients.yDerivative[1]); });
                solution.push(des.util.coordinatePair(xDomain[0] + (i + 1) * h, nextY));
            }
            return solution;
        }

        backwardeuler.y0 = function(set) {
            if (!arguments.length) {
                return y0;
            }
            if (Array.isArray(set)) {
                y0 = set;
            } else {
                y0 = [set];
            }
            return backwardeuler;
        };

        backwardeuler.xDomain = function(set) {
            if (!arguments.length) {
                return xDomain;
            }
            xDomain = set;
            return backwardeuler;
        };

        backwardeuler.h = function(set) {
            if (!arguments.length) {
                return h;
            }
            h = set;
            return backwardeuler;
        };

        backwardeuler.ode = function(set) {
            if (!arguments.length) {
                return ode;
            }
            ode = set;
            return backwardeuler;
        };

        return backwardeuler;
    };
})(des);