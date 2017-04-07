$(function (){
	
/**********************************
Advanced Zoom Charts
**********************************/


var series = [{
        argumentField: "arg",
        valueField: "y1",
		color:"#30abe0"
    }, {
        argumentField: "arg",
        valueField: "y2",
		color:"#66c88d"
    }, {
        argumentField: "arg",
        valueField: "y3",
		color:"#f5821c"
    }];

var model = {};
model.chartOptions = {
    argumentAxis: {
       minValueMargin: 0,
       maxValueMargin: 0
    },
    dataSource: zoomingData,
    series: series,
    legend:{
        visible: false
    }
};

model.rangeOptions = {
    size: {
        height: 120
    },
    margin: {
        left: 10
    },
    dataSource: zoomingData,
    chart: {
        series: series
    },
    behavior: {
        callSelectedRangeChanged: "onMoving"
    },
    selectedRangeChanged: function (e) {
        var zoomedChart = $("#ZoomChart #zoomedChart").dxChart("instance");
        zoomedChart.zoomArgument(e.startValue, e.endValue);
    }
};

var html = [
    '<div id="zoomedChart" data-bind="dxChart: chartOptions" style="height: 300px"></div>',
    '<div data-bind="dxRangeSelector: rangeOptions" style="height: 120px"></div>'
].join('');

$("#ZoomChart").append(html);
ko.applyBindings(model, $("#ZoomChart")[0]);





var MultipleAxesChartdataSource = [
    { year: "1750", africa: 106000000, asia: 502000000, europe: 163000000, latinamerica: 16000000, northamerica: 2000000, oceania: 2000000, total: 791000000 },
    { year: "1800", africa: 107000000, asia: 635000000, europe: 203000000, latinamerica: 24000000, northamerica: 7000000, oceania: 2000000, total: 978000000 },
    { year: "1850", africa: 111000000, asia: 809000000, europe: 276000000, latinamerica: 38000000, northamerica: 26000000, oceania: 2000000, total: 1262000000 },
    { year: "1900", africa: 133000000, asia: 947000000, europe: 408000000, latinamerica: 74000000, northamerica: 82000000, oceania: 6000000, total: 1650000000 },
    { year: "1950", africa: 229895000, asia: 1403388000, europe: 547287000, latinamerica: 167368000, northamerica: 171614000, oceania: 12675000, total: 2532227000 },
    { year: "2000", africa: 811101000, asia: 3719044000, europe: 726777000, latinamerica: 521419000, northamerica: 313289000, oceania: 31130000, total: 6122770000 },
    { year: "2050", africa: 2191599000, asia: 5142220000, europe: 719257000, latinamerica: 750956000, northamerica: 446862000, oceania: 55223000, total: 9306128000 }
];

$("#MultipleAxesChart").dxChart({
    palette: "Soft Pastel",
    dataSource: MultipleAxesChartdataSource,
    commonSeriesSettings:{
        argumentField: "year",
		type: "fullstackedbar"
    },
    series: [{
            valueField: "africa",
            name: "Africa"
        }, {
            valueField: "asia",
            name: "Asia"
        }, {
            valueField: "europe",
            name: "Europe"
        }, {
            valueField: "latinamerica",
            name: "Latin Am. &<br/> Caribbean"
        }, {
            valueField: "northamerica",
            name: "Northern America"
        }, {
            valueField: "oceania",
            name: "Oceania"
        }, {
            axis: "total",
            type: "spline",
            valueField: "total",
            name: "Total",
            color: "gray"
        }
    ],
    valueAxis: [{
        grid: {
            visible: true
        }
    }, {
        name: "total",
        position: "right",
        grid: {
            visible: true
        },
        title: {
            text: "Total Population, billions"
        },
        label: {
            format: "largeNumber"
        }
    }],
    tooltip: {
        enabled: true,
        format: "largeNumber",
        precision: 1,
        customizeText: function() {
            return this.percentText ? this.percentText + " - " + this.valueText : this.valueText;
        }
    },
    legend: {
        visible: false
    }
});










var MultiplepanesChartdataSource = [
    { month: "January", avgT: 9.8, minT: 4.1, maxT: 15.5, prec: 109 },
    { month: "February", avgT: 11.8, minT: 5.8, maxT: 17.8, prec: 104 },
    { month: "March", avgT: 13.4, minT: 7.2, maxT: 19.6, prec: 92 },
    { month: "April", avgT: 15.4, minT: 8.1, maxT: 22.8, prec: 30 },
    { month: "May", avgT: 18, minT: 10.3, maxT: 25.7, prec: 10 },
    { month: "June", avgT: 20.6, minT: 12.2, maxT: 29, prec: 2 },
    { month: "July", avgT: 22.2, minT: 13.2, maxT: 31.3, prec: 2 },
    { month: "August", avgT: 22.2, minT: 13.2, maxT: 31.1, prec: 1 },
    { month: "September", avgT: 21.2, minT: 12.4, maxT: 29.9, prec: 8 },
    { month: "October", avgT: 17.9, minT: 9.7, maxT: 26.1, prec: 24 },
    { month: "November", avgT: 12.9, minT: 6.2, maxT: 19.6, prec: 64 },
    { month: "December", avgT: 9.6, minT: 3.4, maxT: 15.7, prec: 76 }
];

$("#MultiplepanesChart").dxChart({
    dataSource: MultiplepanesChartdataSource,
    commonSeriesSettings:{
        argumentField: "month"
    },
    panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
    series: [{ 
            pane: "topPane",
            color: "skyblue",
            type: "rangeArea",
            rangeValue1Field: "minT",
            rangeValue2Field: "maxT",
            name: "Monthly Temperature Ranges, °C"
        }, {
            pane: "topPane", 
            valueField: "avgT",
            name: "Average Temperature, °C",
            label: {
                visible: true,
                customizeText: function (){
                    return this.valueText + " °C";
                }
            }
        }, {
            type: "bar",
            valueField: "prec",
            name: "prec, mm",
            label: {
                visible: true,
                customizeText: function (){
                    return this.valueText  + " mm";
                }
            }
        }
    ],    
    valueAxis: [{
        pane: "bottomPane",
        grid: {
            visible: true
        },
        title: {
            text: "Precipitation, mm"
        }
    }, {
        pane: "topPane",
        min: 0,
        max: 30,
        grid: {
            visible: true
        },
        title: {
            text: "Temperature, °C"
        }
    }],
    legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center"
    },
    title: {
        text: "Weather in Glendale, CA"
    }
});








var SelectionChartdataSource = [
    { country: "China", year2007: 0.1732, year2008: -0.1588 },
	{ country: "Germany", year2007: 0.0964, year2008: -0.2231 },
	{ country: "United States", year2007: 0.1187, year2008: -0.1878 },
	{ country: "Japan", year2007: 0.1081, year2008: -0.2614 },
	{ country: "France", year2007: 0.1014, year2008: -0.2222 },
	{ country: "Netherlands", year2007: 0.1355, year2008: -0.2015 }
];

$("#SelectionChart").dxChart({
    rotated: true,
    dataSource: SelectionChartdataSource,
    commonSeriesSettings: {
        argumentField: "country",
        type: "bar",
        hoverMode: "allArgumentPoints",
        selectionMode: "allArgumentPoints",
        label: {
            visible: true,
            format: "percent",
            precision: 1
        }
    },
    valueAxis: {
        label: {
            format: "percent",
            precision: 1
        }
    },
    series: [
        { valueField: "year2007", name: "2007 - 2008" },
        { valueField: "year2008", name: "2008 - 2009" }
    ],
    title: {
        text: "Economy - Export Change"
    },
    legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center"
    },
    pointClick: function(point) {
        point.select();
    }
});






var MultipleSeriesSectionsChartdataSource = [
{ year: 2006, IE7: 0.011 },
{ year: 2007, IE7: 0.192 },
{ year: 2008, IE7: 0.265 },
{ year: 2009, IE7: 0.213, IE8: 0.052 },
{ year: 2010, IE7: 0.091, IE8: 0.160 },
{ year: 2011, IE7: 0.053, IE8: 0.141, IE9: 0.031 },
{ year: 2012, IE7: 0.021, IE8: 0.088, IE9: 0.065, IE10: 0.001},
{ year: 2013, IE7: 0.008, IE8: 0.052, IE9: 0.039, IE10: 0.026}
];

$("#MultipleSeriesSectionsChart").dxChart({
    seriesSelectionMode: "multiple",
    dataSource: MultipleSeriesSectionsChartdataSource,
    commonSeriesSettings: {
        argumentField: "year",
        type: "stackedarea"
    },
	commonAxisSettings: {
		valueMarginsEnabled: false
    },
	argumentAxis: {
		type: "discrete"
	},
	valueAxis: {
		label: {
			format: "percent",
			precision: 2
		}
    },
    series: [
      { valueField: "IE7", name: "Internet Explorer 7" },
      { valueField: "IE8", name: "Internet Explorer 8" },
      { valueField: "IE9", name: "Internet Explorer 9" },
      { valueField: "IE10", name: "Internet Explorer 10" }
    ],
    title: {
        text: "Internet Explorer Statistics"
    },
    legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center"
    },
    seriesClick: function(series) {
        series.fullState & 2 ? series.clearSelection() : series.select();
    }
});







var NullPointSupportChartdataSource = [

  { year: 1904, gold: null, silver: null },
  { year: 1908, gold: 5, silver: 5 },
  { year: 1912, gold: 7, silver: 4 },
  { year: 1916, gold: null, silver: null },
  { year: 1920, gold: 9, silver: 19 },
  { year: 1924, gold: 13, silver: 15 },
  { year: 1928, gold: 6, silver: 10 },
  { year: 1932, gold: 10, silver: 5 },
  { year: 1936, gold: 7, silver: 6 },
  { year: 1940, gold: null, silver: null },
  { year: 1944, gold: null, silver: null },
  { year: 1948, gold: 10, silver: 6 },
  { year: 1952, gold: 6, silver: 6 },
  { year: 1956, gold: 4, silver: 4 },
  { year: 1960, gold: null, silver: 2 },
  { year: 1964, gold: 1, silver: 8 },
  { year: 1968, gold: 7, silver: 3 },
  { year: 1972, gold: 2, silver: 4 },
  { year: 1976, gold: 2, silver: 3 },
  { year: 1980, gold: 6, silver: 5 },
  { year: 1984, gold: 5, silver: 7 },
  { year: 1988, gold: 6, silver: 4 },
  { year: 1992, gold: 8, silver: 5 },
  { year: 1996, gold: 15, silver: 7 },
  { year: 2000, gold: 13, silver: 14 },
  { year: 2004, gold: 11, silver: 9 },
  { year: 2008, gold: 7, silver: 16 }];

$("#NullPointSupportChart").dxChart({
    dataSource: NullPointSupportChartdataSource,
    commonSeriesSettings: {
        argumentField: "year",
        type: "steparea",
        steparea: {
            point: { visible: true }
        }
    },
    series: [{ valueField: "gold", name: "Gold Medals", color: "gold" },
             { valueField: "silver", name: "Silver Medals", color: "silver" }],
    title: {
        text: "France Olympic Medals"
    },
    legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center"
    }
});

});