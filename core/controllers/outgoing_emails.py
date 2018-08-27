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

import email_manager
import feconf
import webapp2


class ThankYouMailHandler(webapp2.RequestHandler):
    """Handler for sending thank you emails."""
    def get(self, user_full_name, user_email):
        email_manager.send_thank_you_email(user_full_name, user_email)
        self.response.content_type = 'text/plain'
        self.response.write('Sending Thank you email.')
