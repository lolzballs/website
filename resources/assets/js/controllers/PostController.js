angular.module('app').controller('PostCreateController', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.tags = Restangular.all('tag').getList().$object;
    $scope.categories = Restangular.all('category').getList().$object;

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

angular.module('app').controller('PostDetailController', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.post = Restangular.one('post', $stateParams.id).get().$object;
}]);

angular.module('app').controller('PostEditController', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.tags = Restangular.all('tag').getList().$object;
    $scope.categories = Restangular.all('category').getList().$object;
    Restangular.one('post', $stateParams.id).get().then(function(post) {
        $scope.post = post;
        $scope.post.categories = _.map($scope.post.categories, 'id');
        $scope.post.tags = _.map($scope.post.tags, 'id');
    });

    $scope.update = function(post) {
        post.save();
    };

    $scope.cancel = function() {
        resetForm();
    };

    var resetForm = function() {
        $scope.post = null;
        $scope.postForm.$setPristine();
    };
}]);
