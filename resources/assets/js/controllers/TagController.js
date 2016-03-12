angular.module('app').controller('TagListController', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.tags = Restangular.all('tag').getList().$object;
}]);

angular.module('app').controller('TagCreateController', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.category = {};

    $scope.create = function(tag) {
        Restangular.all('tag').post(tag);
    };

    $scope.cancel = function() {
        resetForm();
    };

    var resetForm = function() {
        $scope.tag = null;
        $scope.tagForm.$setPristine();
    };
}]);