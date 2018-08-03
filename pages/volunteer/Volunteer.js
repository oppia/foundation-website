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
  '$scope', 'VolunteerProfilesService', function(
      $scope, VolunteerProfilesService) {
    $scope.designSlides = VolunteerProfilesService.getDesignProfiles();
    $scope.developmentSlides =
      VolunteerProfilesService.getDevelopmentProfiles();
    $scope.researchSlides = VolunteerProfilesService.getResearchProfiles();
    $scope.marketingSlides = VolunteerProfilesService.getMarketingProfiles();

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
  }]);

oppiaFoundationWebsite.factory('VolunteerProfilesService', [
  'VOLUNTEER_INFO', function(VOLUNTEER_INFO) {
    /**
     * Select 3 unique random volunteer profiles.
     * @param {Array} volunteerProfiles - Profiles of all volunteers.
     */
    var getRandomProfiles = function(volunteerProfiles) {
      // Cloning volunteerProfiles to prevent changes to the original profiles.
      var volunteerProfiles = Object.assign([], volunteerProfiles);
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
    var designProfiles = getRandomProfiles(VOLUNTEER_INFO.design);
    var developmentProfiles = getRandomProfiles(VOLUNTEER_INFO.development);
    var researchProfiles = getRandomProfiles(VOLUNTEER_INFO.research);
    var marketingProfiles = getRandomProfiles(VOLUNTEER_INFO.marketing);

    var VolunteerProfilesService = {
      getDesignProfiles: function() {
        return designProfiles;
      },
      getDevelopmentProfiles: function() {
        return developmentProfiles;
      },
      getResearchProfiles: function() {
        return researchProfiles;
      },
      getMarketingProfiles: function() {
        return marketingProfiles;
      }
    };
    return VolunteerProfilesService;
  }]);
