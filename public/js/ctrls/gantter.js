cmpe.controller('gantterCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];
  /*$scope.arrs=[{
		task:'task1',
		date:'10/01/2012',
		duration:'12'
	}];*/
   $scope.datepush=[];
   //var dateobj=;
   $scope.datepush.push(new Date());
   var extDate=new Date();
   //$scope.datepush.push(new Date().getDate()+"-"+new Date().getMonth())
	  for(var i=1;i<12;i++){
		  //$scope.getDatetime = (dateobj+i);		  
		  $scope.datepush.push(extDate.setDate(extDate.getDate()+1));
		  //console.log(extDate.setDate(extDate.getDate()+1));
		  
	  }
	  console.log($scope.datepush);
	 // console.log(new Date());
	  ///$scope.dateobj=null;
  //console.log($scope.getDatetime);
  $scope.arrs=[];
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

    modalInstance.result.then(function (selectedItem) {
      //$scope.selected = selectedItem;
    	$scope.arrs.push(selectedItem);
    	console.log($scope.arrs);
    	///$scope.arrs.push($scope.currDate);
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
	  //var subtask=[];
	  console.log($scope.arr.ct);

	  var a={
			  task:$scope.arr.task,
			  date:datenow,
			  duration:$scope.arr.duration,
			  subtask:$scope.arr.ct
	  };

	  $modalInstance.close(a);
	  
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});