(function(d3, fc, des) {
    'use strict';

    des.chart.example.onestep.theta.euler = function(eulerSolution) {
        var eulerSolutionChart = des.chart.base()
            .chartLabel('Onestep Euler solution')
            .xDomain(fc.util.extent().fields('x')(eulerSolution))
            .yDomain(fc.util.extent().fields('y')(eulerSolution));
        return eulerSolutionChart;
    };
})(d3, fc, des);