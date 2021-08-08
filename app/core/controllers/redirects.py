# Copyright 2021 The Oppia Authors. All Rights Reserved.
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

"""Controller for processing redirects to the main site."""

from core.controllers import base

MAIN_WEBSITE_URL = 'https://www.oppia.org/'
PAGE_NAME_MAPPING = {
    'about-oppia': 'about',
    'about': 'about_foundation',
    'partnerships': 'partnerships',
    'volunteer': 'volunteer',
    'donate': 'donate'
}

class RedirectHandler(base.BaseHandler):
    """Handler for redirecting requests to oppia's main site."""

    def get(self, page_name):
        # If the page_name doesn't exist on the main site, it will give a
        # "page not found" on the main website itself.
        page_name = PAGE_NAME_MAPPING.get(page_name, page_name)
        self.redirect(MAIN_WEBSITE_URL + page_name)


class HomePageRedirectHandler(base.BaseHandler):
    """Handler for redirecting home page requests to oppia's main site."""

    def get(self):
        self.redirect(MAIN_WEBSITE_URL)
