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
      iconFilePath: '/assets/icons/icon_doc.png',
      text: '1. Fill out the interest form'
    }, {
      iconFileName: 'Phone icon',
      iconFilePath: '/assets/icons/icon_phone.png',
      text: '2. Schedule a 1:1 call with our Partnerships Lead'
    }, {
      iconFileName: 'Handshake icon',
      iconFilePath: '/assets/icons/icon_shake.png',
      text: '3. Make change!'
    }];

    $scope.partnerBenefitsTextContent = [
      'Access to Oppia-specific tips for curriculum building and lesson usage',
      'Personalized guidance for how to best make use of Oppia\'s lessons ' +
      'for the learners you work with',
      'Direct support and collaboration with one of the Oppia Partnership Leads'
    ];

    $scope.partnershipFaqs = [{
      question: 'What does Oppia require from our organization?',
      answerInMarkdown: (
        `This depends on the nature of the partnership. At the outset, we would
        work together to understand how our missions align, and how Oppia can
        provide support. We would then work together to establish specific goals
        to follow through on during the partnership.` + '\n\n' +
        `Since partnerships require investment on both sides, it would be
        helpful to have a contact who is fluent in English with whom we can
        communicate regularly throughout the partnership.`)
    }, {
      question: 'Does Oppia give funding to organizations?',
      answerInMarkdown: (
        `Each partnership between Oppia and organizations is unique. We try to
        coordinate with organizations to meet their biggest needs. This can
        include help with integrating Oppia into existing programming and
        providing relevant resources for students, teachers, and parents.` +
        '\n\n' +
        `We can also help organizations implement sustainable programming. Get
        in touch with our Partnerships team lead, Melanie, at
        [melanies@oppia.org](mailto:melanies@oppia.org), to see how Oppia can
        work with your organization.`)
    }, {
      question: 'Can Oppia send volunteers to our area?',
      answerInMarkdown: (
        `Perhaps. This is dependent on the partnership goals that have been
        established, and the availability of local Oppia volunteers. We
        strive to form partnerships that provide the most impact in a region,
        which might include providing remote support and helping organizations
        and community volunteers to get the most out of the program.`)
    }, {
      question: 'Can the Oppia lessons be used in my region?',
      answerInMarkdown: (
        `Yes! Oppia's [classroom lessons](https://www.oppia.org/learn/math) are
        high-quality, engaging sessions designed to be accessible and
        applicable for any region. We have tested these lessons and found them
        to be effective in small-scale studies. Users can also [create and
        upload](https://www.oppia.org/community-library) their own lessons to
        the Oppia platform.` + '\n\n' +
        `If it would help to have a mapping from your region's curriculum to
        our lessons, please let us know (and, if possible, send a copy of the
        curriculum) at
        [partnerships-support@oppia.org](mailto:partnerships-support@oppia.org).
        `)
    }, {
      question: (
        'Would Oppia be willing to translate lessons to the language in our ' +
        'region?'),
      answerInMarkdown: (
        `The Oppia team is happy to work with partners to offer translations.
        Contact our Partnerships Team lead, Melanie, at
        [melanies@oppia.org](mailto:melanies@oppia.org), to find out how your
        organization can partner with Oppia to provide accessible, effective
        educational materials in your region.`)
    }];

    $scope.faqOpenStatus = [];
    for (var i = 0; i < $scope.partnershipFaqs.length; i++) {
      $scope.faqOpenStatus.push(false);
    }
  }]);
