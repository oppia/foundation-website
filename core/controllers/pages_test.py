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

"""Tests for static pages (like the About page)."""

from core.tests import app_engine_test_base


class NoninteractivePagesTest(app_engine_test_base.GenericTestBase):
    """Test GET request for various page urls."""

    def test_about_page(self):
        """Test the About page."""
        response = self.testapp.get('/about')
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')

    def test_partnerships_page(self):
        """Test the Partnership page."""
        response = self.testapp.get('/partnerships')
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')

    def test_volunteer_page(self):
        """Test the Volunteer page."""
        response = self.testapp.get('/volunteer')
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')

    def test_donate_page(self):
        """Test the Donate page."""
        response = self.testapp.get('/donate')
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')

    def test_home_page(self):
        """Test the Donate page."""
        response = self.testapp.get('/')
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')

    def test_invalid_page(self):
        """Test invalid url to return 404."""
        response = self.testapp.get('/invalid', expect_errors=True)
        self.assertEqual(response.status_int, 404)
        self.assertEqual(response.content_type, 'text/plain')
