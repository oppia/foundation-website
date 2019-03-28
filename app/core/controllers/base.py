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
import logging
import sys
import traceback
import config
import webapp2

from core.controllers import custom_json_encoder
from core.domain import email_manager


class BaseHandler(webapp2.RequestHandler):
    """Base class for all handlers."""

    def handle_exception(self, exception, unused_debug_mode):
        """Overwrite the default exception handler.

        Args:
            exception: Exception. The exception that was thrown.
            unused_debug_mode: bool. True if the web application is running
                in debug mode.
        """
        email_subject = 'Oppia Foundation website exception stacktrace'
        stacktrace_contents = ''.join(
            traceback.format_exception(*sys.exc_info()))
        logging.info(stacktrace_contents)
        logging.error('Exception raised: %s', exception)
        email_manager.send_mail_to_admin(
            email_subject, stacktrace_contents, config.NO_REPLY_EMAIL_ADDRESS)
        self.error(500)

    def render_json(self, values):
        """Prepare JSON response to be sent to the client.

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
