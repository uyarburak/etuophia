$(function (){
	
/**********************************
Range Charts
**********************************/
var RangeChartdataSource = [
    { date: new Date(2005,0,1), aVal1: 36, aVal2: 43.29, tVal1: 42.12, tVal2: 49.91 },
	{ date: new Date(2005,1,1), aVal1: 40.68, aVal2: 47.07, tVal1: 28.33, tVal2: 51.75 },
	{ date: new Date(2005,2,1), aVal1: 45.01, aVal2: 52.77, tVal1: 48.96, tVal2: 56.72 },
	{ date: new Date(2005,3,1), aVal1: 45.99, aVal2: 54.14, tVal1: 49.72, tVal2: 57.27 },
	{ date: new Date(2005,4,1), aVal1: 43.73, aVal2: 49.03, tVal1: 46.8, tVal2: 52.07 },
	{ date: new Date(2005,5,1), aVal1: 49.94, aVal2: 57.94, tVal1: 52.54, tVal2: 60.54 },
	{ date: new Date(2005,6,1), aVal1: 52.88, aVal2: 58.98, tVal1: 54.93, tVal2: 61.28 },
	{ date: new Date(2005,7,1), aVal1: 58.81, aVal2: 67.06, tVal1: 60.86, tVal2: 68.94 },
	{ date: new Date(2005,8,1), aVal1: 61, aVal2: 66.72, tVal1: 63 , tVal2: 69.47 },
	{ date: new Date(2005,9,1), aVal1: 57.86, aVal2: 63.47, tVal1: 59.76, tVal2: 65.47 },
	{ date: new Date(2005,10,1), aVal1: 54.24, aVal2: 59.98, tVal1: 56.14, tVal2: 61.78 },
	{ date: new Date(2005,11,1), aVal1: 55.22, aVal2: 59.22, tVal1: 57.34, tVal2: 61.37 }
];

$("#RangeChart").dxChart({
    dataSource: RangeChartdataSource,
    commonSeriesSettings: {
        argumentField: "date",
        type: "rangeBar"
    },
    series: [
        { 
            rangeValue1Field: "aVal1", 
            rangeValue2Field: "aVal2", 
            name: "ANS West Coast" ,
			color: "#30abe0"
        }, { 
            rangeValue1Field: "tVal1", 
            rangeValue2Field: "tVal2", 
            name: "West Texas Intermediate",
			color: "#f06060" 
        }
    ],    
    valueAxis: {
        title: { 
            text: "$ per barrel"
        }
    },
    argumentAxis: {
        label: {
            format: "month"
        }
	},
    legend: {
        visible: false
    }
});







var RangeAreaChartdataSource = [
        { date: new Date(2010,0,1), val2010: 1.63, val2011: 2.63 },
		{ date: new Date(2010,1,1), val2010: 2.11, val2011: 2.14 },
		{ date: new Date(2010,2,1), val2010: 2.68, val2011: 2.31 },
		{ date: new Date(2010,3,1), val2010: 3.16, val2011: 2.24 },
		{ date: new Date(2010,4,1), val2010: 3.57, val2011: 2.02 },
		{ date: new Date(2010,5,1), val2010: 3.56, val2011: 1.05 },
		{ date: new Date(2010,6,1), val2010: 3.63, val2011: 1.24 },
		{ date: new Date(2010,7,1), val2010: 3.77, val2011: 1.15 },
		{ date: new Date(2010,8,1), val2010: 3.87, val2011: 1.14 },
		{ date: new Date(2010,9,1), val2010: 3.53, val2011: 1.17 },
		{ date: new Date(2010,10,1), val2010: 3.39, val2011: 1.14 },
		{ date: new Date(2010,11,1), val2010: 2.96, val2011: 1.50 }
];

$("#RangeAreaChart").dxChart({
    dataSource: RangeAreaChartdataSource,
    commonSeriesSettings: {
        type: "rangeArea",
        argumentField: "date"
    },
    series: { 
		rangeValue1Field: "val2010", 
		rangeValue2Field: "val2011", 
		name: "2010 - 2011",
		color: "#66c88d" 
	},
    argumentAxis:{
        valueMarginsEnabled: false,
		label: {
			format: "month"
		}
    },
	valueAxis:{	
		min: 0.5,
		max: 4,	
		label: {
			format: "fixedPoint",
			precision: 2,
			customizeText: function(){
				return this.valueText + " %";
			}
		}
	},
	legend: {
		visible:false
	}
});




});