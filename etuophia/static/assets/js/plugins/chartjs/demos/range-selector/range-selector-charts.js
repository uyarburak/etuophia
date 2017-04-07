$(function (){
	
/**********************************
Range Selector Numeric Scale Chart
**********************************/

$("#NumericScaleChart").dxRangeSelector({

    scale: {
        startValue: 15000,
        endValue: 150000,
        minorTickInterval: 500,
        majorTickInterval: 15000,
        showMinorTicks: false,
        label: {
            format: "currency"
        }
    },
    sliderMarker: {
        format: "currency"
    },
    selectedRange: {
        startValue: 40000,
        endValue: 80000
    }
});






/**********************************
Date Time Selector Numeric Scale Chart
**********************************/

$("#DateTimeScaleChart").dxRangeSelector({

    scale: {
        startValue: new Date(2011, 1, 1),
        endValue: new Date(2011, 6, 1),
        minorTickInterval: "day",
        majorTickInterval: { days: 7 },
        minRange: "week",
        maxRange: "month",
        showMinorTicks: false
    },
    sliderMarker: {
        format: "monthAndDay"
    },
    selectedRange: {
        startValue: new Date(2011, 1, 5),
        endValue: new Date(2011, 2, 5)
    }
});






/**********************************
Date Time Selector Data Scale Chart
**********************************/

var DTScaleStringChartdataSource = [
    { date: "03/01/2013", dayT: 7, nightT: 2 },
    { date: "03/02/2013", dayT: 4, nightT: -1 },
    { date: "03/03/2013", dayT: 4, nightT: -2 },
    { date: "03/04/2013", dayT: 6, nightT: -3 },
    { date: "03/05/2013", dayT: 9, nightT: -1 },
    { date: "03/06/2013", dayT: 6, nightT: 3 },
    { date: "03/07/2013", dayT: 3, nightT: 1 },
    { date: "03/08/2013", dayT: 6, nightT: -1 },
    { date: "03/09/2013", dayT: 13, nightT: 2 },
    { date: "03/10/2013", dayT: 10, nightT: 2 },
    { date: "03/11/2013", dayT: 12, nightT: 4 },
    { date: "03/12/2013", dayT: 14, nightT: 6 },
    { date: "03/13/2013", dayT: 11, nightT: 3 },
    { date: "03/14/2013", dayT: 5, nightT: -2 },
    { date: "03/15/2013", dayT: 8, nightT: -1 },
    { date: "03/16/2013", dayT: 5, nightT: 0 },
    { date: "03/17/2013", dayT: 3, nightT: -2 },
    { date: "03/18/2013", dayT: 2, nightT: -2 },
    { date: "03/19/2013", dayT: 6, nightT: 1 },
    { date: "03/20/2013", dayT: 7, nightT: 0 },
    { date: "03/21/2013", dayT: 4, nightT: -1 },
    { date: "03/22/2013", dayT: 5, nightT: -2 },
    { date: "03/23/2013", dayT: 8, nightT: 0 },
    { date: "03/24/2013", dayT: 8, nightT: 1 },
    { date: "03/25/2013", dayT: 4, nightT: 2 },
    { date: "03/26/2013", dayT: 12, nightT: 3 },
    { date: "03/27/2013", dayT: 12, nightT: 2 },
    { date: "03/28/2013", dayT: 11, nightT: 3 },
    { date: "03/29/2013", dayT: 13, nightT: 4 },
    { date: "03/30/2013", dayT: 15, nightT: 4 },
    { date: "03/31/2013", dayT: 12, nightT: 7 }
];

$("#DTScaleStringChart").dxRangeSelector({
    dataSource: DTScaleStringChartdataSource,
    size: {
        height: 400
    },
    chart: {
        commonSeriesSettings: {
            type: "steparea",
            argumentField: "date"
        },
        series: [
          { valueField: "dayT", color: "yellow" },
          { valueField: "nightT" }
        ]
    },
    scale: {
        valueType: "datetime"
    },
    sliderMarker: {
        format: "day"
    },
    selectedRange: {
        startValue: "03/01/2013",
        endValue: "03/07/2013"
    }
});













/**********************************
Filtering Data Chart
**********************************/
var employees = [
    { LastName: "Davolio", FirstName: "Nancy", BirthYear: 1948, City: "Seattle", Title: "Sales Representative" },
    { LastName: "Fuller", FirstName: "Andrew", BirthYear: 1952, City: "Tacoma", Title: "Vice President, Sales" },
    { LastName: "Leverling", FirstName: "Janet", BirthYear: 1963, City: "Kirkland", Title: "Sales Representative" },
    { LastName: "Peacock", FirstName: "Margaret", BirthYear: 1937, City: "Redmond", Title: "Sales Representative" },
    { LastName: "Buchanan", FirstName: "Steven", BirthYear: 1955, City: "London", Title: "Sales Manager" },
    { LastName: "Suyama", FirstName: "Michael", BirthYear: 1963, City: "London", Title: "Sales Representative" },
    { LastName: "King", FirstName: "Robert", BirthYear: 1960, City: "London", Title: "Sales Representative" },
    { LastName: "Callahan", FirstName: "Laura", BirthYear: 1958, City: "Seattle", Title: "Inside Sales Coordinator" },
    { LastName: "Dodsworth", FirstName: "Anne", BirthYear: 1966, City: "London", Title: "Sales Representative" }
];

var showEmployees = function(employees) {
        var employee,
            tableHtml;

        if ($('#selectedEmployees').length === 0) {
            $('#DataFilteringChart').append("<br /><br /><center><h3>Selected Employees</h3> <div id='selectedEmployees' /></center>");
        }
        $('#selectedEmployees').empty();
        tableHtml = '<table width="100%" class="table table-striped"><tr>';
        $.each(['First Name', 'Last Name', 'Birth Year', 'City', 'Title'], function () {
            tableHtml += '<td width="20%"><b>' + this + '</b></td>';
        });
        tableHtml += '</tr>';
        $.each(employees, function () {
            tableHtml += '<tr><td>' + this.FirstName + '</td><td>' + this.LastName + '</td><td>' + this.BirthYear + '</td><td>' + this.City + '</td><td>' + this.Title + '</td></tr>';
        });
        tableHtml += '</table>';
        $('#selectedEmployees').html(tableHtml);
}

$("#DataFilteringChart").dxRangeSelector({
    size: {
        height: 140
    },
    dataSource: employees,
    dataSourceField: "BirthYear",
    behavior: {
        callSelectedRangeChanged: "onMoving"
    },
    selectedRangeChanged: function (e) {
        var selectedEmployees = $.grep(employees, function(employee) {
            return employee.BirthYear >= e.startValue && employee.BirthYear <= e.endValue;
        });
        showEmployees(selectedEmployees);
    }
});

showEmployees(employees);

});