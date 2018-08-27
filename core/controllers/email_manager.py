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

"""Config properties and functions for managing email notifications."""

import feconf
from platform import gae_email_services


def send_thank_you_email(full_name, user_email):
  """Send a thank-you email after user fills out the "Contact us" form.
  
  Arguments:
    full_name: str. Full name of user.
    user_email: str. User's email to reply to.
  """
  email_subject = 'Thank you for reaching out to the Oppia Foundation!'
  email_body_text = (
        'Hi %s \n'
        'Thank you for taking the time to reach out to us.'
        'We are incredibly grateful for all of our partners joining us on '
        'our journey. We will get back to your email as soon as possible!\n'
        'Thanks, and happy learning!\n'
        'Regards,\n'
        'The Oppia Team')
  gae_email_services.send_mail(
    feconf.ADMIN_EMAIL_ADDRESS, user_email, email_subject,
    email_body_text %(full_name))
