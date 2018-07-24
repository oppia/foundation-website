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

##########################################################################

# INSTRUCTIONS:
#
# This script starts up a development server running Oppia's Foundation Website. 
# It starts up a local Python SimplyHTTPServer.
#
# Run the script from the foundation-website root folder:
#
#   bash scripts/start.sh
#
# Note that the root folder MUST be named 'foundation-website'.

if [ -z "$BASH_VERSION" ]
then
  echo ""
  echo "  Please run me using bash: "
  echo ""
  echo "     bash $0"
  echo ""
  exit 1
fi

set -e
source $(dirname $0)/setup.sh || exit 1

# Install third party dependencies.
bash scripts/install_third_party.sh

# Check that there isn't a server already running.
if ( nc -vz localhost 8181 >/dev/null 2>&1 ); then
  echo ""
  echo "  WARNING"
  echo "  Could not start new server. There is already an existing server"
  echo "  running at port 8181."
  echo ""
  exit 1
fi

# Launch a browser window.
if [ ${OS} == "Linux" ]; then
  echo ""
  echo "  INFORMATION"
  echo "  Setting up a local development server at localhost:8181. Opening a"
  echo "  default browser window pointing to this server."
  echo ""
  (sleep 5; xdg-open http://localhost:8181/ )&
elif [ ${OS} == "Darwin" ]; then
  echo ""
  echo "  INFORMATION"
  echo "  Setting up a local development server at localhost:8181. Opening a"
  echo "  default browser window pointing to this server."
  echo ""
  (sleep 5; open http://localhost:8181/ )&
else
  echo ""
  echo "  INFORMATION"
  echo "  Setting up a local development server. You can access this server"
  echo "  by navigating to localhost:8181 in a browser window."
  echo ""
fi

echo Starting SimpleHTTPServer at port 8181
$PYTHON_CMD $FOUNDATION_DIR/scripts/serve.py 8181

echo Done!
