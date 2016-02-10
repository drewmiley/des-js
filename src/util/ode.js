(function(d3, des) {
    'use strict';

    des.util.ode = function() {

    	// Set initial ODE to y = 0;
    	var linear = true;
    	var coefficients = [1];
    	var inhomogeneity = d3.functor(0);

        function ode(x, yValues) {
        	if (yValues.length = 1) {
        		if (linear) {
        			return [1];
        		} else {
        			// Not implemented at the moment
        			return [1];
        		}
        	} else {
        		// Not implemented at the moment
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
                return h;
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
            inhomogeneity = d3.functor(set);
            return ode;
        };

        return ode;
    };
})(d3, des);