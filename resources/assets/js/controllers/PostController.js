angular.module('app').controller('PostCreateController', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.tags = Restangular.all('tag').getList().$object;
    $scope.categories = Restangular.all('category').getList().$object

    $scope.post = {};

    $scope.create = function(post) {
        Restangular.all('post').post(post);
    };

    $scope.cancel = function() {
        resetForm();
    };

    var resetForm = function() {
        $scope.post = null;
        $scope.postForm.$setPristine();
    };
}]);

angular.module('app').controller('PostListController', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.posts = Restangular.all('post').getList().$object;
}]);
