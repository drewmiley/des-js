(function(d3, fc, des) {
    'use strict';

    des.chart.example.onestep.theta.midpoint = function(midpointSolution) {
        var midpointSolutionChart = des.chart.base()
            .chartLabel('Onestep Midpoint solution')
            .xDomain(fc.util.extent().fields('x')(midpointSolution))
            .yDomain(fc.util.extent().fields('y')(midpointSolution));
        return midpointSolutionChart;
    };
})(d3, fc, des);