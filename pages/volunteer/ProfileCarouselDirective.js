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

oppiaFoundationWebsite.directive('profileCarousel', [function() {
  return {
    restrict: 'E',
    scope: {
      desktopCarousel: '@desktop',
      mobileCarousel: '@mobile',
      activeTab: '@tab'
    },
    templateUrl: '/pages/volunteer/profileCarouselTemplate.html',
    controller: ['$scope', 'VolunteerProfilesService',
      function($scope, VolunteerProfilesService) {
        $scope.slideInterval = 0;
        $scope.noWrapSlides = false;
        var DESIGN_TAB = 'Design';
        var DEVELOPMENT_TAB = 'Development';
        var RESEARCH_TAB = 'Research';
        var MARKETING_TAB = 'Marketing';
        var designSlide = {
          active: true
        };
        var developmentSlide = {
          active: true
        };
        var researchSlide = {
          active: true
        };
        var marketingSlide = {
          active: true
        };
        if ($scope.activeTab === DESIGN_TAB) {
          $scope.slides = VolunteerProfilesService.getDesignProfiles();
          $scope.active = designSlide.active;
        }
        if ($scope.activeTab === DEVELOPMENT_TAB) {
          $scope.slides = VolunteerProfilesService.getDevelopmentProfiles();
          $scope.active = developmentSlide.active;
        }
        if ($scope.activeTab === RESEARCH_TAB) {
          $scope.slides = VolunteerProfilesService.getResearchProfiles();
          $scope.active = researchSlide.active;
        }
        if ($scope.activeTab === MARKETING_TAB) {
          $scope.slides = VolunteerProfilesService.getMarketingProfiles();
          $scope.active = marketingSlide.active;
        }
      }]
  };
}]);
