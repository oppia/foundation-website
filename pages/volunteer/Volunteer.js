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
  '$scope', '$anchorScroll', '$document', '$window',
  function(
      $scope, $anchorScroll, $document, $window) {
    var scrollToTopButton = angular.element(document.querySelector('#div1'));
    $document.bind('scroll', function() {
      // Only display scrollTop button on scroll event.
      if ($window.scrollY > 0 && !scrollToTopButton.hasClass('scrolling')) {
        scrollToTopButton.addClass('scrolling');
      }
      if ($window.scrollY === 0) {
        // Remove scrollTop button after reaching navbar.
        scrollToTopButton.removeClass('scrolling');
      }
    });

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

    /**
     * Scroll to an element with given Id.
     * @param {String} card - id of element to scroll to
     */
    $scope.goToCard = function(card) {
      var offset = 0;
      var duration = 2000; // milliseconds
      var someElement = angular.element(document.getElementById(card));
      $document.scrollToElement(someElement, offset, duration);
    };
  }]);
