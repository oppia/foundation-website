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

oppiaFoundationWebsite.controller('AboutPage', [
  'ADMIN_EMAIL_ADDRESS', 'LearnerProfilesService', '$scope',
  function(ADMIN_EMAIL_ADDRESS, LearnerProfilesService, $scope) {
    $scope.ADMIN_EMAIL = ADMIN_EMAIL_ADDRESS;
    $scope.QUESTION_EMAIL_SUBJECT = 'Question%20about%20Oppia';
    $scope.oppiaFeatures = ['Audio Subtitles', 'Story-based Lessons',
      'Mobile-friendly Navigation', 'Low Bandwidth Required',
      'Translations To Local Dialects'];
    $scope.impactTextContent = [{
      number: '1,000,000+',
      text: 'Learners served worldwide'
    }, {
      number: '20,000',
      text: 'Lessons in our virtual library'
    }, {
      number: '1',
      text: 'Randomized trial completed\n(and more to come!)'
    }, {
      number: '100+',
      text: 'Volunteers from all over the globe'
    }];
    $scope.learnerProfiles = LearnerProfilesService.getLearnerProfiles();
  }]);
