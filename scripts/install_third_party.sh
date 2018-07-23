#!/usr/bin/env bash

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

set -e
source $(dirname $0)/setup.sh || exit 1

# Download and install required JS and zip files.
echo "Installing third-party JS libraries and zip files."

if [ ! -f $THIRD_PARTY_DIR/css/devices.min.css ]; then
    echo "Downloading devices.css"
    curl -o $THIRD_PARTY_DIR/css/devices.min.css https://raw.githubusercontent.com/picturepan2/devices.css/master/dist/devices.min.css
fi
