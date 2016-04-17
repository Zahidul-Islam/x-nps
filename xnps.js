"use strict";

function renderNPS(npsChart, data){
      var chartData = data.data;
      var charOptions = data.options;

      var title = (data.options.title || 'Company Performance');
      var height = data.options.height;
      var width = data.options.width;

      google.charts.load('current', {'packages':['corechart']});

      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Label');
          data.addColumn('number', 'Detractors');
          data.addColumn('number', 'Passives');
          data.addColumn('number', 'Promotors');
          data.addColumn({type:'number', role:'annotation'});

          chartData.forEach(function(x){
            var detractor = Number(x.detractors);
            var passive = Number(x.passives);
            var promotor = Number(x.promotors);
            var total = detractor + passive + promotor;

            var nps = (promotor / total) *  100 - (detractor / total)  * 100;

            var row = [];
            row.push.apply(row, [x.label, detractor, passive, promotor, nps]);

            data.addRow(row);
      });

      var chart = new google.visualization.BarChart(npsChart);
      chart.draw(data, charOptions);
    }
}

function getDummyData() {
  return {
    id: 1,
    options : {
          "title":  "How likely is it that you would recommand Confirmit to a friend or colleague?",
          "colors": ['red', 'orange', 'indigo'],
          "height": 400,
          "width": 600,
          "legend": { "position": 'bottom', "maxLines": 3 },
          "isStacked": true,
          "hAxis": {minValue: 0}
        },
        data: [
          {"label": "Jan", "detractors": 14, "passives": 40, "promotors": 46},
          {"label": 'Feb', "detractors": 20, "passives": 20, "promotors": 60},
          {"label": 'March', "detractors": 10, "passives": 40, "promotors": 50},
          {"label": 'April', "detractors": 30, "passives": 50, "promotors": 20},
          {"label": 'May', "detractors": 20, "passives": 30, "promotors": 50},
          {"label": 'Jun', "detractors": 5, "passives": 15, "promotors": 80}
        ]
  }
}