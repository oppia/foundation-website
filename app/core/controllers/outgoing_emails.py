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

"""Controllers for processing contact form submissions."""

import json

from core.controllers import base
from core.domain import email_manager
from core.utility import string_validator

import config


class ForwardToAdminEmailHandler(base.BaseHandler):
    """Forwards messages from a webform to an administrative email address."""

    @classmethod
    def write_email_subject(cls, email_type):
        """Generate a corresponding subject for the email type.

        Arguments:
            email_type: str. The type of email subject to be returned.

        Returns:
            str. The subject of the email to be sent.

        Raises:
            InvalidStringException: The provided string is invalid.
        """
        string_validator.check_string_valid(email_type)
        email_type = email_type.upper()
        if email_type not in config.EMAIL_TYPES:
            raise KeyError('Invalid email type')
        return config.EMAIL_SUBJECTS[email_type]

    @classmethod
    def write_email_contents(cls, user_comment, user_organization):
        """Compose email body with given user info.

        Arguments:
            user_comment: str. User's comment to be used as the primary email
                content.
            user_organization: str|None. User's organization name to be written
                at the top of the email body.

        Returns:
            str. Email body to be sent.

        Raises:
            InvalidStringException: The provided string is invalid.
        """
        email_contents = ''
        if user_organization is not None:
            string_validator.check_string_valid(user_organization)
            email_contents = ('Organization: %s\n' % user_organization)

        string_validator.check_string_valid(user_comment)
        email_contents += user_comment
        return email_contents

    def post(self):
        """Handle POST requests."""
        payload = json.loads(self.request.body)

        if 'email_type' not in payload:
            email_type = config.EMAIL_TYPE_DEFAULT
        else:
            email_type = payload['email_type']

        email_subject = ForwardToAdminEmailHandler.write_email_subject(
            email_type)

        if 'organization' not in payload:
            user_organization = None
        else:
            user_organization = payload['organization']
        email_contents = ForwardToAdminEmailHandler.write_email_contents(
            payload['comment'], user_organization)

        if email_type == config.EMAIL_TYPE_VOLUNTEER:
            email_manager.send_mail(
                email_subject, email_contents, payload['email'],
                config.VOLUNTEER_EMAIL_ADDRESS)
        else:
            email_manager.send_mail_to_admin(
                email_subject, email_contents, payload['email'])

        self.render_json({})
