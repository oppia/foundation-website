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

oppiaFoundationWebsite.directive('saveScrollPosition', [
  '$route', '$window', '$timeout', '$location', '$anchorScroll',
  function($route, $window, $timeout, $location, $anchorScroll) {
    // https://stackoverflow.com/a/25073496
    // Cache scroll position of each route's templateUrl.
    var scrollPosCache = {};
    return function(scope) {
      scope.$on('$routeChangeStart', function() {
        // Store scroll position for the current view.
        if ($route.current) {
          scrollPosCache[$route.current.loadedTemplateUrl] =
            [$window.pageXOffset, $window.pageYOffset];
        }
      });

      scope.$on('$routeChangeSuccess', function() {
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
      });
    };
  }]);
