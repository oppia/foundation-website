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

oppiaFoundationWebsite.constant('GREEN_BUTTON', 'green');
oppiaFoundationWebsite.constant('WHITE_BUTTON', 'white');

oppiaFoundationWebsite.directive('paypalDonateForm', [function() {
  return {
    restrict: 'E',
    scope: {
      buttonColor: '@',
      buttonText: '@'
    },
    templateUrl: '/pages/donate/paypal_donate_form.html',
    controller: [
      '$scope', 'GREEN_BUTTON', 'WHITE_BUTTON',
      function($scope, GREEN_BUTTON, WHITE_BUTTON) {
        if ($scope.buttonColor === GREEN_BUTTON) {
          $scope.oppiaGreenButton = true;
          $scope.oppiaWhiteButton = false;
        } else if ($scope.buttonColor === WHITE_BUTTON) {
          $scope.oppiaGreenButton = false;
          $scope.oppiaWhiteButton = true;
        } else {
          throw Error('Incorrect button color used in markup file.');
        }
      }
    ]
  };
}]);
