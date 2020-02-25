// Copyright 2019 The Oppia Authors. All Rights Reserved.
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

oppiaFoundationWebsite.controller('VolunteerPage', [
  '$scope', '$document', '$window', '$timeout', 'ADMIN_EMAIL_ADDRESS',
  function($scope, $document, $window, $timeout, ADMIN_EMAIL_ADDRESS) {
    $scope.ADMIN_EMAIL = ADMIN_EMAIL_ADDRESS;
    $scope.OPPIA_GITHUB_WIKI_LINK = 'https://github.com/oppia/oppia/wiki';
    $scope.VOLUNTEER_EMAIL_SUBJECT = 'Volunteer%20with%20Oppia';
    $scope.tabs = [{
      title: 'Art',
      templateUrl: '/pages/volunteer/tabs_template/art_tab.html'
    }, {
      title: 'Development',
      templateUrl: '/pages/volunteer/tabs_template/development_tab.html'
    }, {
      title: 'Local Outreach',
      templateUrl: '/pages/volunteer/tabs_template/local_outreach_tab.html'
    }, {
      title: 'Lesson Creation',
      templateUrl: '/pages/volunteer/tabs_template/lesson_creation_tab.html'
    }];
    $scope.volunteerCategoryDescriptionUrls = {
      art: '/pages/volunteer/category_description_templates/' +
        'art_description.html',
      development: '/pages/volunteer/category_description_templates/' +
        'development_description.html',
      localOutreach: '/pages/volunteer/category_description_templates/' +
        'local_outreach_description.html',
      lessonCreation: '/pages/volunteer/category_description_templates/' +
        'lesson_creation_description.html',
    };
    $scope.volunteerWorkDescriptionUrls = {
      art: '/pages/volunteer/work_description_templates/' +
        'art_description.html',
      development: '/pages/volunteer/work_description_templates/' +
        'development_description.html',
      localOutreach: '/pages/volunteer/work_description_templates/' +
        'local_outreach_description.html',
      lessonCreation: '/pages/volunteer/work_description_templates/' +
        'lesson_creation_description.html',
    };
    $scope.activeTabIndex = $window.sessionStorage.getItem('activeTabIndex');
    $scope.hideArtCategoryDescription = true;
    $scope.hideDevelopmentCategoryDescription = true;
    $scope.hideLessonCreationCategoryDescription = true;
    $scope.hideLocalOutreachCategoryDescription = true;
    if ($scope.activeTabIndex === null) {
      $scope.activeTabIndex = 0;
    }
    $scope.templateUrl = $scope.tabs[0].templateUrl;
    $scope.onTabSelected = function(activeTabIndex) {
      $scope.activeTabIndex = activeTabIndex;
      $window.sessionStorage.setItem(
        'activeTabIndex', activeTabIndex.toString());
    };
    var scrollToTopButton = angular.element(document.querySelector(
      '#scroll-to-top-button'));
    $document.bind('scroll', function() {
      // Only display scrollToTop button on scroll event.
      if ($window.scrollY > 0 && !scrollToTopButton.hasClass('scrolling')) {
        scrollToTopButton.addClass('scrolling');
      }
      if ($window.scrollY === 0) {
        // Hide button after reaching navbar.
        scrollToTopButton.removeClass('scrolling');
      }
    });
    $scope.goToElement = function(elementId) {
      // Please visit https://github.com/oblador/angular-scroll
      // for more info on angular-scroll APIs.
      // Vertical offset distance from element after scrolling.
      scrollToTopButton.addClass('invisible');
      var offset = 0;
      var durationInMilliseconds = 1000;
      var destinationElement = angular.element(
        document.getElementById(elementId));
      if (destinationElement.length) {
        $document.scrollToElement(
          destinationElement, offset, durationInMilliseconds);
        $timeout(function() {
          scrollToTopButton.removeClass('invisible');
        }, durationInMilliseconds);
      } else {
        throw Error('No such element');
      }
    };
  }]);
