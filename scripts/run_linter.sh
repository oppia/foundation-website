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

# Usage:
#
#     bash scripts/run_linter.sh

source $(dirname $0)/setup.sh
set -e

echo Checking if pylint is installed in $TOOLS_DIR
if [ ! -d "$TOOLS_DIR/pylint-1.9.3" ]; then
  echo Installing Pylint

  pip install pylint==1.9.3 --target="$TOOLS_DIR/pylint-1.9.3"
  # Add __init__.py file so that pylint dependency backports are resolved
  # correctly.
  touch $TOOLS_DIR/pylint-1.9.3/backports/__init__.py
fi

echo Checking if pylint_runner is installed in $TOOLS_DIR
if [ ! -d "$TOOLS_DIR/pylint-runner-0.5.4" ]; then
  echo Installing Pylint_runner

  pip install pylint_runner==0.5.4 --target="$TOOLS_DIR/pylint-runner-0.5.4"
  touch $TOOLS_DIR/pylint-runner-0.5.4/__init__.py
fi

echo Checking if pydocstyle is installed in $TOOLS_DIR
if [ ! -d "$TOOLS_DIR/pydocstyle-2.1.1" ]; then
  echo Installing Pydocstyle

  pip install pydocstyle==2.1.1 --target="$TOOLS_DIR/pydocstyle-2.1.1"
fi

# Install pycodestyle.
echo Checking if pycodestyle is installed in third_party
if [ ! -d "$TOOLS_DIR/pycodestyle-2.4.0" ]; then
  echo Installing Pycodestyle
    
  pip install pycodestyle==2.4.0 --target="$TOOLS_DIR/pycodestyle-2.4.0"
fi

$TOOLS_DIR/pylint-runner-0.5.4/bin/pylint_runner -v || exit 1

$TOOLS_DIR/pydocstyle-2.1.1/bin/pydocstyle -v || exit 1

$TOOLS_DIR/pycodestyle-2.4.0/bin/pycodestyle -v || exit 1
