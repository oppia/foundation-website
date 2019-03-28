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

"""Test for sending email to admin."""

import config

from core.tests import app_engine_test_base
from core.domain import email_manager


class SendEmailToAdminTest(app_engine_test_base.GenericTestBase):
    """Test for email to be sent to admin email address."""

    def test_send_mail_to_admin(self):
        """Test send_mail_to_admin sends mail to admin email address."""
        user_email = 'user1@example.com'

        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(0, len(messages))
        email_manager.send_mail_to_admin(
            'subject', 'content', user_email)
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(1, len(messages))
