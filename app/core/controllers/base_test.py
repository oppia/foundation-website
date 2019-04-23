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

"""Tests for generic controller behavior."""

from core.tests import app_engine_test_base

import config
import main


class BaseHandlerTest(app_engine_test_base.GenericTestBase):
    """Backend integration tests for generic controller."""

    def test_handle_exception_sends_email_to_admin(self):
        """Test handle_exception logs 500s and sends out email."""
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)

        self.testapp.post(main.MAIL_HANDLER_URL, params='', expect_errors=True)
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(1, len(messages))
        self.assertIn(
            'ValueError: No JSON object could be decoded',
            messages[0].body.decode())
