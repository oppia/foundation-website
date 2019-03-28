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

"""Tests for the GAE mail API wrapper."""

import config

from core.tests import app_engine_test_base
from core.platform import gae_email_services


class EmailTests(app_engine_test_base.GenericTestBase):
    """Tests for sending emails."""

    def test_unable_to_send_mail(self):
        """Test send_mail raises exceptions with invalid email addresses."""
        user_email = 'user1@domain.com'

        bad_sender_email = 42
        with self.assertRaisesRegexp(
            ValueError, 'Malformed sender email address: %s'
            % bad_sender_email):
            gae_email_services.send_mail(
                bad_sender_email, user_email, config.ADMIN_EMAIL_ADDRESS,
                'subject', 'body')

        bad_reply_email = ' '
        with self.assertRaisesRegexp(
            ValueError, 'Malformed reply-to email address: %s'
            % bad_reply_email):
            gae_email_services.send_mail(
                config.SYSTEM_EMAIL_ADDRESS, bad_reply_email,
                config.ADMIN_EMAIL_ADDRESS, 'subject', 'body')

        bad_recipient_email = None
        with self.assertRaisesRegexp(
            ValueError, 'Malformed recipient email address: %s'
            % bad_recipient_email):
            gae_email_services.send_mail(
                config.SYSTEM_EMAIL_ADDRESS, user_email, bad_recipient_email,
                'subject', 'body')

    def test_send_mail(self):
        """Test send_mail to send email out successfully."""
        user_email = 'user1@domain.com'
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(0, len(messages))
        gae_email_services.send_mail(
            config.SYSTEM_EMAIL_ADDRESS, user_email, config.ADMIN_EMAIL_ADDRESS,
            'subject', 'body')
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(1, len(messages))
