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