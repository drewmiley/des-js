(function(d3, fc, des) {
    'use strict';

    var h = 0.01;
    var xDomain = [0, 50];

    var basicChart = fc.chart.cartesian(d3.scale.linear(), d3.scale.linear())
        .yLabel("y")
        .yNice()
        .yOrient("left")
        .xLabel("x")
        .xBaseline(0)
        .xNice()
        .margin({left: 50,
            top: 10,
            right: 20,
            bottom: 10});
    // create a pair of series and some gridlines
    var line = fc.series.line()
      .xValue(function(d) { return d.x; })
      .yValue(function(d) { return d.y; });

    var gridlines = fc.annotation.gridline();

    // combine using a multi-series
    var multi = fc.series.multi()
      .series([gridlines, line]);

    function calculateSinData(xDomain, h) {
        var xRange = xDomain[1] - xDomain[0];
        var sinData = d3.range(xRange / h).map(function(d) {
            return {
                x: xDomain[0] + h * d,
                y: Math.sin(xDomain[0] + h * d)
            };
        });
        return sinData;
    };

    function calculateOnestepEulerSolution(xDomain, h) {
        // var harmonicEquation = des.util.ode()
        //     .linear(true)
        //     .coefficients([-1, 0, 1])
        //     .inhomogeneity(0);
        // var onestepEulerSolver = des.onestep.euler()
        //     .y0(0)
        //     .yDash0(1)
        //     .xDomain(xDomain)
        //     .h(h)
        //     .ode(harmonicEquation);
        // var onestepEulerSolution = onestepEulerSolver();
        // return onestepEulerSolution;
        return calculateSinData(xDomain, h);
    };

    function renderSinChart(xDomain, h) {
        var sinData = calculateSinData(xDomain, h);
        var sinChart = basicChart
            .chartLabel("Sin(x)")
            .xDomain(fc.util.extent().fields("x")(sinData))
            .yDomain(fc.util.extent().pad(0.1).fields("y")(sinData));

        sinChart.plotArea(multi);

        // render
        d3.select("#sin-chart")
            .datum(sinData)
            .call(sinChart);
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

    function render() {
        renderSinChart(xDomain, h);
        renderOnestepEulerChart(xDomain, h);
    };

    render();

})(d3, fc, des);