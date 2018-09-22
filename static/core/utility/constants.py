# coding: utf-8
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


"""Loads constants for backend use."""

import json
import os


CONSTANTS_JS_FILEPATH = os.path.join('static', 'assets', 'constants.js')


def parse_json_from_js(js_file):
    """Extract JSON object from JS file.

    Args:
        js_file: file. A stream representing the constants.js file.

    Returns:
        dict(str, str). A dict mapping constant names to their values.
    """
    text = js_file.read()
    first_bracket_index = text.find('= {')
    last_bracket_index = text.rfind('}')
    json_text = text[first_bracket_index + 2:last_bracket_index + 1]
    return json.loads(json_text)


class Constants(dict):
    """Transform dict to object, attributes can be accessed by dot notation."""

    __getattr__ = dict.__getitem__


with open(CONSTANTS_JS_FILEPATH, 'r') as f:
    CONSTANTS = Constants(parse_json_from_js(f))
