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

from core.domains import email_manager
from core import feconf
import json
import webapp2


class AdminNotificationEmailHandler(webapp2.RequestHandler):
    """Handler for sending notification email to admin email address after
        user submits Contact us's form."""
    def post(self):
        """Handles POST requests."""
        data = self.request.body
        email_contents = json.loads(data)
        email_subject = 'Oppia Foundation Website - Notification email'
        email_manager.send_mail_to_admin(email_subject, email_contents)
        self.response.content_type = 'text/plain'
        self.response.write('Sending notification email.')
        
