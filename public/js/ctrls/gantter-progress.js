cmpe.controller('gantterProgressCtrl', function($scope, tasks){
	console.log(tasks);
	tasks.sort(function(a, b){
		var dateA = new Date(a.date);
		var dateB = new Date(b.date);
		return dateA < dateB ? -1 : (dateA > dateB ? 1 : 0);
	});
	var rows = [];
	var sum = 0;
	angular.forEach(tasks, function(v, i){
		sum = sum + v.percentcomplete;
	});
	var curSum = 0;
	angular.forEach(tasks, function(v, i){
		curSum = curSum + ((v.percentcomplete / sum) * 100);
		var obj = {
				"c": [
				      {"v": v.date},
				      {"v": curSum}
				      ]	
			};
			rows.push(obj);
	});
	$scope.chartObject = {
			"type": "AreaChart",
			"displayed": true,
			"data": {
				"cols": [
				         {
				        	 "id": "date",
				        	 "label": "Date",
				        	 "type": "string",
				        	 "p": {}
				         },
				         {
				        	 "id": "percentcomplete",
				        	 "label": "Percent Complete",
				        	 "type": "number",
				        	 "p": {}
				         }
				         ],
				         "rows": rows
			},
			"options": {
				"title": "Gantter project progress tracker",
				"isStacked": "true",
				"fill": 20,
				"displayExactValues": true,
				"vAxis": {
					"title": "Percentage Completed",
					"gridlines": {
						"count": 10
					}
				},
				"hAxis": {
					"title": "Date"
				}
			},
			"formatters": {}
	};
});