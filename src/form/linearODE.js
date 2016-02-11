(function(d3, des) {
    'use strict';

    des.form.linearODE = function() {

        // Set initial ODE to y = 0;
        var coefficients = [1];
        var inhomogeneity = d3.functor(0);

        function linearODE(x, yValues, n) {
            var fX = inhomogeneity.map(function(d) { return d(x); });
            var arraySum = fX;
            for (var i = 0; i < yValues.length; i++) {
                if (i !== n) {
                    arraySum = des.util.arraySum(arraySum,
                        yValues[i].map(function(d) { return d * coefficients[i](x); }));
                }
            }
            return arraySum.map(function(d) { return -d / coefficients[n](x); });
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
                return linearODE;
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