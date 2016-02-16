(function(d3, fc, des) {
    'use strict';

    var h = 0.01;
    var xDomain = [0, 10];

    var basicChart = fc.chart.cartesian(d3.scale.linear(), d3.scale.linear())
        .yLabel("y")
        .yNice()
        .yOrient("left")
        .xLabel("x")
        .xBaseline(0)
        .xNice()
        .margin({left: 50,
            top: 30,
            right: 20,
            bottom: 30});
    // create a pair of series and some gridlines
    var line = fc.series.line()
      .xValue(function(d) { return d.x; })
      .yValue(function(d) { return d.y; });

    var gridlines = fc.annotation.gridline();

    // combine using a multi-series
    var multi = fc.series.multi()
      .series([gridlines, line]);

    function calculateExpData(xDomain, h) {
        var xRange = xDomain[1] - xDomain[0];
        var expData = d3.range(1 + xRange / h).map(function(d) {
            return {
                x: xDomain[0] + h * d,
                y: Math.exp(xDomain[0] + h * d)
            };
        });
        return expData;
    };

    function calculateOnestepEulerSolution(xDomain, h) {
        var expODE = des.form.linearODE()
            .coefficients([-1, 1])
            .inhomogeneity(0);
        var onestepEulerSolver = des.onestep.euler()
            .y0(1)
            .xDomain(xDomain)
            .h(h)
            .ode(expODE);
        var onestepEulerSolution = onestepEulerSolver();
        return onestepEulerSolution.map(function(iteration) {
            return {
                x: iteration.x,
                y: iteration.y[0]
            };
        });
    };

    function calculateOnestepBackwardEulerSolution(xDomain, h) {
        var expODE = des.form.linearODE()
            .coefficients([-1, 1])
            .inhomogeneity(0);
        var onestepBackwardEulerSolver = des.onestep.backwardeuler()
            .y0(1)
            .xDomain(xDomain)
            .h(h)
            .ode(expODE);
        var onestepBackwardEulerSolution = onestepBackwardEulerSolver();
        return onestepBackwardEulerSolution.map(function(iteration) {
            return {
                x: iteration.x,
                y: iteration.y[0]
            };
        });
    };

    function renderExpChart(xDomain, h) {
        var expData = calculateExpData(xDomain, h);
        var expChart = basicChart
            .chartLabel("Exp(x)")
            .xDomain(fc.util.extent().fields("x")(expData))
            .yDomain(fc.util.extent().pad(0.1).fields("y")(expData));

        expChart.plotArea(multi);

        // render
        d3.select("#exp-chart")
            .datum(expData)
            .call(expChart);
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
        renderExpChart(xDomain, h);
        renderOnestepEulerChart(xDomain, h);
        renderOnestepBackwardEulerChart(xDomain, h);
    };

    render();

})(d3, fc, des);