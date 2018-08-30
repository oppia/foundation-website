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

"""Tests for processing contact form submissions. """

from core.tests import app_engine_test_base
from core.controllers import outgoing_emails
from core.utility import string_validator

import config
import main


FORWARD_EMAIL_HANDLER = outgoing_emails.ForwardToAdminEmailHandler()

class WritingEmaillUtilitiesTests(app_engine_test_base.GenericTestBase):
    """Test for utility functions to write an email."""

    def test_write_email_subject(self):
        """Test write_email_subject returns the correct email subject."""
        partnerships_type = 'Partnerships'
        self.assertEqual(
            FORWARD_EMAIL_HANDLER.write_email_subject(partnerships_type),
            'Partnering with Oppia')

        volunteer_type = 'VoLuNTEEr'
        self.assertEqual(
            FORWARD_EMAIL_HANDLER.write_email_subject(volunteer_type),
            'Volunteering with Oppia')

        bad_type = None
        with self.assertRaisesRegexp(
            string_validator.InvalidStringException,
            'None string type for %s.' % bad_type):
            FORWARD_EMAIL_HANDLER.write_email_subject(bad_type)

        non_existent_email_type = 'Non-existent type'
        with self.assertRaisesRegexp(KeyError, 'Invalid email type'):
            FORWARD_EMAIL_HANDLER.write_email_subject(non_existent_email_type)


    def test_write_email_contents(self):
        """Test write_email_contents composes the email body completely."""
        user_organization = 'Non-profit Organization 1'
        user_comment = 'Looking to get more info about Oppia!'
        email_content = ''

        self.assertEqual(email_content, '')
        email_content = FORWARD_EMAIL_HANDLER.write_email_contents(
            user_organization, user_comment)
        self.assertIn(user_organization, email_content)
        self.assertIn(user_comment, email_content)

class ForwardEmailToAdminHandlerTests(app_engine_test_base.GenericTestBase):
    """Backend integration tests for forwarding email to admin email address."""

    def test_get_500_errors_from_missing_fields(self):
        """Expect missing required fields to return 500s."""
        bad_form_contents = {
            'comment' : 'Hi!',
        }
        response = self.testapp.post(
            main.MAIL_HANDLER_URL, bad_form_contents, expect_errors=True)
        self.assertIn(response.status_int, [500], msg=main.MAIL_HANDLER_URL)

        bad_form_contents = {
            'email' : 'user1@domain.com',
        }
        response = self.testapp.post(
            main.MAIL_HANDLER_URL, bad_form_contents, expect_errors=True)
        self.assertIn(response.status_int, [500], msg=main.MAIL_HANDLER_URL)

        # Test for invalid email type.
        bad_form_contents = {
            'email_type': 'Invalid',
            'email': 'user1@example.com',
            'comment': 'We are looking for partners.',
        }
        response = self.testapp.post(
            main.MAIL_HANDLER_URL, bad_form_contents, expect_errors=True)
        self.assertIn(response.status_int, [500], msg=main.MAIL_HANDLER_URL)

    def test_email_is_forwarded(self):
        """Test email is sent to admin email address."""
        # NOTE: 'email' and 'comment' are required fields provided by front-end.
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)

        form_contents = {
            'email': 'user1@example.com',
            'comment': 'We are looking for partners.'
        }

        self.assertEqual(0, len(messages))
        self.testapp.post_json(main.MAIL_HANDLER_URL, form_contents)
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(1, len(messages))

        form_contents = {
            'email_type' : config.EMAIL_TYPE_VOLUNTEER,
            'email': 'user1@example.com',
            'comment': 'We are looking for partners.'
        }

        self.assertEqual(1, len(messages))
        self.testapp.post_json(main.MAIL_HANDLER_URL, form_contents)
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(2, len(messages))

        form_contents = {
            'email_type' : config.EMAIL_TYPE_PARTNERSHIPS,
            'organization': 'Non-profit organization 1',
            'email': 'user1@example.com',
            'comment': 'We are looking for partners.'
        }

        self.assertEqual(2, len(messages))
        self.testapp.post_json(main.MAIL_HANDLER_URL, form_contents)
        messages = self.mail_stub.get_sent_messages(
            to=config.ADMIN_EMAIL_ADDRESS)
        self.assertEqual(3, len(messages))
