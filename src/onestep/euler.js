(function(des) {
    'use strict';

    des.onestep.euler = function() {

        function euler() {
        	// do calculation in here
        }

        euler.y0 = function(set) {
            if (!arguments.length) {
                return y0;
            }
            if (Array.isArray(set)) {
            	y0 = set;
        	} else {
        		y0 = [set];
        	}
            return euler;
        };

        euler.yDash0 = function(set) {
            if (!arguments.length) {
                return yDash0;
            }
            if (Array.isArray(set)) {
            	yDash0 = set;
        	} else {
        		yDash0 = [set];
        	}
            return euler;
        };

        euler.xDomain = function(set) {
            if (!arguments.length) {
                return xDomain;
            }
            xDomain = set;
            return euler;
        };

        euler.h = function(set) {
            if (!arguments.length) {
                return h;
            }
            h = set;
            return euler;
        };

        euler.ode = function(set) {
            if (!arguments.length) {
                return ode;
            }
            ode = set;
            return euler;
        };

        return euler;
    };
})(des);