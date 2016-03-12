angular.module('app').controller('CategoryListController', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.categories = Restangular.all('category').getList().$object;
}]);

angular.module('app').controller('CategoryCreateController', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.category = {};

    $scope.create = function(category) {
        Restangular.all('category').post(category);
    };

    $scope.cancel = function() {
        resetForm();
    };

    var resetForm = function() {
        $scope.category = null;
        $scope.categoryForm.$setPristine();
    };
}]);