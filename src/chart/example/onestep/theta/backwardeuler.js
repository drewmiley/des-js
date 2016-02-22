(function(d3, fc, des) {
    'use strict';

    des.chart.example.onestep.theta.backwardeuler = function(backwardeulerSolution) {
        var backwardEulerSolutionChart = des.chart.base()
            .chartLabel('Onestep Backward Euler solution')
            .xDomain(fc.util.extent().fields('x')(backwardeulerSolution))
            .yDomain(fc.util.extent().fields('y')(backwardeulerSolution));
        return backwardEulerSolutionChart;
    };
})(d3, fc, des);