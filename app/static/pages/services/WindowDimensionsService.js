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

/**
 * @fileoverview Service for computing the window dimensions.
 */

oppiaFoundationWebsite.factory(
  'WindowDimensionsService', ['$window', function($window) {
    var onResizeHooks = [];
    angular.element($window).bind('resize', function() {
      onResizeHooks.forEach(function(hookFn) {
        hookFn();
      });
    });
    return {
      getWidth: function() {
        return (
          $window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth);
      },
      registerOnResizeHook: function(hookFn) {
        onResizeHooks.push(hookFn);
      },
      isDesktopViewWidth: function() {
        var DESKTOP_WIDTH_THRESHOLD_PX = 1279;
        return this.getWidth() >= DESKTOP_WIDTH_THRESHOLD_PX;
      }
    };
  }]);
