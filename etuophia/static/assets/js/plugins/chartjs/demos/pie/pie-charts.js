$(function (){
	
/**********************************
Pie Charts
**********************************/
var PieChartdataSource = [
    { country: "Russia", area: 12 },
    { country: "Canada", area: 7 },
    { country: "USA", area: 7 },
    { country: "China", area: 7 },
    { country: "Brazil", area: 6 },
    { country: "Australia", area: 5 },
    { country: "India", area: 2 },
    { country: "Others", area: 55 }
];

$("#PieChart").dxPieChart({
    size:{ 
        width: 500
    },
    dataSource: PieChartdataSource,
    series: [
        {
            argumentField: "country",
            valueField: "area",
            label:{
                visible: true,
                connector:{
                    visible:true,           
                    width: 1
                }
            }
        }
    ]
});






/**********************************
Doughnut Charts
**********************************/
var DoughnutChartdataSource = [
    {region: "Asia", val: 4119626293},
    {region: "Africa", val: 1012956064},
    {region: "Northern America", val: 344124520},
    {region: "Latin America", val: 590946440},
    {region: "Europe", val: 727082222},
    {region: "Oceania", val: 35104756}
];

$("#DoughnutChart").dxPieChart({
    dataSource: DoughnutChartdataSource,
	tooltip: {
		enabled: true,
		format:"millions",
		percentPrecision: 2,
		customizeText: function() { 
			return this.valueText + " - " + this.percentText;
		}
	},
	legend: {
		horizontalAlignment: "right",
		verticalAlignment: "top",
		margin: 0
	},
	series: [{
		type: "doughnut",
		argumentField: "region",
		label: {
			visible: true,
			format: "millions",
			connector: {
				visible: true
			}
		}
	}]
});


});