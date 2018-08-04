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
oppiaFoundationWebsite.constant('DESIGN_TAB', 'design');
oppiaFoundationWebsite.constant('DEVELOPMENT_TAB', 'development');
oppiaFoundationWebsite.constant('RESEARCH_TAB', 'research');
oppiaFoundationWebsite.constant('MARKETING_TAB', 'marketing');

oppiaFoundationWebsite.directive('profileCarousel', [function() {
  return {
    restrict: 'E',
    scope: {
      carouselType: '@',
      correspondingTabName: '@'
    },
    templateUrl: '/pages/volunteer/profile_carousel_directive.html',
    controller: [
      '$scope', 'VolunteerProfilesService', 'CAROUSEL_TYPE_DESKTOP',
      'CAROUSEL_TYPE_MOBILE', 'DESIGN_TAB', 'DEVELOPMENT_TAB', 'RESEARCH_TAB',
      'MARKETING_TAB',
      function(
          $scope, VolunteerProfilesService, CAROUSEL_TYPE_DESKTOP,
          CAROUSEL_TYPE_MOBILE, DESIGN_TAB, DEVELOPMENT_TAB, RESEARCH_TAB,
          MARKETING_TAB) {
        if ($scope.carouselType === CAROUSEL_TYPE_DESKTOP) {
          $scope.displayDesktopCarousel = true;
          $scope.displayMobileCarousel = false;
        }
        if ($scope.carouselType === CAROUSEL_TYPE_MOBILE) {
          $scope.displayDesktopCarousel = false;
          $scope.displayMobileCarousel = true;
        }
        // Please visit https://angular-ui.github.io/bootstrap/#!#carousel
        // for more info on available directives.
        // Time interval to cycle through the slides. 0 for no auto-cycling.
        $scope.slideIntervalInMS = 0;
        // Prevent looping of slides.
        $scope.noWrapSlides = false;
        // Index of current active slide.
        $scope.active = 0;
        if ($scope.correspondingTabName === DESIGN_TAB) {
          $scope.slides = VolunteerProfilesService.getDesignProfiles();
        }
        if ($scope.correspondingTabName === DEVELOPMENT_TAB) {
          $scope.slides = VolunteerProfilesService.getDevelopmentProfiles();
        }
        if ($scope.correspondingTabName === RESEARCH_TAB) {
          $scope.slides = VolunteerProfilesService.getResearchProfiles();
        }
        if ($scope.correspondingTabName === MARKETING_TAB) {
          $scope.slides = VolunteerProfilesService.getMarketingProfiles();
        }
      }]
  };
}]);
