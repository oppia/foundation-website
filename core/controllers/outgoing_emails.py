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

"Controllers for processing contact form submissions."

import json

from core.controllers import base
from core.domain import email_manager
from core.utility import string_validator
import config

@staticmethod
def write_email_contents(user_comment, user_organization):
    """Compose email body with given user info.

    Arguments:
        user_comment: str. User's comment to be used as the primary email
            content.
        user_organization: str|None. User's organization name to be written at
            the top of the email body.

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


@staticmethod
def write_email_subject(subject_type):
    """Append user email to the email subject.

    Arguments:
        subject_type: str. The type of email subject to be returned.

    Returns:
        str. The subject of the email to be sent.

    Raises:
        InvalidStringException: The provided string is invalid.
    """
    string_validator.check_string_valid(subject_type)
    subject_type = subject_type.upper()
    email_subject = ''

    if subject_type == config.PARTNERSHIPS_TYPE:
        email_subject = 'Partnering with Oppia'
    elif subject_type == config.VOLUNTEER_TYPE:
        email_subject = 'Volunteering with Oppia'
    elif subject_type == config.DEFAULT_TYPE:
        email_subject = 'General question about Oppia Foundation'
    else:
        raise KeyError('Invalid subject type')
    return email_subject


class ForwardToAdminEmailHandler(base.BaseHandler):
    """Handler for forwarding email to admin email address after
        user submits Contact us form."""

    def post(self):
        """Handles POST requests."""
        payload = json.loads(self.request.body)

        if 'page' not in payload:
            subject_type = config.DEFAULT_TYPE
        else:
            subject_type = payload['page']
        # __func__ exposes the function as a read-only attribute/property.
        # https://bugs.python.org/issue5982
        email_subject = write_email_subject.__func__(subject_type)

        if 'organization' not in payload:
            user_organization = None
        else:
            user_organization = payload['organization']
        email_contents = write_email_contents.__func__(
            payload['comment'], user_organization)

        email_manager.send_mail_to_admin(
            email_subject, email_contents, payload['email'])

        self.render_json({})
