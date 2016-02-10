(function(des) {
    'use strict';

    des.util.arraySum = function(arrayOne, arrayTwo) {
        var arraySum = [];
        var arrayLength = Math.min(arrayOne.length, arrayTwo.length);
        for (var i = 0; i < arrayLength; i++) {
            arraySum[i] = arrayOne[i] + arrayTwo[i];
        }
        return arraySum;
    };
})(des);