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

"""Controllers for sending outgoing emails."""

from core.controllers import base
from core.domains import email_manager
import json


def write_email_contents(user_organization, user_comment):
    """Compose email body with given user info.

    Arguments:
        user_organization: str. User's organization name to be written at the
            top of the email body.
        user_comment: str. User's comment to be used as the primary email
            content.

    Returns:
        str. Email body to be sent.
    """

    email_contents = ('Organization: %s\n' % user_organization)
    email_contents += user_comment
    return email_contents


def write_email_subject(user_email_address):
    """Append user email to the email subject.

    Arguments:
        user_email_address: str. User's email address to be included in the
            subject.

    Returns:
        str. The subject of the email to be sent.
    """

    return (
        'Oppia Foundation Website - Email forwarded from %s'
        % user_email_address)


class ForwardToAdminEmailHandler(base.BaseHandler):
    """Handler for forwarding email to admin email address after
        user submits Contact us form."""

    def post(self):
        """Handles POST requests."""
        payload = json.loads(self.request.body)

        user_email_address = payload['email']

        email_subject = write_email_subject(user_email_address)
        email_contents = write_email_contents(
            payload['organization'], payload['comment'])

        email_manager.send_mail_to_admin(
            email_subject, email_contents, user_email_address)

        self.render_json({})
