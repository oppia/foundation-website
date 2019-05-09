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

oppiaFoundationWebsite.factory('LearnerProfilesService', [
  'LEARNER_INFO', function(LEARNER_INFO) {
    /**
     * Append absolute path into each profile picture's filename entry.
     * @param {Array} learnerProfiles - Profiles of all learners.
     */
    var PROFILE_IMAGE_ABSOLUTE_PATH =
      '/assets/images/home/learner_profile_images/';
    var appendProfilePicturePaths = function(learnerProfiles) {
      // Clone learnerProfiles to prevent modifying the original profiles.
      learnerProfiles = angular.copy(learnerProfiles);
      for (var i = learnerProfiles.length - 1; i >= 0; i--) {
        learnerProfiles[i].profilePictureImageFilename =
          PROFILE_IMAGE_ABSOLUTE_PATH +
          learnerProfiles[i].profilePictureImageFilename;
      }
      return learnerProfiles;
    };

    var completeLearnerProfiles = appendProfilePicturePaths(LEARNER_INFO);

    var LearnerProfilesService = {
      getLearnerProfiles: function() {
        return completeLearnerProfiles;
      }
    };
    return LearnerProfilesService;
  }]);
