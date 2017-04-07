$(function (){
	
/**********************************
Gauges Chart
**********************************/
$("#CircularGauge1").dxCircularGauge({
	scale: {
		startValue: 0,
		endValue: 60,
		majorTick: {
			tickInterval: 10
		}
	},

	rangeContainer: {
		backgroundColor: "none",
		ranges: [
			{
				startValue: 0,
				endValue: 20,
				color: "#A6C567"
			},
			{
				startValue: 20,
				endValue: 40,
				color: "#FCBB69"
			},
			{
				startValue: 40,
				endValue: 60,
				color: "#E19094"
			}
		]
	},

	needles: [{value: 24}],

	markers: [{value: 27}, { value: 44}]
});






$("#CircularGauge2").dxCircularGauge({
	preset: "preset2",

	scale: {
		majorTick: {
			tickInterval: 50
		}
	},

	needles: [{value: 40}],

	markers: [
		{ value: 30, color: "#679EC5" },
		{ value: 60, color: "#A6C567" }
	]
});






$("#CircularGauge3").dxCircularGauge({
	preset: "preset3",

	geometry: {
		radius: 140
	},

	scale: {
		label: {
			visible: false
		}
	},

	spindle: {
		visible: false
	},

	rangeContainer: {
		backgroundColor: "none"
	},

	commonRangeBarSettings: {
		size: 14,
		backgroundColor: "#F0F0F0"
	},

	rangeBars: [
		{ value: 60, offset: 50, color: "#A6C567", text: { indent: 30 } },
		{ value: 75, offset: 70, color: "#679EC5", text: { indent: 50 } },
		{ value: 30, offset: 90, color: "#AD79CE", text: { indent: 70 } }
	]
});








var model = {
	settings: {
		preset: "preset1",

		geometry: {
			startAngle: 180,
			endAngle: 90,
			radius: 250
		},

		scale: {
			majorTick: {
				showCalculatedTicks: false,
				customTickValues: [0,25,50,100]
			}
		},

		rangeContainer: {
			backgroundColor: "none",
			ranges: [
				{
					startValue: 0,
					endValue: 25,
					color: "red"
				},
				{
					startValue: 25,
					endValue: 50,
					color: "yellow"
				},
				{
					startValue: 50,
					endValue: 100,
					color: "green"
				}
			]
		},

		needles: [{value: 70}]
	},

	useDevice: function(){
		var value = this.gauge.needleValue(0);
		if(value > 0){
			value -= 50;
		}
		this.gauge.needleValue(0, value);
	},

	recharge: function(){
		this.gauge.needleValue(0, 100);
	}
};

var html = [
    '<div data-bind="dxCircularGauge: settings" style="height: 75%"></div>',
    "<div>",
	'<a href="#" data-bind="click: useDevice" class="blue-bg btn btn-xs showcase-btn">',
		"Use Device",
	"</a>",
	"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
	'<a href="#" data-bind="click: recharge" class="red-bg btn btn-xs showcase-btn">',
		"Recharge",
	"</a>",
    "</div>"
].join("");

$("#QuarterCircleGauge").append(html);
ko.applyBindings(model, $("#QuarterCircleGauge")[0]);
model.gauge =  $("#QuarterCircleGauge div").dxCircularGauge("instance");







var model = {
	settings: {
		preset: "preset2",

		geometry: {
			startAngle: 165,
			endAngle: 15,
			radius: 200
		},

		scale: {
			startValue: 50,
			endValue: 90,
			majorTick: {
				tickInterval: 5
			}
		},

		rangeContainer: {
			backgroundColor: "#CFCFCF"
		},

		commonNeedleSettings: {
			type: "Triangle",
			width: 5
		},

		needles: [
			{ value: 0, color: "#3C74FF" },
			{ value: 0, color: "#FF8080" }
		],

		markers: [
			{ value: 0, color: "#3C74FF" },
			{ value: 0, color: "#FF8080" }
		],
	},

	selectedCity: ko.observable("")
};

var dataSource = {
	"Austria": {
		maleLifetime: 76,
		femaleLifetime: 82,
		maleRetirementAge: 65,
		femaleRetirementAge: 60
	},
	"Switzerland": {
		maleLifetime: 78,
		femaleLifetime: 84,
		maleRetirementAge: 65,
		femaleRetirementAge: 64
	},
	"Bulgaria": {
		maleLifetime: 70,
		femaleLifetime: 76,
		maleRetirementAge: 63,
		femaleRetirementAge: 60
	},
	"Brazil": {
		maleLifetime: 69,
		femaleLifetime: 77,
		maleRetirementAge: 60,
		femaleRetirementAge: 55
	}
};

model.cities = $.map(dataSource, function(_, i) {
	return i;
});

model.selectedCity.subscribe(function (city) {
	var gauge = model.gauge;
	if(gauge && city && dataSource[city]) {
		gauge.needleValue(0, dataSource[city].maleLifetime);
		gauge.needleValue(1, dataSource[city].femaleLifetime);
		gauge.markerValue(0, dataSource[city].maleRetirementAge);
		gauge.markerValue(1, dataSource[city].femaleRetirementAge);
	}
});

var html2 = [
	'<div data-bind="dxCircularGauge: settings" style="height: 75%;"></div>',
	'<div style="position:relative;float:right">',
	'<div><select data-bind="options: cities, value: selectedCity"></select></div>',
	"</div>"
].join("");

$("#MultipleNeedlesCircleGauge").append(html2);
ko.applyBindings(model, $("#MultipleNeedlesCircleGauge")[0]);

model.gauge =  $("#MultipleNeedlesCircleGauge div").dxCircularGauge("instance");
model.selectedCity(model.cities[1]);



});