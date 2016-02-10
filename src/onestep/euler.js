(function(des) {
    'use strict';

    des.onestep.euler = function() {

        function euler() {

        }

        euler.y0 = function(set) {
            if (!arguments.length) {
                return y0;
            }
            y0 = set;
            return euler;
        };

        euler.yDash0 = function(set) {
            if (!arguments.length) {
                return yDash0;
            }
            yDash0 = set;
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

        euler.diffEq = function(set) {
            if (!arguments.length) {
                return diffEq;
            }
            diffEq = set;
            return euler;
        };

        return euler;
    };
})(des);