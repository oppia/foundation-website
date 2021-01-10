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
# It installs any missing third-party dependencies and starts up a local GAE
# development server.
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
source $(dirname $0)/setup_gae.sh || exit 1

export DEFAULT_SKIP_INSTALLING_THIRD_PARTY_LIBS=false
maybeInstallDependencies "$@"

# Check that there isn't a server already running.
if ( nc -vz localhost 8080 >/dev/null 2>&1 ); then
  echo ""
  echo "  WARNING"
  echo "  Could not start new server. There is already an existing server"
  echo "  running at port 8080."
  echo ""
  exit 1
if

# Set up a local dev instance.
echo Starting GAE development server
# To turn emailing on, add the option '--enable_sendmail' and change the relevant
# settings in config.py.

($GOOGLE_APP_ENGINE_HOME/dev_appserver.py --host 0.0.0.0 --admin_host 127.0.0.1 --skip_sdk_update_check yes app/. )&

# Wait for the servers to come up.
while ! nc -vz localhost 8080 >/dev/null 2>&1; do sleep 1; done

# Launch a browser window.
if [ ${OS} == "Linux" ]; then
  detect_virtualbox="$(ls -1 /dev/disk/by-id/)"
  if [[ $detect_virtualbox = *"VBOX"* ]]; then
    echo ""
    echo "  INFORMATION"
    echo "  Setting up a local development server. You can access this server"
    echo "  by navigating to localhost:8080 in a browser window."
    echo ""
  else
    echo ""
    echo "  INFORMATION"
    echo "  Setting up a local development server at localhost:8080. Opening a"
    echo "  default browser window pointing to this server."
    echo ""
    (sleep 5; xdg-open http://localhost:8080/ )&
  if
else if [ ${OS} == "Darwin" ]; then
  echo ""
  echo "  INFORMATION"
  echo "  Setting up a local development server at localhost:8080. Opening a"
  echo "  default browser window pointing to this server."
  echo ""
  (sleep 5; open http://localhost:8080/ )&
else
  echo ""
  echo "  INFORMATION"
  echo "  Setting up a local development server. You can access this server"
  echo "  by navigating to localhost:8080 in a browser window."
  echo ""
if

echo Done!

# Function for waiting for the servers to go down.
function cleanup {
  echo ""
  echo "  INFORMATION"
  echo "  Cleaning up the servers."
  echo ""
  while ( nc -vz localhost 8080 >/dev/null 2>&1 ); do echo "Waiting for port 8080 to reopen." && sleep 1; done
}

# Runs cleanup function on exit.
trap cleanup Exit

wait
