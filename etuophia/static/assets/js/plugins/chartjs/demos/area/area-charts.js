$(function (){
	
/**********************************
Area Charts
**********************************/
var dataSource = [
        { country: "China", y014: 320866959, y1564: 853191410, y65: 87774113 },
        { country: "India", y014: 340419115, y1564: 626520945, y65: 47063757 },
        { country: "United States", y014: 58554755, y1564: 182172625, y65: 34835293 },
        { country: "Indonesia", y014: 68715705, y1564: 146014815, y65: 10053690 },
        { country: "Brazil", y014: 50278034, y1564: 113391494, y65: 9190842 },
        { country: "Russia", y014: 26465156, y1564: 101123777, y65: 18412243 }
];

$("#areaChart").dxChart({
    dataSource: dataSource,
    commonSeriesSettings: {
        type: "area",
        argumentField: "country"
    },
    series: [
        { valueField: "y1564", name: "15-64 years", color:"#30abe0" },
        { valueField: "y014", name: "0-14 years", color:"#f06060" },
        { valueField: "y65", name: "65 years and older", color:"#f2ae43" }
    ],
    argumentAxis:{
        valueMarginsEnabled: false
    },
	valueAxis:{
		label: {
			format: "millions"
		}
	},
    legend: {
        visible: false
    }
});



/**********************************
Stacked Area Charts
**********************************/
var StackedAreaChartdataSource = [
        { time: "January", food: 3970, capital: 15366, auto: 7818, goods: 9064 },
        { time: "March", food: 3875, capital: 15297, auto: 7518, goods: 9147 },
        { time: "June", food: 4181, capital: 15957, auto: 7603, goods: 9311 },
        { time: "August", food: 3826, capital: 15706, auto: 8046, goods: 9342 },
        { time: "October", food: 3899, capital: 14940, auto: 8233, goods: 9244 },
        { time: "December", food: 3941, capital: 15664, auto: 8642, goods: 10134 }
];

$("#StackedAreaChart").dxChart({
    dataSource: StackedAreaChartdataSource,
    commonSeriesSettings: {
        type: "stackedArea",
        argumentField: "time"
    },
    series: [
        { valueField: "food", name: "Food", color:"#66c88d" },
        { valueField: "capital", name: "Capital Goods", color:"#ec2f87" },
        { valueField: "auto", name: "Automotive Vehicles", color:"#f5821c" },
        { valueField: "goods", name: "Customer Goods", color:"#30abe0" }
    ],
    argumentAxis:{
        valueMarginsEnabled: false,
        grid:{
            visible: true
        }
    },
    valueAxis:{
        grid:{
            visible: false
        }
    },
    legend: {
        visible: false
    }
});







/**********************************
Full Stacked Area Charts
**********************************/
var FullStackedAreaChartdataSource = [
    { year: "1990", us: 504314, ru: 590045, ca: 108607, ir: 23150, no: 25479, rest: 728785 },
    { year: "2000", us: 543174, ru: 528507, ca: 182244, ir: 60240, no: 49748, rest: 1048714 },
    { year: "2008", us: 574436, ru: 601719, ca: 173410, ir: 116300, no: 99245, rest: 1495668 },
    { year: "2009", us: 593380, ru: 527511, ca: 161390, ir: 131200, no: 103470, rest: 1470011 }
];

$("#FullStackedAreaChart").dxChart({
    dataSource: FullStackedAreaChartdataSource,
    commonSeriesSettings: {
        argumentField: "year",
        type: "fullStackedArea",
        hoverStyle: {
            hatching: "right"
        }
    },
    series: [
        { valueField: "us", name: "United States" },
        { valueField: "ru", name: "Russia" },
        { valueField: "ca", name: "Canada" },
        { valueField: "ir", name: "Iran" },
        { valueField: "no", name: "Norway" },
        { valueField: "rest", name: "Rest of the World" }
    ],
	argumentAxis: {
		valueMarginsEnabled: false
	},
    legend: {
        visible: false
    }
});







/**********************************
Spline Area Charts
**********************************/
var SplineAreaChartdataSource = [
    { company: "ExxonMobil", y2005: 362.53, y2004: 277.02},
    { company: "GeneralElectric", y2005: 348.45, y2004: 328.54},
    { company: "Microsoft", y2005: 279.02, y2004: 297.02},
    { company: "Citigroup", y2005: 230.93, y2004: 255.3},
    { company: "Royal Dutch Shell plc", y2005: 203.52, y2004: 173.54},
    { company: "Procted & Gamble", y2005: 197.12, y2004: 131.89}
];

$("#SplineAreaChart").dxChart({
    dataSource: SplineAreaChartdataSource,
    commonSeriesSettings: {
        type: "splineArea",
        argumentField: "company"
    },
    argumentAxis:{
        valueMarginsEnabled: false
    },
    series: [
        { valueField: "y2005", name: "2005", color:"#c180e6" },
        { valueField: "y2004", name: "2004", color:"#66c88d" }
    ],
    legend: {
        visible: false
    }
});







var StepAreaChartdataSource = [
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

$("#StepAreaChart").dxChart({
    dataSource: StepAreaChartdataSource,
    commonSeriesSettings: {
        type: "steparea",
        argumentField: "year",
        steparea: {
            border: {
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