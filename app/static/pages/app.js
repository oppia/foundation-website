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
  'oppiaFoundationWebsite', ['ngMaterial', 'ngMessages', 'ngRoute', 'duScroll',
    'ui.bootstrap', 'headroom', 'ng-showdown']);

for (var constantName in constants) {
  oppiaFoundationWebsite.constant(constantName, constants[constantName]);
}

oppiaFoundationWebsite.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/home/home.html',
        projectTag: 'Home'
      })
      .when('/about-oppia', {
        templateUrl: 'pages/about/oppia/about_oppia.html',
        projectTag: 'About Oppia'
      })
      .when('/about', {
        templateUrl: 'pages/about/foundation/about_foundation.html',
        projectTag: 'About Foundation'
      })
      .when('/partnerships', {
        templateUrl: 'pages/partnerships/partnerships.html',
        projectTag: 'Partnerships'
      })
      .when('/volunteer', {
        templateUrl: 'pages/volunteer/volunteer.html',
        projectTag: 'Volunteer'
      })
      .when('/donate', {
        templateUrl: 'pages/donate/donate.html',
        projectTag: 'Donate'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode({
      enabled: true
    });
  }]);

oppiaFoundationWebsite.config(['$mdThemingProvider',
  function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('teal');
  }
]);

oppiaFoundationWebsite.run([
  '$location', '$rootScope', '$route', '$timeout', '$window',
  function($location, $rootScope, $route, $timeout, $window) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      $rootScope.projectTag = current.$$route.projectTag;
      $rootScope.title = 'Oppia Foundation: ' + current.$$route.projectTag;
    });

    $rootScope.isActive = function(route) {
      return route === $location.path();
    };

    var scrollPosCache = {};
    $rootScope.$on('$locationChangeSuccess', function() {
      $rootScope.actualLocation = $location.path();
      // Store scroll position for the current view.
      if ($route.current) {
        scrollPosCache[$route.current.loadedTemplateUrl] =
          [$window.pageXOffset, $window.pageYOffset];
      }
    });

    $rootScope.$on('$routeChangeStart', function() {
      // Store scroll position on route change.
      if ($route.current) {
        scrollPosCache[$route.current.loadedTemplateUrl] =
          [$window.pageXOffset, $window.pageYOffset];
      }
    });

    $rootScope.$watch(function() {
      return $location.path();
    }, function(newLocation) {
      if ($rootScope.actualLocation === newLocation) {
        // If hash is specified explicitly, it trumps previously stored scroll
        // position.
        if ($location.hash()) {
          $anchorScroll();
          // Else get previous scroll position; if none, scroll to the top of
          // the page.
        } else {
          var prevScrollPos =
            scrollPosCache[$route.current.loadedTemplateUrl] || [0, 0];
          $timeout(function() {
            $window.scrollTo(prevScrollPos[0], prevScrollPos[1]);
          }, 0);
        }
      }
    });
  }
]);

oppiaFoundationWebsite.constant('MAILHANDLER_URL', '/ajax/mailhandler');

// Message to be displayed when user submits the 'Contact us' form.
oppiaFoundationWebsite.constant(
  'THANKYOU_MESSAGE', 'Your message has been forwarded to the Oppia admins ' +
  'and we will get back to you shortly.');

// Overwrite the built-in exceptionHandler service to log errors to the backend
// (so that they can be fixed).
oppiaFoundationWebsite.factory('$exceptionHandler', ['$log', function($log) {
  var MIN_TIME_BETWEEN_ERRORS_MSEC = 5000;
  var timeOfLastPostedError = Date.now() - MIN_TIME_BETWEEN_ERRORS_MSEC;
  return function(exception, cause) {
    var messageAndSourceAndStackTrace = [
      '',
      'Cause: ' + cause,
      exception.message,
      String(exception.stack),
      '    at URL: ' + window.location.href
    ].join('\n');

    // Throttle to at most 1 backend ping every MIN_TIME_BETWEEN_ERRORS_MSEC.
    if (Date.now() - timeOfLastPostedError > MIN_TIME_BETWEEN_ERRORS_MSEC) {
      // Catch all errors, to guard against infinite recursive loops.
      try {
        // We use jQuery here instead of Angular's $http, since the latter
        // creates a circular dependency.
        $.ajax({
          type: 'POST',
          url: '/ajax/frontend_errors',
          data: $.param({
            payload: JSON.stringify({
              error: messageAndSourceAndStackTrace
            }),
            source: document.URL
          }, true),
          dataType: 'text',
          async: true
        });
      } catch (loggingError) {
        $log.warn('Error logging failed.');
      }
    }

    $log.error.apply($log, arguments);
  };
}]);
