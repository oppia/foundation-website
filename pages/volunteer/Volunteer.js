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
    * Shuffles array in place.
    * @param {Array} a items An array containing the items.
    */
    var shuffle = function(a){
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    };

    var getRandomProfileNames = function(volunteerProfiles) {
      var profileNames = [];
      volunteerProfiles.forEach(function(volunteerProfile) {
        profileNames.push(volunteerProfile.fullName);
      });
      shuffle(profileNames);
      // Only adding 3 profiles currently.
      profileNames.slice(0, 3);
      return profileNames;
    };

    var filterProfiles = function (profileNames, profiles) {
      var slides = [];
      profileNames.forEach(function(name) {
        // Expecting all unique names.
        var profileByName = profiles.filter(function(
            profile) {
          return profile.fullName === name;
        });
        slides.push(profileByName[0]);
      });
      return slides;
    };

    var loadDesignSlides = function() {
      $scope.designSlides = filterProfiles(getRandomProfileNames(
        VOLUNTEER_INFO.design), VOLUNTEER_INFO.design);
    };

    var loadDevelopmentSlides = function() {
      $scope.developmentSlides = filterProfiles(getRandomProfileNames(
        VOLUNTEER_INFO.development), VOLUNTEER_INFO.development);
    };

    var loadResearchSlides = function() {
      $scope.researchSlides = filterProfiles(getRandomProfileNames(
        VOLUNTEER_INFO.research), VOLUNTEER_INFO.research);
    };

    var loadMarketingSlides = function() {
      $scope.marketingSlides = filterProfiles(getRandomProfileNames(
        VOLUNTEER_INFO.marketing), VOLUNTEER_INFO.marketing);
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
    $scope.slideInterval = 0;
    $scope.noWrapSlides = false;
    loadDesignSlides();
    loadDevelopmentSlides();
    loadResearchSlides();
    loadMarketingSlides();
  }]);
