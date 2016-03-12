angular.module("app",["ui.router","restangular"]).run(["$rootScope","$state","$stateParams",function(t,e,a){t.$state=e,t.$stateParams=a,t.authenticated=!0,t.$on("$stateChangeStart",function(a,l,o,r,s){l.authenticate&&!t.authenticated&&(e.transitionTo(""==r.name?"home.index":r.name),a.preventDefault())})}]).config(["$stateProvider","$locationProvider","RestangularProvider",function(t,e,a){e.html5Mode(!0),a.setBaseUrl("/api"),t.state("home",{"abstract":!0,views:{main:{templateUrl:"/templates/home.html"}}}).state("home.index",{url:"/",views:{posts:{templateUrl:"/templates/post.list.html",controller:"PostListController"},categories:{templateUrl:"/templates/category.list.html",controller:"CategoryListController"},tags:{templateUrl:"/templates/tag.list.html",controller:"TagListController"}}}).state("post",{"abstract":!0,views:{main:{templateUrl:"/templates/post.html"}}}).state("post.index",{url:"/posts",views:{posts:{templateUrl:"/templates/post.list.html",controller:"PostListController"}}}).state("post.create",{url:"/post/create",views:{posts:{templateUrl:"/templates/post.create.html",controller:"PostCreateController"}},authenticate:!0}).state("tag",{"abstract":!0,views:{main:{templateUrl:"/templates/tag.html"}}}).state("tag.index",{url:"/tags",views:{tags:{templateUrl:"/templates/tag.list.html",controller:"TagListController"}}}).state("tag.create",{url:"/tag/create",views:{tags:{templateUrl:"/templates/tag.create.html",controller:"TagCreateController"}},authenticate:!0}).state("category",{"abstract":!0,views:{main:{templateUrl:"/templates/category.html"}}}).state("category.index",{url:"/categories",views:{categories:{templateUrl:"/templates/category.list.html",controller:"CategoryListController"}}}).state("category.create",{url:"/category/create",views:{categories:{templateUrl:"/templates/category.create.html",controller:"CategoryCreateController"}},authenticate:!0})}]),angular.module("app").controller("CategoryListController",["$scope","Restangular",function(t,e){t.categories=e.all("category").getList().$object}]),angular.module("app").controller("CategoryCreateController",["$scope","Restangular",function(t,e){t.category={},t.create=function(t){e.all("category").post(t)},t.cancel=function(){a()};var a=function(){t.category=null,t.categoryForm.$setPristine()}}]),angular.module("app").controller("PostCreateController",["$scope","Restangular",function(t,e){t.tags=e.all("tag").getList().$object,t.categories=e.all("category").getList().$object,t.post={},t.create=function(t){e.all("post").post(t)},t.cancel=function(){a()};var a=function(){t.post=null,t.postForm.$setPristine()}}]),angular.module("app").controller("PostListController",["$scope","Restangular",function(t,e){t.posts=e.all("post").getList().$object}]),angular.module("app").controller("TagListController",["$scope","Restangular",function(t,e){t.tags=e.all("tag").getList().$object}]),angular.module("app").controller("TagCreateController",["$scope","Restangular",function(t,e){t.category={},t.create=function(t){e.all("tag").post(t)},t.cancel=function(){a()};var a=function(){t.tag=null,t.tagForm.$setPristine()}}]);