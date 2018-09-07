# Copyright 2018 The Oppia Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Tests for CONSTANTS object and cosntants.json file."""

import os

from core.tests import app_engine_test_base
from core.utility import constants

import config


class ConstantsTest(app_engine_test_base.AppEngineTestBase):
    """Tests for reading constants.js and converting its content to JSON format.
    """

    def test_constants_js_file_exists(self):
        """Ensure that constants.js exists at the specified path."""
        self.assertTrue(os.path.isfile(constants.CONSTANTS_JS_FILEPATH))

    def test_constants_file_contains_test_json_value(self):
        """Ensure constants.js has the specified TESTING_CONSTANT entry."""
        with open(constants.CONSTANTS_JS_FILEPATH, 'r') as f:
            json = constants.parse_json_from_js(f)
            self.assertTrue(isinstance(json, dict))
            self.assertEqual(json['TESTING_CONSTANT'], 'test')

    def test_constants_and_config_are_consistent(self):
        """Ensure that constants with the same name in both config.py and
        constants.js are the same.
        """
        # Ignore non-ASCII character in ADMIN_EMAIL_ADDRESS.
        encoded_admin_email_address = (
            constants.CONSTANTS.ADMIN_EMAIL_ADDRESS.encode(
                'ascii', 'ignore'))
        self.assertEqual(
            config.ADMIN_EMAIL_ADDRESS, encoded_admin_email_address)
