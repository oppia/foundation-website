# Copyright 2018 The Oppia Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Controllers for simple, mostly-static pages (like About, Volunteer, etc.).
"""

from google.appengine.ext.webapp import template

import config
from core.controllers import base

class BasePageHandler(base.BaseHandler):
    """Handler for page request."""

    def get(self):
        """Handles GET requests."""
        self.response.out.write(template.render(config.INDEX_FILEPATH, {}))
