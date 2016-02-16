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