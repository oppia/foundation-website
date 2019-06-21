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
  '$scope', '$document', '$http', '$mdDialog', '$log', '$window', '$timeout',
  'ADMIN_EMAIL_ADDRESS', 'MAILHANDLER_URL', 'THANKYOU_MESSAGE',
  function(
      $scope, $document, $http, $mdDialog, $log, $window, $timeout,
      ADMIN_EMAIL_ADDRESS, MAILHANDLER_URL, THANKYOU_MESSAGE) {
    $scope.ADMIN_EMAIL = ADMIN_EMAIL_ADDRESS;
    $scope.VOLUNTEER_EMAIL_SUBJECT = 'Volunteer%20with%20Oppia';
    $scope.formSubmitted = false;
    $scope.tabs = [{
      title: 'Design',
      templateUrl: '/pages/volunteer/tabs_template/design_tab.html'
    }, {
      title: 'Development',
      templateUrl: '/pages/volunteer/tabs_template/development_tab.html'
    }, {
      title: 'Research',
      templateUrl: '/pages/volunteer/tabs_template/research_tab.html'
    }, {
      title: 'Lesson Creation',
      templateUrl: '/pages/volunteer/tabs_template/lesson_creation_tab.html'
    }];
    $scope.volunteerWorkDescriptionUrls = {
      design: '/pages/volunteer/work_description_templates/' +
        'design_description.html',
      development: '/pages/volunteer/work_description_templates/' +
        'development_description.html',
      research: '/pages/volunteer/work_description_templates/' +
        'research_description.html',
      lessonCreation: '/pages/volunteer/work_description_templates/' +
        'lesson_creation_description.html',
    };
    $scope.activeTabIndex = $window.sessionStorage.getItem('activeTabIndex');
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
    $scope.submitContactUsForm = function(fullName, email, comment, evt) {
      $scope.formSubmitted = true;
      $http.post(MAILHANDLER_URL, {
        email_type: 'VOLUNTEER',
        name: fullName,
        email: email,
        comment: comment,
      }).then(function() {
        ga(
          'send', 'event', 'Submit Form', 'Submit Volunteer form', 'Volunteer');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Thank you!')
            .textContent(THANKYOU_MESSAGE)
            .ariaLabel('Thank you dialog')
            .ok('Got it!')
            .targetEvent(evt)
        );
      }, function(errorResponse) {
        $log.error('Server error: ' + errorResponse.data.error);
      });
    };
  }]);
