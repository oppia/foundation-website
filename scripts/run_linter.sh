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

source $(dirname $0)/setup.sh || exit 1
source $(dirname $0)/setup_util.sh || exit 1
if [ "$TRAVIS" == 'true' ]; then
  pip install -r ci-linter-requirements.txt
  export TRAVIS_PYDOCSTYLE = pydocstyle
  export TRAVIS_PYCODESTYLE = pycodestyle
  export TRAVIS_PYLINT_RUNNER = pylint_runner
fi

if [ "$CI" == 'true' ]; then
  pip install -r ci-linter-requirements.txt --user
fi

set -e

export DEFAULT_SKIP_INSTALLING_THIRD_PARTY_LIBS=false
maybeInstallDependencies "$@"

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
  curl -o pydocstyle-2.1.1.tar.gz -L https://files.pythonhosted.org/packages/ca/af/dbd99adec5704de451ae56d08024d7416dead997dedbd6be72cbc86efb08/pydocstyle-2.1.1.tar.gz
  tar xzf pydocstyle-2.1.1.tar.gz -C $TOOLS_DIR
  rm pydocstyle-2.1.1.tar.gz
fi

# Install pycodestyle.
echo Checking if pycodestyle is installed in third_party
if [ ! -d "$TOOLS_DIR/pycodestyle-2.3.1" ]; then
  echo Installing Pycodestyle

  curl -o pycodestyle-2.3.1.tar.gz -L https://pypi.python.org/packages/e1/88/0e2cbf412bd849ea6f1af1f97882add46a374f4ba1d2aea39353609150ad/pycodestyle-2.3.1.tar.gz
  tar xzf pycodestyle-2.3.1.tar.gz -C $TOOLS_DIR
  rm pycodestyle-2.3.1.tar.gz
fi

export PYDOCSTYLE_MATCH_DIR_ARG="^(?!oppia_tools|\.vscode).*"
export PYCODESTYLE_EXCLUDE_ARG=./node_modules,.git,./.vscode,./.circleci,./oppia_tools,./third_party

if [ "$TRAVIS" == 'true' ]; then
  $PYTHON_CMD $TOOLS_DIR/pydocstyle-2.1.1/src/pydocstyle/__main__.py --match-dir=$PYDOCSTYLE_MATCH_DIR_ARG -v || exit 1
  $TRAVIS_PYCODESTYLE -v --exclude=$PYCODESTYLE_EXCLUDE_ARG || exit 1
  $TRAVIS_PYLINT_RUNNER -v || exit 1
else
  # These commands might not work cross-platform.
  $PYTHON_CMD $TOOLS_DIR/pydocstyle-2.1.1/src/pydocstyle/__main__.py --match-dir=$PYDOCSTYLE_MATCH_DIR_ARG -v || exit 1
  $PYTHON_CMD $TOOLS_DIR/pycodestyle-2.3.1/pycodestyle.py -v --exclude=$PYCODESTYLE_EXCLUDE_ARG || exit 1
  $PYTHON_CMD $TOOLS_DIR/pylint-runner-0.5.4/pylint_runner/main.py -v || exit 1
fi

# Install third-party node modules for linting after checking for existing
# installation.
source $(dirname $0)/setup_node_modules_util.sh

export CSS_STYLESHEET=$APP_DIR/static/assets/css/stylesheet.css
if [ ! -f $CSS_STYLESHEET ]; then
  echo "stylesheet.css does not exist!"
  exit 1
fi

echo Running stylelint on all CSS files
$NODE_MODULE_DIR/stylelint/bin/stylelint.js $CSS_STYLESHEET --config=$FOUNDATION_DIR/.stylelintrc --formatter verbose || exit 1

echo Running stylelint on all HTML files
$NODE_MODULE_DIR/stylelint/bin/stylelint.js "app/static/pages/**/*.html" --config=$FOUNDATION_DIR/.stylelintrc --formatter verbose || exit 1

echo Running htmllint on HTML files
find $APP_DIR -name '*.html'
$NODE_MODULE_DIR/htmllint-cli/bin/cli.js --rc=$FOUNDATION_DIR/.htmllintrc $(find $APP_DIR -name '*.html') || exit 1
