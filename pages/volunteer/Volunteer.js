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

oppiaFoundationWebsite.controller('volunteerPage', [
  '$scope', function($scope) {
    var designSlideQuotes = [
      'As a former teacher, I am motivated to create a platform that gives' +
      'everyone equal access to education. Working with Oppia is a powerful' +
      'opportunity to leverage design for social justice.',
      'The public is more familiar with bad design than good design. It is, ' +
      'in effect, conditioned to prefer bad design, because that is what it ' +
      'lives with. The new becomes threatening, the old reassuring.',
      'You can have an art experience in front of a Rembrandt… or in front ' +
      'of a piece of graphic design.'
    ];
    $scope.designSlideQuotes = designSlideQuotes;
    var designSlideNames = ['Jordan Movish', 'Milton Glaser', 'Paul Rand'];
    $scope.designSlideNames = designSlideNames;
    var designSlideJobTitles = ['UX Design Lead', 'Graphic Designer',
      'Art Director'];
    $scope.designSlideJobTitles = designSlideJobTitles;
    var designTab = {
      title: 'Design',
      templateUrl: '/pages/volunteer/tabs_template/designTab.html'
    };
    var developmentSlideQuotes = [
      'I’m excited to help build a platform that makes students feel ' +
      'like they are learning from a personal tutor that acts as a guide and ' +
      'can respond to their progress.',
      'Measuring programming progress by lines of code is like measuring ' +
      'aircraft building progress by weight.',
      'It´s better to wait for a productive programmer to become available ' +
      'than it is to wait for the first available programmer to become ' +
      'productive.'
    ];
    $scope.developmentSlideQuotes = developmentSlideQuotes;
    var developmentSlideNames = [
      'Anmok Shukla', 'Bill Gates', 'Steve McConnell'];
    $scope.developmentSlideNames = developmentSlideNames;
    var developmentSlideJobTitles = [
      'Developer, Machine Learning', 'Former Microsoft CEO',
      'Author of Code Complete'];
    $scope.developmentSlideJobTitles = developmentSlideJobTitles;
    var developmentTab = {
      title: 'Development',
      templateUrl: '/pages/volunteer/tabs_template/developmentTab.html'
    };
    var researchSlideQuotes = [
      'I love that Oppia is striving to make learning and education more fun ' +
      'and accessible to all. Volunteering gives me a chance to gain exp as a' +
      ' user researcher while giving back to a cause that I value.',
      'When UX doesn’t consider ALL users, shouldn’t it be known as “SOME ' +
      'User Experience” or… SUX?',
      'The next big thing is the one that makes the last big thing usable.'
    ];
    $scope.researchSlideQuotes = researchSlideQuotes;
    var researchSlideNames = ['Rachen Chan', 'Billy Gregory', 'Blake Ross'];
    $scope.researchSlideNames = researchSlideNames;
    var researchSlideJobTitles = ['User Researcher Lead',
      'Senior Accessibility Engineer', 'Co-founder of Mozilla Firefox'];
    $scope.researchSlideJobTitles = researchSlideJobTitles;
    var researchTab = {
      title: 'Research',
      templateUrl: '/pages/volunteer/tabs_template/researchTab.html'
    };
    var marketingSlideQuotes = [
      'I worked for an education software company for 13 years and saw the ' +
      'tremendous impact it can have on students. My work at Oppia helps me ' +
      'continue shaping the future of education technology.',
      'You need the kind of objectivity that makes you forget everything ' +
      'you’ve heard, clear the table, and do a factual study like a scientist' +
      ' would.',
      'Good content isn’t about good storytelling. It’s about telling a true ' +
      'story well.'
    ];
    $scope.marketingSlideQuotes = marketingSlideQuotes;
    var marketingSlideNames = ['Joe Lastname', 'Steve Wozniak', 'Ann Handley'];
    $scope.marketingSlideNames = marketingSlideNames;
    var marketingSlideJobTitles = ['Joe\'s Job', 'Co-founder of Apple',
      'Digital Marketing Pioneer, Writer, Speaker'];
    $scope.marketingSlideJobTitles = marketingSlideJobTitles;
    var marketingTab = {
      title: 'Marketing',
      templateUrl: '/pages/volunteer/tabs_template/marketingTab.html'
    };
    var createSlide = function(profileSlides, slideId) {
      profileSlides.push({
        image: profileImage,
        id: slideId
      });
    };
    $scope.designSlides = [];
    $scope.developmentSlides = [];
    $scope.researchSlides = [];
    $scope.marketingSlides = [];
    // Only adding 3 profiles currently.
    for (var i = 0; i < 3; i++) {
      // Increase image dimension to get a diffent image per request
      // from unsplash API
      var newWidth = 600 + i;
      var imageUrl = 'https://unsplash.it/' + newWidth + '/300';
      createSlide($scope.designSlides, imageUrl, i);
      createSlide($scope.developmentSlides, imageUrl, i);
      createSlide($scope.researchSlides, imageUrl, i);
      createSlide($scope.marketingSlides, imageUrl, i);
    }
    var tabs = [designTab, developmentTab, researchTab, marketingTab];
    $scope.tabs = tabs;
    $scope.tabId = 0;
    $scope.templateUrl = tabs[0].templateUrl;
    $scope.onTabSelected = function(tabId) {
      $scope.tabId = tabId;
      $scope.templateUrl = tabs[tabId].templateUrl;
    };
    $scope.slideInterval = 0;
    $scope.noWrapSlides = false;
    $scope.active = 0;
  }]);
