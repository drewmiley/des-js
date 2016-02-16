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