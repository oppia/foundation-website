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

# This file should not be invoked directly, but sourced from other sh scripts.
# Utilities for setup scripts.

# This function takes a command for python as its only input.
# It checks this input for a specific version of python and returns false
# if it does not match the expected prefix.
function test_python_version() {
  EXPECTED_PYTHON_VERSION_PREFIX="2.7"
  PYTHON_VERSION=$($1 --version 2>&1)
  if [[ $PYTHON_VERSION =~ Python[[:space:]](.+) ]]; then
    PYTHON_VERSION=${BASH_REMATCH[1]}
  else
    echo "Unrecognizable Python command output: ${PYTHON_VERSION}"
    # Return a false condition if output of tested command is unrecognizable.
    return 1
  fi
  if [[ "${PYTHON_VERSION}" = ${EXPECTED_PYTHON_VERSION_PREFIX}* ]]; then
    # Return 0 to indicate a successful match.
    # Return 1 to indicate a failed match.
    return 0
  else
    return 1
  fi
}

function maybeInstallDependencies {
  # Parse additional command line arguments.
  # Credit: https://stackoverflow.com/questions/192249
  export SKIP_INSTALLING_THIRD_PARTY_LIBS=$DEFAULT_SKIP_INSTALLING_THIRD_PARTY_LIBS
  for i in "$@"; do
    # Match each space-separated argument passed to the shell file to a separate
    # case label, based on a pattern. E.g. Match to --skip-install=*, where the
    # asterisk refers to any characters following the equals sign, other than
    # whitespace.
    case $i in
      --skip-install=*)
      # Extract the value right of the equal sign by substringing the $i
      # variable at the equal sign.
      # http://tldp.org/LDP/abs/html/string-manipulation.html
      SKIP_INSTALLING_THIRD_PARTY_LIBS="${i#*=}"
      # Shifts the argument parameters over by one. E.g. $2 becomes $1, etc.
      shift
      ;;
    esac
  done

  if [ "$SKIP_INSTALLING_THIRD_PARTY_LIBS" = "false" ]; then
    # Install third party dependencies
    bash scripts/install_third_party.sh
  fi
}
