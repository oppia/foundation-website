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

"""Base class for unit tests."""

import unittest


class TestBase(unittest.TestCase):
    """Base class for all tests."""

    def setUp(self):
        """Initialize the fixture for the test suite.

        Subclasses of TestBase should override this method.
        """
        raise NotImplementedError


    def tearDown(self):
        """Clean up the fixture after the test runs.

        Subclasses of TestBase should override this method.
        """
        raise NotImplementedError
