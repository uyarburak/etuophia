$(function (){
	
/**********************************
Simplest Bar Charts
**********************************/
	
$("#simplestbarchart").dxChart({
	
	dataSource: [
		{day: "Monday", oranges: 3},
		{day: "Tuesday", oranges: 2},
		{day: "Wednesday", oranges: 3},
		{day: "Thursday", oranges: 4},
		{day: "Friday", oranges: 6},
		{day: "Saturday", oranges: 11},
		{day: "Sunday", oranges: 4} ],
	
	series: {
		argumentField: "day",
		valueField: "oranges",
		name: "My oranges",
		type: "bar",
		color: "#30abe0"
	},
	
	legend: {
		visible: false
	},

});





/**********************************
Bar Charts
**********************************/

var barchartdataSource = [
	{ state: "Illinois", year1998: 423.721, year2001: 476.851, year2004: 528.904 },
	{ state: "Indiana", year1998: 178.719, year2001: 195.769, year2004: 227.271 },
	{ state: "Michigan", year1998: 308.845, year2001: 335.793, year2004: 372.576 },
	{ state: "Ohio", year1998: 348.555, year2001: 374.771, year2004: 418.258 }
];

$("#barchart").dxChart({
	dataSource: barchartdataSource,
	commonSeriesSettings: {
		argumentField: "state",
		type: "bar",
		hoverMode: "allArgumentPoints",
		selectionMode: "allArgumentPoints",
		label: {
			visible: true,
			format: "fixedPoint",
			precision: 0
		}
	},
	series: [
		{ valueField: "year2004", name: "2004", color: "#e36974" },
		{ valueField: "year2001", name: "2001", color: "#66c88d" },
		{ valueField: "year1998", name: "1998", color: "#f2ae43" }
	],
	legend: {
		visible: false
	},
	pointClick: function (point) {
		this.select();
	}
});





/**********************************
Stacked Bar Charts
**********************************/

var stackedbarchartdataSource = [
	{ state: "Germany", young: 6.7, middle: 28.6, older: 5.1 },
	{ state: "Japan", young: 9.6, middle: 43.4, older: 9},
	{ state: "Russia", young: 13.5, middle: 49, older: 5.8 },
	{ state: "USA", young: 30, middle: 90.3, older: 14.5 }
];

$("#stackedbarchart").dxChart({
	dataSource: stackedbarchartdataSource,
	commonSeriesSettings: {
		argumentField: "state",
		type: "stackedBar"
	},
	series: [
		{ valueField: "young", name: "0-14" },
		{ valueField: "middle", name: "15-64" },
		{ valueField: "older", name: "65 and older" }
	],
	legend: {
		visible: false
	},
	valueAxis: {
		title: {
			text: "millions"
		},
		position: "right"
	},
	tooltip: {
		enabled: true,
		customizeText: function () {
			return this.seriesName + " years: " + this.valueText;
		}
	}
});




/**********************************
Full Stacked Bar Charts
**********************************/

var fullstackedbarchartdataSource = [
	{ country: "USA", hydro: 59.8, oil: 937.6, gas: 582, coal: 564.3, nuclear: 187.9 },
	{ country: "China", hydro: 74.2, oil: 308.6, gas: 35.1, coal: 956.9, nuclear: 11.3 },
	{ country: "Russia", hydro: 40, oil: 128.5, gas: 361.8, coal: 105, nuclear: 32.4 },
	{ country: "Japan", hydro: 22.6, oil: 241.5, gas: 64.9, coal: 120.8, nuclear: 64.8 },
	{ country: "India", hydro: 19, oil: 119.3, gas: 28.9, coal: 204.8, nuclear: 3.8 },
	{ country: "Germany", hydro: 6.1, oil: 123.6, gas: 77.3, coal: 85.7, nuclear: 37.8 }
];

$("#fullstackedbarchart").dxChart({
	dataSource: fullstackedbarchartdataSource,
	commonSeriesSettings: {
		argumentField: "country",
		type: "fullStackedBar"
	},
	series: [
		{ valueField: "hydro", name: "Hydro-electric" },
		{ valueField: "oil", name: "Oil" },
		{ valueField: "gas", name: "Natural gas" },
		{ valueField: "coal", name: "Coal" },
		{ valueField: "nuclear", name: "Nuclear" }
	],
	legend: {
		verticalAlignment: "top",
		horizontalAlignment: "center",
		itemTextPosition: "right"
	},
	tooltip: {
		enabled: true,
		customizeText: function () {
			return this.percentText + " - " + this.valueText;
		}
	}
});




/**********************************
Calculated Bar Width Charts
**********************************/

var calculatedbarwidthdataSource = [
  { state: "China", oil: 4.95, gas: 2.85, coal: 45.56 },
  { state: "Russia", oil: 12.94, gas: 17.66, coal: 4.13 },
  { state: "USA", oil: 8.51, gas: 19.87, coal: 15.84 },
  { state: "Iran", oil: 5.3, gas: 4.39 },
  { state: "Canada", oil: 4.08, gas: 5.4 },
  { state: "Saudi Arabia", oil: 12.03 },
  { state: "Mexico", oil: 3.86 }
];
$("#calculatedbarwidth").dxChart({
	equalBarWidth: false,
	dataSource: calculatedbarwidthdataSource,
	commonSeriesSettings: {
		argumentField: "state",
		type: "bar"
	},
	series: [
		{ valueField: "oil", name: "Oil Production" },
		{ valueField: "gas", name: "Gas Production" },
		{ valueField: "coal", name: "Coal Production" }
	],
	legend: {
		verticalAlignment: "bottom",
		horizontalAlignment: "center"
	}
});




/**********************************
Custom Bar Width Charts
**********************************/

 var custombarwidthdataSource = [
  { state: "Saudi Arabia", year1970: 192.2, year1980: 509.8, year1990: 342.6, year2000: 456.3, year2008: 515.3, year2009: 459.5 },
  { state: "USA", year1970: 533.5, year1980: 480.2, year1990: 416.6, year2000: 352.6, year2008: 304.9, year2009: 325.3 },
  { state: "China", year1970: 30.7, year1980: 106, year1990: 138.3, year2000: 162.6, year2008: 195.1, year2009: 189 },
  { state: "Canada", year1970: 70.1, year1980: 83.3, year1990: 92.6, year2000: 126.9, year2008: 157.7, year2009: 155.7 },
  { state: "Mexico", year1970: 24.2, year1980:  107.2, year1990: 146.3, year2000: 171.2, year2008: 157.7, year2009: 147.5}
];

$("#custombarwidth").dxChart({
	dataSource: custombarwidthdataSource,
	equalBarWidth: {
		width: 5
	},
	commonSeriesSettings: {
		argumentField: "state",
		type: "bar"
	},
	series: [
		{ valueField: "year1970", name: "1970" },
		{ valueField: "year1980", name: "1980" },
		{ valueField: "year1990", name: "1990" },
		{ valueField: "year2000", name: "2000" },
		{ valueField: "year2008", name: "2008" },
		{ valueField: "year2009", name: "2009" }
	],
	legend: {
		verticalAlignment: "bottom",
		horizontalAlignment: "center"
	},
});




});