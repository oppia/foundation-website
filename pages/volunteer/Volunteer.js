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

oppiaFoundationWebsite.controller('volunteerPage', [
  '$scope', 'VOLUNTEER_INFO', function($scope, VOLUNTEER_INFO) {
    $scope.designSlides = [];
    $scope.developmentSlides = [];
    $scope.researchSlides = [];
    $scope.marketingSlides = [];
    /**
     * Select 3 unique random volunteer profiles.
     * @param {Array} volunteerProfiles - Profiles of all volunteers.
     */
    var getRandomProfiles = function(volunteerProfiles) {
      var slides = [];
      for (var i = volunteerProfiles.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * volunteerProfiles.length);
        slides.push(volunteerProfiles[randomIndex]);
        if (slides.length === 3) {
          // Only adding 3 profiles currently.
          return slides;
        }
        volunteerProfiles.splice(randomIndex, 1);
      }
    };

    var initSlides = function() {
      $scope.designSlides = getRandomProfiles(VOLUNTEER_INFO.design);
      $scope.developmentSlides = getRandomProfiles(VOLUNTEER_INFO.development);
      $scope.researchSlides = getRandomProfiles(VOLUNTEER_INFO.research);
      $scope.marketingSlides = getRandomProfiles(VOLUNTEER_INFO.marketing);
    };

    var designTab = {
      title: 'Design',
      templateUrl: '/pages/volunteer/tabs_template/designTab.html'
    };
    var developmentTab = {
      title: 'Development',
      templateUrl: '/pages/volunteer/tabs_template/developmentTab.html'
    };
    var researchTab = {
      title: 'Research',
      templateUrl: '/pages/volunteer/tabs_template/researchTab.html'
    };
    var marketingTab = {
      title: 'Marketing',
      templateUrl: '/pages/volunteer/tabs_template/marketingTab.html'
    };
    var tabs = [designTab, developmentTab, researchTab, marketingTab];
    $scope.tabs = tabs;
    $scope.tabId = 0;
    $scope.templateUrl = tabs[0].templateUrl;
    $scope.onTabSelected = function(tabId) {
      $scope.tabId = tabId;
      $scope.templateUrl = tabs[tabId].templateUrl;
    };
    initSlides();
    $scope.slideInterval = 0;
    $scope.noWrapSlides = false;
  }]);
