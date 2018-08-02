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
    var designSlideImages = [];
    var designSlideQuotes = [];
    var designSlideNames = [];
    var designSlideJobTitles = [];
    VOLUNTEER_INFO.design.forEach(function(designerProfile) {
      designSlideImages.push(designerProfile.profilePictureImageFilename);
      designSlideQuotes.push(designerProfile.professionalQuote);
      designSlideNames.push(designerProfile.fullName);
      designSlideJobTitles.push(designerProfile.jobTitle);
    });
    $scope.designSlideQuotes = designSlideQuotes;
    $scope.designSlideNames = designSlideNames;
    $scope.designSlideJobTitles = designSlideJobTitles;

    var developmentSlideImages = [];
    var developmentSlideQuotes = [];
    var developmentSlideNames = [];
    var developmentSlideJobTitles = [];
    VOLUNTEER_INFO.development.forEach(function(developerProfile) {
      developmentSlideImages.push(developerProfile.profilePictureImageFilename);
      developmentSlideQuotes.push(developerProfile.professionalQuote);
      developmentSlideNames.push(developerProfile.fullName);
      developmentSlideJobTitles.push(developerProfile.jobTitle);
    });
    $scope.developmentSlideQuotes = developmentSlideQuotes;
    $scope.developmentSlideNames = developmentSlideNames;
    $scope.developmentSlideJobTitles = developmentSlideJobTitles;

    var researchSlideImages = [];
    var researchSlideQuotes = [];
    var researchSlideNames = [];
    var researchSlideJobTitles = [];
    VOLUNTEER_INFO.research.forEach(function(researcherProfile) {
      researchSlideImages.push(researcherProfile.profilePictureImageFilename);
      researchSlideQuotes.push(researcherProfile.professionalQuote);
      researchSlideNames.push(researcherProfile.fullName);
      researchSlideJobTitles.push(researcherProfile.jobTitle);
    });
    $scope.researchSlideQuotes = researchSlideQuotes;
    $scope.researchSlideNames = researchSlideNames;
    $scope.researchSlideJobTitles = researchSlideJobTitles;

    var marketingSlideImages = [];
    var marketingSlideQuotes = [];
    var marketingSlideNames = [];
    var marketingSlideJobTitles = [];
    VOLUNTEER_INFO.marketing.forEach(function(marketerProfile) {
      marketingSlideImages.push(marketerProfile.profilePictureImageFilename);
      marketingSlideQuotes.push(marketerProfile.professionalQuote);
      marketingSlideNames.push(marketerProfile.fullName);
      marketingSlideJobTitles.push(marketerProfile.jobTitle);
    });
    $scope.marketingSlideQuotes = marketingSlideQuotes;
    $scope.marketingSlideNames = marketingSlideNames;
    $scope.marketingSlideJobTitles = marketingSlideJobTitles;

    var createSlide = function(profileSlides, profileImage, slideId) {
      profileSlides.push({
        image: profileImage,
        id: slideId
      });
    };
    $scope.designSlides = [];
    $scope.developmentSlides = [];
    $scope.researchSlides = [];
    $scope.marketingSlides = [];
    // Only adding 3 profiles currently.
    for (var i = 0; i < 3; i++) {
      // Increase image dimension to get a diffent image per request
      // from unsplash API
      var newWidth = 600 + i;
      var imageUrl = 'https://unsplash.it/' + newWidth + '/300';
      createSlide($scope.designSlides, imageUrl, i);
      createSlide($scope.developmentSlides, imageUrl, i);
      createSlide($scope.researchSlides, imageUrl, i);
      createSlide($scope.marketingSlides, imageUrl, i);
    }

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
    $scope.active = 0;
  }]);
