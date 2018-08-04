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

oppiaFoundationWebsite.constant('CAROUSEL_TYPE_DESKTOP', 'desktop');
oppiaFoundationWebsite.constant('CAROUSEL_TYPE_MOBILE', 'mobile');

oppiaFoundationWebsite.directive('profileCarousel', [function() {
  return {
    restrict: 'E',
    scope: {
      carouselType: '@',
      correspondingTabName: '@'
    },
    templateUrl: '/pages/volunteer/profile_carousel_directive.html',
    controller: [
      '$scope', '$log', 'VolunteerProfilesService', 'CAROUSEL_TYPE_DESKTOP',
      'CAROUSEL_TYPE_MOBILE',
      function(
          $scope, $log, VolunteerProfilesService, CAROUSEL_TYPE_DESKTOP,
          CAROUSEL_TYPE_MOBILE) {
        if ($scope.carouselType === CAROUSEL_TYPE_DESKTOP) {
          $scope.displayDesktopCarousel = true;
          $scope.displayMobileCarousel = false;
        } else if ($scope.carouselType === CAROUSEL_TYPE_MOBILE) {
          $scope.displayDesktopCarousel = false;
          $scope.displayMobileCarousel = true;
        } else {
          try {
            throw Error('Incorrect carousel type used in markup file.');
          } catch (error) {
            $log.error(error);
          }
        }
        // Please visit https://angular-ui.github.io/bootstrap/#!#carousel
        // for more info on available directives.
        // Time interval to cycle through the slides. 0 for no auto-cycling.
        $scope.slideIntervalInMillisecs = 0;
        // Allow looping of slides.
        $scope.noWrapSlides = false;
        // Index of current active slide.
        $scope.activeSlideIndex = 0;
        $scope.slides = VolunteerProfilesService.getSlidesForTab(
          $scope.correspondingTabName);
      }]
  };
}]);
