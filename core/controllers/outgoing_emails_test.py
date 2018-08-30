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

"""Tests for sending outgoing mails. """

from core.controllers import outgoing_emails
from core.tests import app_engine_test_base
import config
import main

class OutgoingEmaillUtilitiesTests(app_engine_test_base.GenericTestBase):
    """Test for sending an email with the content from Contact Us form."""

    def test_write_email_subject(self):
        user_email = 'user1@mail.com'
        email_subject = ''

        self.assertEqual(email_subject, '')
        email_subject = outgoing_emails.write_email_subject(user_email)
        self.assertEqual(
            email_subject, 'Oppia Foundation Website - Email forwarded from %s'
            % user_email)

    def test_write_email_contents(self):
        user_organization = 'Non-profit Organization 1'
        user_comment = 'Looking to get more info about Oppia!'
        email_content = ''

        self.assertEqual(email_content, '')
        email_content = outgoing_emails.write_email_contents(
            user_organization, user_comment)
        self.assertIn(user_organization, email_content)
        self.assertIn(user_comment, email_content)

class ForwardEmailToAdminHandlerTests(app_engine_test_base.GenericTestBase):
    """Backend integration tests for forwarding email to admin email address."""

    def test_email_is_forwarded(self):
        form_contents = {
            'email': 'user1@example.com',
            'organization': 'Non-profit organization 1',
            'comment': 'We are looking for partners.'
        }
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)

        self.assertEqual(0, len(messages))
        self.testapp.post_json(main.MAIL_HANDLER_URL, form_contents)
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(1, len(messages))
