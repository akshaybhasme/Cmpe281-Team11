cmpe.controller('gantterCtrl', function ($scope, $modal, $log) {

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
	  $scope.open = function (size) {
	
	    var modalInstance = $modal.open({
	      templateUrl: 'views/modals/task.html',
	      controller: 'modalGantterCtrl',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });
	    
	    $scope.deleteTask = function(listing) {
			$scope.arrs.splice($scope.arrs.indexOf(listing), 1);
			/*
			 * $http({ method: "post", url: "api/listings/delete/"+listing._id
			 * }).success(function(data){ $scope.getListing(); });
			 */
		};
    
    var add=0;
    modalInstance.result.then(function (selectedItem) {
    	$scope.arrs.push(selectedItem);
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
    		
    		if($scope.arrs[i].subtask=="No")
    			{
    				$scope.taskindex=i;
    				add=0;
    				startdate=$scope.arrs[i].date;
    			}

    		if($scope.arrs[i].subtask=="Yes")
    			{  
    			var enddate=$scope.arrs[i].date;
    			var diff=dateDiffInDays(enddate,startdate);
    			add=max(diff+parseInt($scope.arrs[i].duration),add);
    			if(parseInt($scope.arrs[$scope.taskindex].duration)<add){
    				$scope.arrs[$scope.taskindex].duration=add;
    			}
    		}
    	}

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
   
  };
  
 
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('cmpe').controller('modalGantterCtrl', function ($scope, $modalInstance, items) {
	
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  
  $scope.arr={
		  ct:"Yes"
  }
  $scope.subtask=["Yes","No"];

  $scope.ok = function () {
	  
	  var dt=$scope.arr.date;
	  var year=dt.getFullYear()+"";
	  var month=(dt.getMonth()+1)+"";
	  var day=dt.getDate()+"";
	  var datenow=month+"-"+day+"-"+year;
	
	  var a={
			  task:$scope.arr.task,
			  date:datenow,
			  duration:$scope.arr.duration,
			  subtask:$scope.arr.ct,
			  datediff: dateDiffInDays(new Date(), datenow)
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