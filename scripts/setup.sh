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
# Bash execution environment set up for all scripts.

if [ "$SETUP_DONE" ]; then
  echo 'Environment setup completed.'
  return 0
fi

if [ -z "$BASH_VERSION" ]
then
  echo ""
  echo "  Please run me using bash: "
  echo ""
  echo "    bash scripts/$0"
  echo ""
  return 1
fi

EXPECTED_PWD='foundation-website'
# The second option allows this script to also be run from deployment folders.
if [[ ${PWD##*/} != $EXPECTED_PWD ]]; then
  echo ""
  echo "  WARNING   This script should be run from the foundation-website/root folder."
  echo ""
  return 1
fi

source scripts/setup_util.sh || exit 1

export FOUNDATION_DIR=`pwd`
export APP_DIR=$FOUNDATION_DIR/app
export COMMON_DIR=$(cd $FOUNDATION_DIR/..; pwd)
export TOOLS_DIR=$COMMON_DIR/oppia_tools
export THIRD_PARTY_DIR=$FOUNDATION_DIR/third_party
export NODE_MODULE_DIR=$FOUNDATION_DIR/node_modules

export MACHINE_TYPE=`uname -m`
export OS=`uname`
export ME=$(whoami)

mkdir -p $TOOLS_DIR
mkdir -p $THIRD_PARTY_DIR/js
mkdir -p $THIRD_PARTY_DIR/css

# First, check the default Python command (which should be found within the user's $PATH).
PYTHON_CMD="python"
# Test whether the 'python' or 'python2.7' commands exist and finally fails when
# no suitable python version 2.7 can be found.
if ! test_python_version $PYTHON_CMD; then
  echo "Unable to find 'python'. Trying python2.7 instead..."
  PYTHON_CMD="python2.7"
  if ! test_python_version $PYTHON_CMD; then
    echo "Could not find a suitable Python environment. Exiting."
    # If OS is Windows, print helpful error message about adding Python to path.
    if [ ! "${OS}" == "Darwin" -a ! "${OS}" == "Linux" ]; then
        echo "It looks like you are using Windows. If you have Python installed,"
        echo "make sure it is in your PATH and that PYTHONPATH is set."
        echo "If you have two versions of Python (ie, Python 2.7 and 3), specify 2.7 before other versions of Python when setting the PATH."
        echo "Here are some helpful articles:"
        echo "http://docs.python-guide.org/en/latest/starting/install/win/"
        echo "https://stackoverflow.com/questions/3701646/how-to-add-to-the-pythonpath-in-windows-7"
    fi
    # Exit when no suitable Python environment can be found.
    return 1
  fi
fi

export PYTHON_CMD

# This should be placed at the very end of the setup script.
export SETUP_DONE=true
