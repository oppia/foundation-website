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

"""Tests for custom JSON encoder."""

from core.controllers import custom_json_encoder
from core.tests import app_engine_test_base


class CustomJsonEncoderTest(app_engine_test_base.GenericTestBase):
    """Test for JSON to get encoded with correct HTML codes."""

    def test_encode_json(self):
        encoder = custom_json_encoder.JSONEncoderForHTML()
        json_with_escaped_char = {'big_value': u'\n<script>={{'}

        self.assertIn('<script>', json_with_escaped_char['big_value'])
        encoded_json = encoder.encode(json_with_escaped_char)
        self.assertNotIn('<script>', encoded_json)
        self.assertIn(
            '\\n\\u003cscript\\u003e={{', encoded_json)
