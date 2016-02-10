(function(d3, fc, des) {
    'use strict';

    var sinData = d3.range(50).map(function(d) {
        return {
            x: d,
            y: Math.sin(d)
        };
    });

    // create a chart
    var sinChart = fc.chart.cartesian(
                  d3.scale.linear(),
                  d3.scale.linear())
              .yDomain(fc.util.extent().pad(0.2).fields(["y"])(sinData))
              .yLabel("Sine")
              .yNice()
              .yOrient("left")
              .xDomain(fc.util.extent().fields("x")(sinData))
              .xLabel("Time")
              .xBaseline(0)
              .chartLabel("Sine Chart")
              .margin({left: 50, bottom: 20, top: 30});

    // create a pair of series and some gridlines
    var sinLine = fc.series.line()
      .xValue(function(d) { return d.x; })
      .yValue(function(d) { return d.y; });

    var gridlines = fc.annotation.gridline();

    // combine using a multi-series
    var multi = fc.series.multi()
      .series([gridlines, sinLine]);

    sinChart.plotArea(multi);

    // render
    d3.select("#sin-chart")
        .datum(sinData)
        .call(sinChart);

})(d3, fc, des);