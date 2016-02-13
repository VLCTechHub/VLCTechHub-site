
#!/usr/bin/env bash

# Make sure we're in a good state.
git checkout master
git pull
rm -rf dist
ember build --environment production

if [ "$?" -ne "0" ]
then
	echo "Could not build ember project. Aborting..."
	exit 1
fi

cp dist/index.html dist/200.html
surge ./dist

