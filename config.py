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

"""Stores configuration options and constants for Oppia Foundation page."""

SYSTEM_EMAIL_ADDRESS = 'system_email@domain.com'

ADMIN_EMAIL_ADDRESS = 'admin_email@domain.com'

# Whether to unconditionally log info messages.
DEBUG = False

# The platform for the storage backend. This is used in the model-switching
# code in core/platform.
PLATFORM = 'gae'

# The type of the response returned by a handler when an exception is raised.
HANDLER_TYPE_HTML = 'html'
HANDLER_TYPE_JSON = 'json'

# Prefix for data sent from the server to the client via JSON.
XSSI_PREFIX = ')]}\'\n'

# Type of email sent from front-end.
EMAIL_TYPE_PARTNERSHIPS = 'PARTNERSHIPS'
EMAIL_TYPE_VOLUNTEER = 'VOLUNTEER'
EMAIL_TYPE_DEFAULT = 'DEFAULT'
EMAIL_TYPES = (
    EMAIL_TYPE_PARTNERSHIPS, EMAIL_TYPE_VOLUNTEER, EMAIL_TYPE_DEFAULT,)

# Type of email subject to be used for admin email.
EMAIL_SUBJECTS = {
    EMAIL_TYPE_PARTNERSHIPS: 'Partnering with Oppia',
    EMAIL_TYPE_VOLUNTEER: 'Volunteering with Oppia',
    EMAIL_TYPE_DEFAULT: 'General question about Oppia Foundation',
}

INDEX_FILEPATH = 'static/pages/index.html'
