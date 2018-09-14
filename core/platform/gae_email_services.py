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

"""Provides email services."""

from google.appengine.api import mail


def send_mail(
        sender_email, reply_to_email, recipient_email, subject, plaintext_body):
    """Send an email using App Engine's Mail API.

    Arguments:
        sender_email: str. The email address of the sender. This should be in
            the form 'SENDER NAME <SENDER_EMAIL_ADDRESS>.
        recipient_email: str. The email address of the recipient.
        reply_to_email: str. The email address that the admin can reply to
            directly.
        subject: str. The subject of the email.
        plaintext_body: str. The text content of the email.

    Raises:
        ValueError: If 'sender_email', 'reply_to_email' or 'recipient_email' is
            invalid, according to App Engine.
    """
    if not mail.is_email_valid(sender_email):
        raise ValueError('Malformed sender email address: %s' % sender_email)
    if not mail.is_email_valid(reply_to_email):
        raise ValueError(
            'Malformed reply-to email address: %s' % reply_to_email)
    if not mail.is_email_valid(recipient_email):
        raise ValueError(
            'Malformed recipient email address: %s' % recipient_email)
    message = mail.EmailMessage(
        sender=sender_email, reply_to=reply_to_email, to=recipient_email,
        subject=subject, body=plaintext_body)
    message.send()
