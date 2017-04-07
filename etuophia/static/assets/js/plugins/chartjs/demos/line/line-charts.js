$(function (){
	
	
	
/**********************************
Simplest Bar Charts
**********************************/
var linechartdataSource = [
    { year: 1950, europe: 546, americas: 332, africa: 227 },
    { year: 1960, europe: 605, americas: 417, africa: 283 },
    { year: 1970, europe: 656, americas: 513, africa: 361 },
    { year: 1980, europe: 694, americas: 614, africa: 471 },
    { year: 1990, europe: 721, americas: 721, africa: 623 },
    { year: 2000, europe: 730, americas: 836, africa: 797 },
    { year: 2010, europe: 728, americas: 935, africa: 982 },
    { year: 2020, europe: 721, americas: 1027, africa: 1189 },
    { year: 2030, europe: 704, americas: 1110, africa: 1416 },
    { year: 2040, europe: 680, americas: 1178, africa: 1665 },
    { year: 2050, europe: 650, americas: 1231, africa: 1937 }
];

$("#linechart").dxChart({
    dataSource: linechartdataSource,
    commonSeriesSettings: {
        argumentField: "year"
    },
    series: [
        { valueField: "europe", name: "Europe", color:"#30abe0" },
        { valueField: "americas", name: "Americas", color:"#f06060" },
        { valueField: "africa", name: "Africa", color:"#66c88d" }
    ],
    argumentAxis:{
        grid:{
            visible: true
        }
    },
    tooltip:{
        enabled: true
    },
    legend: {
        visible: false
    },
    commonPaneSettings: {
        border:{
            visible: true,
            right: false
        }       
    }
});







/**********************************
Stacked line Charts
**********************************/
var stackedlinechart = [
    { time: "January", food: 3970, capital: 15366, auto: 7818, goods: 9064 },
    { time: "March", food: 3875, capital: 15297, auto: 7518, goods: 9147 },
    { time: "June", food: 4181, capital: 15957, auto: 7603, goods: 9311 },
    { time: "August", food: 3826, capital: 15706, auto: 8046, goods: 9342 },
    { time: "October", food: 3899, capital: 14940, auto: 8233, goods: 9244 },
    { time: "December", food: 3941, capital: 15664, auto: 8642, goods: 10134 }
];

$("#stackedlinechart").dxChart({
    dataSource: stackedlinechart,
    commonSeriesSettings: {
        type: "stackedLine",
        argumentField: "time"
    },
    commonPaneSettings: {
        border: {
            visible: true            
        }
    },
    commonAxisSettings: {
        grid: {
           visible: true
        }
    },
    series: [
        { valueField: "food", name: "Food" },
        { valueField: "capital", name: "Capital Goods", color:"#c180e6" },
        { valueField: "auto", name: "Automotive Vehicles", color:"#f2ae43" },
        { valueField: "goods", name: "Customer Goods", color:"#e36974" }
    ],
    legend: {
        visible: false
    },
    tooltip:{
        enabled: true
    }
});





/**********************************
Full Stacked line Charts
**********************************/
var fullstackedlinechartdataSource = [
    { country: "USA", hydro: 59.8, oil: 937.6, gas: 582, coal: 564.3, nuclear: 187.9 },
    { country: "China", hydro: 74.2, oil: 308.6, gas: 35.1, coal: 956.9, nuclear: 11.3 },
    { country: "Russia", hydro: 40, oil: 128.5, gas: 361.8, coal: 105, nuclear: 32.4 },
    { country: "Japan", hydro: 22.6, oil: 241.5, gas: 64.9, coal: 120.8, nuclear: 64.8 },
    { country: "India", hydro: 19, oil: 119.3, gas: 28.9, coal: 204.8, nuclear: 3.8 },
    { country: "Germany", hydro: 6.1, oil: 123.6, gas: 77.3, coal: 85.7, nuclear: 37.8 }
];

$("#fullstackedlinechart").dxChart({
    dataSource: fullstackedlinechartdataSource,
    commonSeriesSettings: {
        argumentField: "country",
        type: "fullStackedLine"
    },
	argumentAxis: {
		valueMarginsEnabled: false,
		discreteAxisDivisionMode: "crossLabels",
		grid: {
			visible: true
		}
	},
    series: [
        { valueField: "hydro", name: "Hydro-electric" },
        { valueField: "oil", name: "Oil" },
        { valueField: "gas", name: "Natural gas" },
        { valueField: "coal", name: "Coal" },
        { valueField: "nuclear", name: "Nuclear" }
    ],
    legend: {
        visible: false
    },
    tooltip: {
        enabled: true,
        customizeText: function () {
            return this.percentText + " - " + this.valueText;
        }
    }
});





/**********************************
Spline Charts
**********************************/
var splinechartdataSource = [
    { year: 1997, smp: 263, mmp: 226, cnstl: 10, cluster: 1 },
    { year: 1999, smp: 169, mmp: 256, cnstl: 66, cluster: 7 },
    { year: 2001, smp: 57, mmp: 257, cnstl: 143, cluster: 43 },
    { year: 2003, smp: 0, mmp: 163, cnstl: 127, cluster: 210 },
    { year: 2005, smp: 0, mmp: 103, cnstl: 36, cluster: 361 },
    { year: 2007, smp: 0, mmp: 91, cnstl: 3, cluster: 406 }
];

$("#splinechart").dxChart({
    dataSource: splinechartdataSource,
    commonSeriesSettings: {
        type: "spline",
        argumentField: "year"
    },
    commonAxisSettings: {
        grid: {
            visible: true
        }
    },
    series: [
        { valueField: "smp", name: "SMP" },
        { valueField: "mmp", name: "MMP" },
        { valueField: "cnstl", name: "cnstl" },
        { valueField: "cluster", name: "Cluster" }
    ],
    tooltip:{
        enabled: true
    },
    legend: {
        visible: false
    },
    commonPaneSettings: {
        border:{
            visible: true,
            bottom: false
        }
    }
});






/**********************************
Scatter Charts
**********************************/
var scatterchartdataSource = generateDataSource();

$("#scatterchart").dxChart({
    dataSource: scatterchartdataSource,
	commonSeriesSettings: {
		type: "scatter"
	},
    series: [{ 
		argumentField: "x1",
		valueField: "y1",
		color:"#f06060"
	}, { 
		argumentField: "x2",
		valueField: "y2",
		color:"#30abe0",
		point: {
			symbol: "triangle"
		}
	}],
    argumentAxis:{
        grid:{
            visible: true
        }
    },
    legend: {
        visible: false
    },
    commonPaneSettings: {
        border:{
            visible: true
        }       
    }
});

function generateDataSource() {
	var b1 = random(-100, 100) / 10,
		b2 = random(-100, 100) / 10,
		k1 = random(-100, 100) / 10,
		k2 = random(-100, 100) / 10,
		deviation1,
		deviation2,
		ds = [],
		i,
		x1,
		x2,
		y1,
		y2,
		isNegativeDelta,
		delta1,
		delta2;
		
    (k1 < 0.1 && k1 >= 0) && (k1 = 0.1);
    (k1 > -0.1 && k1 < 0) && (k1 = -0.1);
	(k2 < 0.1 && k2 >= 0) && (k2 = 0.1);
    (k2 > -0.1 && k2 < 0) && (k2 = -0.1);
    
    deviation1 = Math.abs(k1 * 8);
	deviation2 = Math.abs(k2 * 8);
    for (i = 0; i < 30; i++) {
		x1 = random(1, 20);
		x2 = random(1, 20);
        
		isNegativeDelta = random(0, 1) == 0;
        delta1 = deviation1 * Math.random();
		delta2 = deviation2 * Math.random();
        if (isNegativeDelta) {
            delta1 = -delta1;
			delta2 = -delta2;
		}
        y1 = k1 * x1 + b1 + delta1;
		y2 = k2 * x2 + b2 + delta2;
		
		ds.push({x1: x1, y1: y1, x2: x2, y2: y2});
    }
	return ds;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}





/**********************************
Step line Charts
**********************************/
var steplinechartdataSource = [
  { year: 1896, gold: 2, silver: 0, bronze: 0 },
  { year: 1900, gold: 2, silver: 0, bronze: 3 },
  { year: 1904, gold: 0, silver: 0, bronze: 0 },
  { year: 1908, gold: 1, silver: 2, bronze: 2 },
  { year: 1912, gold: 2, silver: 2, bronze: 3 },
  { year: 1916, gold: 0, silver: 0, bronze: 0 },
  { year: 1920, gold: 0, silver: 2, bronze: 1 },
  { year: 1924, gold: 3, silver: 1, bronze: 2 },
  { year: 1928, gold: 1, silver: 2, bronze: 1 },
  { year: 1932, gold: 3, silver: 1, bronze: 1 },
  { year: 1936, gold: 0, silver: 0, bronze: 1 },
  { year: 1940, gold: 0, silver: 0, bronze: 0 },
  { year: 1944, gold: 0, silver: 0, bronze: 0 },
  { year: 1948, gold: 2, silver: 6, bronze: 5 },
  { year: 1952, gold: 6, silver: 2, bronze: 3 },
  { year: 1956, gold: 13, silver: 8, bronze: 14 },
  { year: 1960, gold: 8, silver: 8, bronze: 6 },
  { year: 1964, gold: 6, silver: 2, bronze: 10 },
  { year: 1968, gold: 5, silver: 7, bronze: 5 },
  { year: 1972, gold: 8, silver: 7, bronze: 2 },
  { year: 1976, gold: 0, silver: 1, bronze: 4 },
  { year: 1980, gold: 2, silver: 2, bronze: 5 },
  { year: 1984, gold: 4, silver: 8, bronze: 12 },
  { year: 1988, gold: 3, silver: 6, bronze: 5 },
  { year: 1992, gold: 7, silver: 9, bronze: 11 },
  { year: 1996, gold: 9, silver: 9, bronze: 23 },
  { year: 2000, gold: 16, silver: 25, bronze: 17 },
  { year: 2004, gold: 17, silver: 16, bronze: 16 },
  { year: 2008, gold: 14, silver: 15, bronze: 17 }];

$("#steplinechart").dxChart({
    dataSource: steplinechartdataSource,
    commonSeriesSettings: {
        type: "stepline",
        argumentField: "year",
        stepline: {
            point: {
                visible: false
            }
        }
    },
    series: [
		{ valueField: "bronze", name: "Bronze Medals", color: "orangered" },
		{ valueField: "silver", name: "Silver Medals", color: "silver" },
		{ valueField: "gold", name: "Gold Medals", color: "gold" }
    ],
    legend: {
        visible: false
    }
});



});