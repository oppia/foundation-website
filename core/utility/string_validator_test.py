# coding: utf-8
# Copyright 2018 The Oppia Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Test for string validation utilities."""

from core.utility import string_validator
from core.tests import app_engine_test_base


class StringValidationTests(app_engine_test_base.AppEngineTestBase):
    """Test for various string validation utility methods"""

    def test_is_ascii(self):
        """Test is_ascii returns True for ASCII strings and False otherwise.
        """
        self.assertTrue(string_validator.is_ascii('a'))
        self.assertFalse(string_validator.is_ascii(u'å'))

    def test_invalid_string_reason(self):
        """Test invalid_string_reason returns the corresponding reason why
        the specified string is invalid.
        """
        bad_string = None
        self.assertEqual(
            'None string type for None.',
            string_validator.invalid_string_reason(bad_string))

        bad_string = u'å'
        self.assertEqual(
            'Not an ASCII string.',
            string_validator.invalid_string_reason(bad_string))

        bad_string = 42
        self.assertEqual(
            'Invalid string type for %s.' % bad_string,
            string_validator.invalid_string_reason(bad_string))

        bad_string = ' '
        self.assertEqual(
            'String is empty.',
            string_validator.invalid_string_reason(bad_string))

        good_string = 'abc'
        self.assertIs(None, string_validator.invalid_string_reason(good_string))

    def test_is_string_valid(self):
        """Test is_string_valid returns True if string is valid, else False.
        """
        bad_string = ' '
        self.assertFalse(string_validator.is_string_valid(bad_string))

        good_string = 'abc'
        self.assertTrue(string_validator.is_string_valid(good_string))

    def test_check_string_valid(self):
        """Test check_string_valid raises exception with specific reason why
        provided string is invalid.
        """
        bad_string = 42
        with self.assertRaisesRegexp(
            string_validator.InvalidStringException,
            'Invalid string type for %s.' % bad_string):
            string_validator.check_string_valid(bad_string)
