# coding: utf-8
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

"""Utilities for validating string type."""


class InvalidStringException(Exception):
    """The specified string is invalid."""

    pass


def invalid_string_reason(string):
    """Determine the reason why a string is invalid.

    Accepts US-ASCII string or a Unicode string.

    Args:
        string: str. The string to check.

    Returns:
        str|None. A string that indicates the reason why the input string is
            invalid; otherwise returns `None`.
    """
    if string is None:
        return 'None string type for %s.' % string

    if not isinstance(string, basestring):
        return 'Invalid string type for %s.' % string
    stripped_string = string.strip()
    if not stripped_string:
        return 'String is empty.'
    return None


def is_string_valid(string):
    """Determine whether the specified a string is valid.

    Arguments:
        string: str. The string to be validated.

    Returns:
        bool. `True` if the specified string is valid; otherwise returns
            `False`.
    """
    return invalid_string_reason(string) is None


def check_string_valid(string):
    """Verify whether a string is valid.

    Arguments:
        string: str. The string to check.

    Raises:
        InvalidStringException: Specified string is invalid.
    """
    reason = invalid_string_reason(string)

    if reason is not None:
        raise InvalidStringException(reason)
