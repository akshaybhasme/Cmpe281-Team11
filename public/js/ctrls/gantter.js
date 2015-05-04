cmpe.controller('gantterCtrl', function ($scope, $modal, $log, $http, $stateParams) {

	$scope.items = ['item1', 'item2', 'item3'];
	$scope.datepush=[];


	$scope.datepush.push(new Date());
	var extDate=new Date();

	for(var i=1;i<12;i++){    
		$scope.datepush.push(extDate.setDate(extDate.getDate()+1));
	}
	console.log($scope.datepush);




	$scope.arrs=[];
	$scope.taskindex=null;
	$scope.getListing = function() {
		$scope.arrs=[];
		$http.get('/api/getTasks/gantter/' + $stateParams.projectID).success(
				function(data) {
					for(var i=0;i<data.length;i++){
						console.log(data[i].object);
						if(!data[i].object) continue;
						if(data[i].object.subtask=="No"){
							data[i].object.id = data[i]._id;
							$scope.arrs.push(data[i].object);
							for(var j=0;j<data.length;j++){
								if(!data[j].object) continue;
								if(data[j].object.subtask=="Yes")
									if(data[j].object.maintask==data[i].object.task){
										data[j].object.id = data[j]._id;
										$scope.arrs.push(data[j].object);
									}
							}
						}
					}
				});
	};

	$scope.deleteTask = function(listing) {
		console.log(listing.id);

		$http({
			method : "delete",
			url : "/api/deleteTask/" + listing.id
		}).success(function(data) {
			$scope.arrs.splice($scope.arrs.indexOf(listing), 1);
			function dateDiffInDays(a,b){
				var Date1 = a;
				var Date2= b;

				var timestamp1 = new Date(Date1).getTime();
				var timestamp2 = new Date(Date2).getTime();

				var diff = (Math.abs(timestamp1 - timestamp2) / 3600000)/24;
				return Math.ceil(diff);
			}

			function max(a,b){
				return a>b?a:b;
			}

			var startdate;
			console.log("Arrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaayy"+$scope.arrs.length);
			for(var i=0;i<$scope.arrs.length;i++){
				if($scope.arrs[i].subtask=="No" && $scope.arrs[i].task==listing.maintask)
				{
					$scope.taskindex=i;
					add=0;
					startdate=$scope.arrs[i].date;

				}

				if($scope.arrs[i].subtask=="Yes" && $scope.arrs[i].maintask==listing.maintask)
				{  
					var enddate=$scope.arrs[i].date;
					var diff=dateDiffInDays(enddate,startdate);
					add=max(diff+parseInt($scope.arrs[i].duration),add);
					if(parseInt($scope.arrs[$scope.taskindex].duration)>add){
						$scope.arrs[$scope.taskindex].duration=add;
					}

				}

				var o1 = {
						object : $scope.arrs[$scope.taskindex]
				};
				$http.put("/api/updateTask/" + $scope.arrs[$scope.taskindex].id, o1)
				.success(function(data)  {
					console.log('Saved :' + data);
				});
				
			}
		});
		//$scope.getListing();
	};

	$scope.getListing();

	$http.get("/users/all").success(function(data){
		$scope.userlist=data;
	});
	//Resource Modal Open
	$scope.openResource=function(i){
		var modalInstance = $modal.open({
			templateUrl: 'views/modals/resource.html',
			controller: 'resourceGantterCtrl',
			resolve: {
				userlist: function () {
					return $scope.userlist;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$http.get("/api/getTaskByID/"+$scope.arrs[i].id).success(function(data){
				//data.object.users.concat(selectedItem);
				data.object.users = selectedItem;
				$http.put("/api/updateTask/"+data._id,{object: data.object}).success(function(data){
					console.log("Users updated:"+data);
				});
				console.log(data);
			});

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});


	}



	// Task Modal Open
	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'views/modals/task.html',
			controller: 'modalGantterCtrl',
			size: size,
			resolve: {
				arrs: function () {
					return $scope.arrs;
				}
			}
		});



		/*
      $scope.deleteTask = function(listing) {
      $scope.arrs.splice($scope.arrs.indexOf(listing), 1);
      /*
		 * $http({ method: "post", url: "api/listings/delete/"+listing._id
		 * }).success(function(data){ $scope.getListing(); });

    };*/
		//$scope.totalduration=0;

		modalInstance.result.then(function (selectedItem) {
			//$scope.arrs.push(selectedItem);
			
			var add=0;
			var o = {
					object : selectedItem
			};
			$http.post("/api/addTask/gantter/" + $stateParams.projectID, o)
			.success(function(data) {
				console.log("Task/SubtaskId: "+data._id);
				selectedItem.id = data._id;
				console.log(selectedItem);
				$scope.arrs.push(selectedItem);
				
				//calculateDuration(selectedItem);

				if(selectedItem.subtask=="Yes"){
					$scope.checkdatediff=[];
					function dateDiffInDays(a,b){
						var Date1 = a;
						var Date2= b;

						var timestamp1 = new Date(Date1).getTime();
						var timestamp2 = new Date(Date2).getTime();

						var diff = (Math.abs(timestamp1 - timestamp2) / 3600000)/24;
						return Math.ceil(diff);
					}

					function max(a,b){
						return a>b?a:b;
					}

					var startdate;

					for(var i=0;i<$scope.arrs.length;i++){
						if($scope.arrs[i].subtask=="No" && $scope.arrs[i].task==selectedItem.maintask)
						{
							$scope.taskindex=i;
							add=0;
							startdate=$scope.arrs[i].date;

						}

						if($scope.arrs[i].subtask=="Yes" && $scope.arrs[i].maintask==selectedItem.maintask)
						{  
							var enddate=$scope.arrs[i].date;
							var diff=dateDiffInDays(enddate,startdate);
							add=max(diff+parseInt($scope.arrs[i].duration),add);
							if(parseInt($scope.arrs[$scope.taskindex].duration)<add){
								$scope.arrs[$scope.taskindex].duration=add;
							}

						}

						var o1 = {
								object : $scope.arrs[$scope.taskindex]
						};
						$http.put("/api/updateTask/" + $scope.arrs[$scope.taskindex].id, o1)
						.success(function(data)  {
							console.log('Saved :' + data.duration);
						});
						
					}
					console.log($scope.totalduration);
				}
				
				$scope.getListing();
			});


		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});

	};
	
	$scope.showProgress = function(){
		var modalInstance = $modal.open({
			templateUrl: 'views/modals/gantter-progress.html',
			controller: 'gantterProgressCtrl',
//			size: size,
			resolve: {
				tasks: function () {
					return $scope.arrs;
				}
			}
		});
	};
	
});

//Please note that $modalInstance represents a modal window (instance) dependency.
//It is not the same as the $modal service used above.

angular.module('cmpe').controller('modalGantterCtrl', function ($scope, $modalInstance, arrs) {

	$scope.arrs = arrs;
	$scope.subtaskname=[];

	$scope.arr={
			ct:"No"
	}

	if($scope.arr.ct=="Yes"){

	}
	$scope.totalduration=0;
	$scope.subtask=["Yes","No"];
	for(var i=0;i<$scope.arrs.length;i++){
		$scope.totalduration=+($scope.totalduration)+parseInt($scope.arrs[i].duration);
		if($scope.arrs[i].subtask=="No")
			$scope.subtaskname.push($scope.arrs[i].task)
	}
	console.log($scope.totalduration);
	$scope.ok = function () {

		var dt=$scope.arr.date;
		var year=dt.getFullYear()+"";
		var month=(dt.getMonth()+1)+"";
		var day=dt.getDate()+"";
		var datenow=month+"-"+day+"-"+year;

		var a={
				task:$scope.arr.task,
				date:datenow,
				duration:parseInt($scope.arr.duration),
				subtask:$scope.arr.ct,
				datediff: dateDiffInDays(new Date(), datenow),
				maintask: $scope.arr.subname,
				percentcomplete:$scope.arr.percentcomplete
		};

		function dateDiffInDays(a,b){
			var Date1 = a;
			var Date2= b;

			var timestamp1 = new Date(Date1).getTime();
			var timestamp2 = new Date(Date2).getTime();

			var diff = (Math.abs(timestamp1 - timestamp2) / 3600000)/24;
			return Math.ceil(diff);
		}

		$modalInstance.close(a);

	};


	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});



angular.module('cmpe').controller('resourceGantterCtrl', function ($scope, $http, $stateParams, $modalInstance, userlist) {
	//console.log(userlist);
	$scope.userlist=[];
	$http.get("/users/all").success(function(data){
		for(var i=0;i<data.length;i++)
			$scope.userlist.push(data[i]);
		console.log($scope.userlist);
	});

	$scope.checkedNames = [];
	$scope.toggleCheck = function (name) {
		if ($scope.checkedNames.indexOf(name) === -1) {
			$scope.checkedNames.push(name);
		} else {
			$scope.checkedNames.splice($scope.checkedNames.indexOf(name), 1);
		}
	};
	$scope.getuser=[];
	$scope.ok = function () {
		// $scope.getuser.push($scope.arr.users);

		console.log($scope.checkedNames);

		/*
	    var dt=$scope.arr.date;
	    var year=dt.getFullYear()+"";
	    var month=(dt.getMonth()+1)+"";
	    var day=dt.getDate()+"";
	    var datenow=month+"-"+day+"-"+year;

	    var a={
	        task:$scope.arr.task,
	        date:datenow,
	        duration:parseInt($scope.arr.duration),
	        subtask:$scope.arr.ct,
	        datediff: dateDiffInDays(new Date(), datenow),
	        maintask: $scope.arr.subname
	    };
		 */
		/*
	    function dateDiffInDays(a,b){
	        var Date1 = a;
	        var Date2= b;

	        var timestamp1 = new Date(Date1).getTime();
	        var timestamp2 = new Date(Date2).getTime();

	        var diff = (Math.abs(timestamp1 - timestamp2) / 3600000)/24;
	        return Math.ceil(diff-1);
	        }*/

		$modalInstance.close($scope.checkedNames);

	};


	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});