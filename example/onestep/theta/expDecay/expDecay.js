(function(d3, fc, des) {
    'use strict';

    var h = 0.01;
    var xDomain = [0, 10];
    var y0 = 1;

    var basicChart = des.chart.base()
    var multi = des.chart.multi();

    var expDecayODE = des.form.linearODE()
        .coefficients([1, 1])
        .inhomogeneity(0);

    function calculateClosedFormData(xDomain, h) {
        var xRange = xDomain[1] - xDomain[0];
        var closedFormData = d3.range(1 + xRange / h).map(function(d) {
            return {
                x: xDomain[0] + h * d,
                y: Math.exp(-(xDomain[0] + h * d))
            };
        });
        return closedFormData;
    };

    function calculateOnestepEulerSolution(xDomain, h) {
        var onestepEulerSolver = des.onestep.euler()
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

    function calculateOnestepBackwardEulerSolution(xDomain, h) {
        var onestepBackwardEulerSolver = des.onestep.backwardeuler()
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

    function renderClosedFormChart(xDomain, h) {
        var closedFormData = calculateClosedFormData(xDomain, h);
        var closedFormChart = basicChart
            .chartLabel("exp(-x)")
            .xDomain(fc.util.extent().fields("x")(closedFormData))
            .yDomain(fc.util.extent().pad(0.1).fields("y")(closedFormData));

        closedFormChart.plotArea(multi);

        // render
        d3.select("#closed-form-chart")
            .datum(closedFormData)
            .call(closedFormChart);
    };

    function renderOnestepEulerChart(xDomain, h) {
        var onestepEulerSolution = calculateOnestepEulerSolution(xDomain, h);
        var onestepEulerSolutionChart = basicChart
            .chartLabel("Onestep Euler solution")
            .xDomain(fc.util.extent().fields("x")(onestepEulerSolution))
            .yDomain(fc.util.extent().pad(0.1).fields("y")(onestepEulerSolution));

        onestepEulerSolutionChart.plotArea(multi);

        // render
        d3.select("#onestep-euler-chart")
            .datum(onestepEulerSolution)
            .call(onestepEulerSolutionChart);
    };

    function renderOnestepBackwardEulerChart(xDomain, h) {
        var onestepBackwardEulerSolution = calculateOnestepBackwardEulerSolution(xDomain, h);
        var onestepBackwardEulerSolutionChart = basicChart
            .chartLabel("Onestep Backward Euler solution")
            .xDomain(fc.util.extent().fields("x")(onestepBackwardEulerSolution))
            .yDomain(fc.util.extent().pad(0.1).fields("y")(onestepBackwardEulerSolution));

        onestepBackwardEulerSolutionChart.plotArea(multi);

        // render
        d3.select("#onestep-backward-euler-chart")
            .datum(onestepBackwardEulerSolution)
            .call(onestepBackwardEulerSolutionChart);
    };

    function render() {
        renderClosedFormChart(xDomain, h);
        renderOnestepEulerChart(xDomain, h);
        renderOnestepBackwardEulerChart(xDomain, h);
    };

    render();

})(d3, fc, des);