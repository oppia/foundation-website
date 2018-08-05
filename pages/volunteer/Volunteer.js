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

oppiaFoundationWebsite.controller('VolunteerPage', ['$scope', function($scope) {
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
    title: 'Marketing',
    templateUrl: '/pages/volunteer/tabs_template/marketing_tab.html'
  }];
  $scope.activeTabId = 0;
  $scope.templateUrl = $scope.tabs[0].templateUrl;
  $scope.onTabSelected = function(activeTabId) {
    $scope.activeTabId = activeTabId;
  };
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
