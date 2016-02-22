(function(d3, fc, des) {
    'use strict';

    var h;
    var xDomain;
    var y0;
    var parameter;

    var ode = des.form.linearODE();

    var basicChart = des.chart.base()
    var multi = des.chart.multi();

    function calculateOnestepThetaSolution() {
        var onestepThetaSolver = des.onestep.theta()
            .parameter(parameter)
            .y0(y0)
            .xDomain(xDomain)
            .h(h)
            .ode(ode);
        var onestepThetaSolution = onestepThetaSolver();
        return onestepThetaSolution.map(function(iteration) {
            return {
                x: iteration.x,
                y: iteration.y[0]
            };
        });
    };

    function renderOnestepThetaChart() {
        var onestepThetaSolution = calculateOnestepThetaSolution();
        var onestepThetaSolutionChart = basicChart
            .chartLabel('Onestep Theta=' + parameter + ' solution')
            .xDomain(fc.util.extent().fields('x')(onestepThetaSolution))
            .yDomain(fc.util.extent().fields('y')(onestepThetaSolution));

        onestepThetaSolutionChart.plotArea(multi);

        d3.select('#onestep-theta-chart')
            .datum(onestepThetaSolution)
            .call(onestepThetaSolutionChart);
    };

    function render() {
        renderOnestepThetaChart();
    };

    function solve() {
        xDomain = [parseFloat(document.getElementById('input-min-x').value),
            parseFloat(document.getElementById('input-max-x').value)];
        h = parseFloat(document.getElementById('input-h').value);
        y0 = parseFloat(document.getElementById('input-y0').value);
        parameter = parseFloat(document.getElementById('input-theta').value);
        ode.coefficients([new Function('x', 'return ' + document.getElementById('input-g1X').value),
            new Function('x', 'return ' + document.getElementById('input-g2X').value)])
            .inhomogeneity(new Function('x', 'return ' + document.getElementById('input-fX').value));
        render();
    };

    d3.select('#solve-button').on('click', solve);

})(d3, fc, des);