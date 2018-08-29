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

"""Controller for encoding JSON with safe HTML codes."""

import json


class JSONEncoderForHTML(json.JSONEncoder):
    """Encodes JSON that is safe to embed in HTML."""

    def encode(self, o):
        """Encode given JSON with safe HTML codes."""
        chunks = self.iterencode(o, True)
        return ''.join(chunks) if self.ensure_ascii else u''.join(chunks)

    def iterencode(self, o, _one_shot=False):
        """Replace '&', '<' or '>' symbol with corresponding HTML code."""
        chunks = super(
            JSONEncoderForHTML, self).iterencode(o, _one_shot=_one_shot)
        for chunk in chunks:
            yield chunk.replace('&', '\\u0026').replace(
                '<', '\\u003c').replace('>', '\\u003e')
