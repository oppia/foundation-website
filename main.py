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

"""URL routing definitions."""

import webapp2

import config
from core.controllers import outgoing_emails
from core.controllers import pages

ABOUT_URL = '/about'
PARTNERSHIPS_URL = '/partnerships'
VOLUNTEER_URL = '/volunteer'
DONATE_URL = '/donate'
MAIL_HANDLER_URL = '/ajax/mailhandler'
URLS = [
    (MAIL_HANDLER_URL, outgoing_emails.ForwardToAdminEmailHandler),
    (ABOUT_URL, pages.BasePageHandler),
    (PARTNERSHIPS_URL, pages.BasePageHandler),
    (DONATE_URL, pages.BasePageHandler),
    (VOLUNTEER_URL, pages.BasePageHandler),
    ('/', pages.BasePageHandler),
]

APP = webapp2.WSGIApplication(URLS, debug=config.DEBUG)
