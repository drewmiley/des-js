(function(d3, des) {
    'use strict';

    des.form.ode = function() {

        // Set initial ODE to y = 0;
        var linear = true;
        var coefficients = [1];
        var inhomogeneity = d3.functor(0);

        function ode(x, yValues, n) {
            if (linear) {
                var fX = inhomogeneity.map(function(d) { return d(x); });
                var arraySum = fX;
                for (var i = 0; i < yValues.length; i++) {
                    if (i !== n) {
                        arraySum = des.util.arraySum(arraySum,
                            yValues[i].map(function(d) { return d * coefficients[i]; }));
                    }
                }
                return arraySum.map(function(d) { return -d / coefficients[n]; });
            } else {
                // Might be a while;
                return [1];
            }
        }

        ode.linear = function(set) {
            if (!arguments.length) {
                return linear;
            }
            linear = set;
            return ode;
        };

        ode.coefficients = function(set) {
            if (!arguments.length) {
                return coefficients;
            }
            if (Array.isArray(set)) {
                coefficients = set;
            } else {
                coefficients = [set];
            }
            return ode;
        };

        ode.inhomogeneity = function(set) {
            if (!arguments.length) {
                return ode;
            }
            if (Array.isArray(set)) {
                inhomogeneity = [];
                for (var i = 0; i < set.length; i++) {
                    inhomogeneity.push(d3.functor(set[i]));
                }
            } else {
                inhomogeneity = [d3.functor(set)];
            }
            return ode;
        };

        return ode;
    };
})(d3, des);