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
        .margin({left: 50, top: 30});
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

    function renderSinChart(xDomain, h) {
        var sinChart = basicChart
            .chartLabel("Sin(x)")
            .xDomain(fc.util.extent().fields("x")(calculateSinData(xDomain, h)))
            .yDomain(fc.util.extent().fields("y")(calculateSinData(xDomain, h)));

        sinChart.plotArea(multi);

        // render
        d3.select("#sin-chart")
            .datum(calculateSinData(xDomain, h))
            .call(sinChart);
    };

    function render() {
        renderSinChart(xDomain, h);
    };

    render();

})(d3, fc, des);