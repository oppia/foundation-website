# Copyright 2019 The Oppia Authors. All Rights Reserved.
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

"""Config functions for managing email notifications."""

import config
from core.platform import gae_email_services


def send_mail(email_subject, email_body, reply_to_email, recipient_email):
    """Send an email to the given email address.

    Args:
        email_subject: str. Subject of the email.
        email_body: str. Body (message) of the email.
        reply_to_email: str. The email address that the admin will be replying
            to.
        recipient_email: str. The recipient email address.
    """
    gae_email_services.send_mail(
        config.SYSTEM_EMAIL_ADDRESS, reply_to_email, recipient_email,
        email_subject, email_body)


def send_mail_to_admin(email_subject, email_body, reply_to_email):
    """Send an email to the admin email address.

    Args:
        email_subject: str. Subject of the email.
        email_body: str. Body (message) of the email.
        reply_to_email: str. The email address that the admin will be replying
            to.
    """
    send_mail(
        email_subject, email_body, reply_to_email, config.ADMIN_EMAIL_ADDRESS)
