(function(d3, fc, des) {
    'use strict';

    var h = 0.01;
    var xDomain = [1, 10];
    var y0 = 0;

    var basicChart = des.chart.base()
    var multi = des.chart.multi();

    var logODE = des.form.linearODE()
        .coefficients([0, 1])
        .inhomogeneity(function(x) { return 1 / x; });

    function calculateClosedFormData() {
        var xRange = xDomain[1] - xDomain[0];
        var closedFormData = d3.range(1 + xRange / h).map(function(d) {
            return {
                x: xDomain[0] + h * d,
                y: Math.log(xDomain[0] + h * d)
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
            .ode(logODE);
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
            .ode(logODE);
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
            .ode(logODE);
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
            .chartLabel('ln(x)')
            .xDomain(fc.util.extent().fields('x')(closedFormData))
            .yDomain(fc.util.extent().pad(0.1).fields('y')(closedFormData));

        closedFormChart.plotArea(multi);

        // render
        d3.select('#closed-form-chart')
            .datum(closedFormData)
            .call(closedFormChart);
    };

    function renderOnestepEulerChart() {
        var onestepEulerSolution = calculateOnestepEulerSolution();
        var onestepEulerSolutionChart = basicChart
            .chartLabel('Onestep Euler solution')
            .xDomain(fc.util.extent().fields('x')(onestepEulerSolution))
            .yDomain(fc.util.extent().pad(0.1).fields('y')(onestepEulerSolution));

        onestepEulerSolutionChart.plotArea(multi);

        // render
        d3.select('#onestep-euler-chart')
            .datum(onestepEulerSolution)
            .call(onestepEulerSolutionChart);
    };

    function renderOnestepBackwardEulerChart() {
        var onestepBackwardEulerSolution = calculateOnestepBackwardEulerSolution();
        var onestepBackwardEulerSolutionChart = basicChart
            .chartLabel('Onestep Backward Euler solution')
            .xDomain(fc.util.extent().fields('x')(onestepBackwardEulerSolution))
            .yDomain(fc.util.extent().pad(0.1).fields('y')(onestepBackwardEulerSolution));

        onestepBackwardEulerSolutionChart.plotArea(multi);

        // render
        d3.select('#onestep-backward-euler-chart')
            .datum(onestepBackwardEulerSolution)
            .call(onestepBackwardEulerSolutionChart);
    };

    function renderOnestepMidpointChart() {
        var onestepMidpointSolution = calculateOnestepMidpointSolution();
        var onestepMidpointSolutionChart = basicChart
            .chartLabel('Onestep Midpoint solution')
            .xDomain(fc.util.extent().fields('x')(onestepMidpointSolution))
            .yDomain(fc.util.extent().pad(0.1).fields('y')(onestepMidpointSolution));

        onestepMidpointSolutionChart.plotArea(multi);

        // render
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