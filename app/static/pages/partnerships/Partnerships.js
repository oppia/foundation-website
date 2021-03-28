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

oppiaFoundationWebsite.controller(
  'PartnershipsPage', ['$scope', function($scope) {
    $scope.partnershipsActions = [{
      iconFileName: 'Form icon',
      iconFilePath: '/assets/icons/icon_fill.svg',
      text: '1. Fill out the interest form'
    }, {
      iconFileName: 'Phone icon',
      iconFilePath: '/assets/icons/icon_call.svg',
      text: '2. Schedule a 1:1 call with our Partnerships Lead'
    }, {
      iconFileName: 'Handshake icon',
      iconFilePath: '/assets/icons/icon_change.svg',
      text: '3. Make change!'
    }];

    $scope.partnerBenefitsTextContent = [
      'Access to Oppia-specific tips for curriculum building and lesson usage',
      'Personalized guidance for how to best make use of Oppia\'s lessons ' +
      'for the learners you work with',
      'Direct support and collaboration with one of the Oppia Partnership Leads'
    ];
  }]);
