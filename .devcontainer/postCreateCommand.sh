#!/bin/sh

# Select a package that is suitable for your environment from <https://github.com/supabase/cli/releases>
SUPABASECLI_VERSION="1.42.5"
SUPABASECLI_ARCHITECTURE="amd64" # amd64 or arm64
SUPABASECLI_FILENAME="supabase_${SUPABASECLI_VERSION}_linux_${SUPABASECLI_ARCHITECTURE}.deb"

set -ex

# Install Supabase CLI
curl -LO https://github.com/supabase/cli/releases/download/v$SUPABASECLI_VERSION/$SUPABASECLI_FILENAME
sudo dpkg -i ./$SUPABASECLI_FILENAME
rm -rf $SUPABASECLI_FILENAME

# See: https://code.visualstudio.com/remote/advancedcontainers/improve-performance#_use-a-targeted-named-volume
sudo chown node node_modules
