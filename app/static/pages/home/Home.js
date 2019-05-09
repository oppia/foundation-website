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

oppiaFoundationWebsite.controller('HomePage', [
  'LearnerProfilesService', 'WindowDimensionsService', '$scope', function(
      LearnerProfilesService, WindowDimensionsService, $scope) {
    $scope.desktopView = WindowDimensionsService.isDesktopViewWidth();
    $scope.studentProblemsTextContent = [{
      heading: '1. Discrimination',
      text: 'Up to 95% of children with disabilities are out of school. At ' +
      'least 1 in 5 adolescent girls globally are denied an education.'
    }, {
      heading: '2. Lack of resources',
      text: 'In 1 out of 3 countries, less than 3/4 of teachers are trained ' +
      'to national standards. Millions lack textbooks and related resources.'
    }, {
      heading: '3. Conflict',
      text: 'In 2017, 27 million of the 50 million children living in ' +
      'countries affected by conflicts were out of school.'
    }];
    $scope.impactTextContent = [{
      number: '1,000,000+',
      text: 'Learners served worldwide'
    }, {
      number: '20,000',
      text: 'Lessons in our virtual library'
    }, {
      number: '1',
      text: 'Randomized trial completed. More to come!'
    }, {
      number: '100',
      text: 'Volunteers from all over the glove'
    }];
    $scope.learnerProfiles = LearnerProfilesService.getLearnerProfiles();
    WindowDimensionsService.registerOnResizeHook(function() {
      $scope.desktopView = WindowDimensionsService.isDesktopViewWidth();
      $scope.$apply();
    });
  }]);
