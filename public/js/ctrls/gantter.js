cmpe.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];
  $scope.arrs=[{
		task:'task1',
		date:'10/01/2012',
		duration:'12'
	}];
  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/modals/task.html',
      controller: 'ModalInstanceCtrl',
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
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('cmpe').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
	
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
	  
	  var a={
			  task:$scope.arr.textarea,
				date:$scope.arr.dt,
				duration:$scope.arr.duration
			  
	  };
	  $modalInstance.close(a);
	  
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});