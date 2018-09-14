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

"""Base handlers."""

import json
import webapp2

from google.appengine.ext.webapp import template

import config
from core.controllers import custom_json_encoder


class BaseHandler(webapp2.RequestHandler):
    """Base class for all handlers."""

    def render_json(self, values):
        """Prepares JSON response to be sent to the client.

        Args:
            values: dict. The key-value pairs to encode in the JSON response.
        """
        self.response.content_type = 'application/json; charset=utf-8'
        self.response.headers['Content-Disposition'] = (
            'attachment; filename="oppia-attachment.txt"')
        self.response.headers['Strict-Transport-Security'] = (
            'max-age=31536000; includeSubDomains')
        self.response.headers['X-Content-Type-Options'] = 'nosniff'
        self.response.headers['X-Xss-Protection'] = '1; mode=block'

        json_output = json.dumps(
            values, cls=custom_json_encoder.JSONEncoderForHTML)
        self.response.write('%s%s' % (config.XSSI_PREFIX, json_output))

    def render_templates(self, filepath):
        """Prepare an HTML response to be sent to the client.

        Args:
            filepath: str. The template filepath.
        """

        self.response.cache_control.no_cache = True
        self.response.cache_control.must_revalidate = True
        self.response.headers['Strict-Transport-Security'] = (
            'max-age=31536000; includeSubDomains')
        self.response.headers['X-Content-Type-Options'] = 'nosniff'
        self.response.headers['X-Xss-Protection'] = '1; mode=block'
        self.response.expires = 'Mon, 01 Jan 1990 00:00:00 GMT'
        self.response.pragma = 'no-cache'
        self.response.out.write(template.render(filepath, {}))
