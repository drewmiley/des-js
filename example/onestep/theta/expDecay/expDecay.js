(function(d3, fc, des) {
    'use strict';

    var h = 0.01;
    var xDomain = [0, 10];
    var y0 = 1;

    var basicChart = des.chart.base();
    var multi = des.chart.multi();

    var expDecayODE = des.form.linearODE()
        .coefficients([1, 1])
        .inhomogeneity(0);

    function calculateClosedFormData() {
        var xRange = xDomain[1] - xDomain[0];
        var closedFormData = d3.range(1 + xRange / h).map(function(d) {
            return {
                x: xDomain[0] + h * d,
                y: Math.exp(-(xDomain[0] + h * d))
            };
        });
        return closedFormData;
    };

    function calculateOnestepEulerSolution() {
        var onestepEulerSolver = des.onestep.theta()
            .parameter(1)
            .y0(y0)
            .xDomain(xDomain)
            .h(h)
            .ode(expDecayODE);
        var onestepEulerSolution = onestepEulerSolver();
        return onestepEulerSolution.map(function(iteration) {
            return {
                x: iteration.x,
                y: iteration.y[0]
            };
        });
    };

    function calculateOnestepBackwardEulerSolution() {
        var onestepBackwardEulerSolver = des.onestep.theta()
            .parameter(0)
            .y0(y0)
            .xDomain(xDomain)
            .h(h)
            .ode(expDecayODE);
        var onestepBackwardEulerSolution = onestepBackwardEulerSolver();
        return onestepBackwardEulerSolution.map(function(iteration) {
            return {
                x: iteration.x,
                y: iteration.y[0]
            };
        });
    };

    function calculateOnestepMidpointSolution() {
        var onestepMidpointSolver = des.onestep.theta()
            .y0(y0)
            .xDomain(xDomain)
            .h(h)
            .ode(expDecayODE);
        var onestepMidpointSolution = onestepMidpointSolver();
        return onestepMidpointSolution.map(function(iteration) {
            return {
                x: iteration.x,
                y: iteration.y[0]
            };
        });
    };

    function renderClosedFormChart() {
        var closedFormData = calculateClosedFormData();
        var closedFormChart = basicChart
            .chartLabel('exp(-x)')
            .xDomain(fc.util.extent().fields('x')(closedFormData))
            .yDomain(fc.util.extent().fields('y')(closedFormData));
        closedFormChart.plotArea(multi);

        d3.select('#closed-form-chart')
            .datum(closedFormData)
            .call(closedFormChart);
    };

    function renderOnestepEulerChart() {
        var onestepEulerSolution = calculateOnestepEulerSolution();
        var onestepEulerSolutionChart = des.chart.example.onestep.theta.euler(onestepEulerSolution);
        onestepEulerSolutionChart.plotArea(multi);

        d3.select('#onestep-euler-chart')
            .datum(onestepEulerSolution)
            .call(onestepEulerSolutionChart);
    };

    function renderOnestepBackwardEulerChart() {
        var onestepBackwardEulerSolution = calculateOnestepBackwardEulerSolution();
        var onestepBackwardEulerSolutionChart = des.chart.example.onestep.theta.backwardeuler(onestepBackwardEulerSolution);
        onestepBackwardEulerSolutionChart.plotArea(multi);

        d3.select('#onestep-backward-euler-chart')
            .datum(onestepBackwardEulerSolution)
            .call(onestepBackwardEulerSolutionChart);
    };

    function renderOnestepMidpointChart() {
        var onestepMidpointSolution = calculateOnestepMidpointSolution();
        var onestepMidpointSolutionChart = des.chart.example.onestep.theta.midpoint(onestepMidpointSolution);
        onestepMidpointSolutionChart.plotArea(multi);

        d3.select('#onestep-midpoint-chart')
            .datum(onestepMidpointSolution)
            .call(onestepMidpointSolutionChart);
    };

    function render() {
        renderClosedFormChart();
        renderOnestepEulerChart();
        renderOnestepBackwardEulerChart();
        renderOnestepMidpointChart();
    };

    render();

})(d3, fc, des);