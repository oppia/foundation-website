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

oppiaFoundationWebsite.factory('VolunteerProfilesService', [
  'VOLUNTEER_INFO', function(VOLUNTEER_INFO) {
    /**
     * Select 3 unique random volunteer profiles.
     * @param {Array} volunteerProfiles - Profiles of all volunteers.
     */
    var PROFILE_IMAGE_ABSOLUTE_PATH =
      '/assets/images/volunteer/profile_images/';
    var getRandomProfiles = function(volunteerProfiles) {
      // Cloning volunteerProfiles to prevent changes to the original profiles.
      volunteerProfiles = angular.copy(volunteerProfiles);
      var slides = [];
      for (var i = volunteerProfiles.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * volunteerProfiles.length);
        volunteerProfiles[randomIndex].profilePictureImageFilename =
          PROFILE_IMAGE_ABSOLUTE_PATH +
          volunteerProfiles[randomIndex].profilePictureImageFilename;
        slides.push(volunteerProfiles[randomIndex]);
        if (slides.length === 3) {
          // Only adding 3 profiles currently.
          return slides;
        }
        volunteerProfiles.splice(randomIndex, 1);
      }

      return slides;
    };
    var volunteersByCategory = {};
    Object.keys(VOLUNTEER_INFO).forEach(function(volunteerCategory) {
      volunteersByCategory[volunteerCategory] = getRandomProfiles(
        VOLUNTEER_INFO[volunteerCategory]);
    });

    var VolunteerProfilesService = {
      getArtProfiles: function() {
        return volunteersByCategory.art;
      },
      getDevelopmentProfiles: function() {
        return volunteersByCategory.development;
      },
      getLessonCreationProfiles: function() {
        return volunteersByCategory.lessonCreation;
      },
      getLocalOutreachProfiles: function() {
        return volunteersByCategory.localOutreach;
      },
      getSlidesForTab: function(tabName) {
        return volunteersByCategory[tabName.toLowerCase()];
      }
    };
    return VolunteerProfilesService;
  }]);
