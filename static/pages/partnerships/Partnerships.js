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
  'PartnershipsPage', [
    '$scope', '$http', '$mdDialog', '$log',
    'MAILHANDLER_URL', 'THANKYOU_MESSAGE',
    function(
        $scope, $http, $mdDialog, $log,
        MAILHANDLER_URL, THANKYOU_MESSAGE) {
      $scope.submitContactUsForm = function(
          fullName, email, organization, comment, evt) {
        $http.post(MAILHANDLER_URL, {
          email_type: 'PARTNERSHIPS',
          name: fullName,
          organization: organization,
          email: email,
          comment: comment,
        }).then(function() {
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
