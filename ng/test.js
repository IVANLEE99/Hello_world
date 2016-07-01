angular.module('myapp', [])
  .controller('myappctr',['$scope',function ($scope) {
    $scope.name='lee';
    $scope.click=function () {
      $scope.name='ivan';
    }
  }]);
