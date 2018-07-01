// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var oppiaFoundationWebsite = angular.module(
  'oppiaFoundationWebsite', ['ngRoute']);

oppiaFoundationWebsite.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      projectTag: 'Home'
    })
    .when('/about', {
      templateUrl: 'pages/about.html',
      projectTag: 'About'
    })
    .when('/partnerships', {
      templateUrl: 'pages/partnerships.html',
      projectTag: 'Partnerships'
    })
    .when('/volunteer', {
      templateUrl: 'pages/volunteer.html',
      projectTag: 'Volunteer'
    })
    .when('/donate', {
      templateUrl: 'pages/donate.html',
      projectTag: 'Donate'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

oppiaFoundationWebsite.run([
  '$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      $rootScope.projectTag = current.$$route.projectTag;
      $rootScope.title = 'Oppia Foundation: ' + current.$$route.projectTag;
    });

    $rootScope.isActive = function(route) {
      return route === $location.path();
    };
  }
]);
