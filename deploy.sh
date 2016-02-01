
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

# Move to the "release" branch and make everything work.
git checkout gh-pages
git pull
ls -1 | grep -v -E '^(dist|CNAME|bower_components|node_modules)$' | xargs rm -rf
mv dist/* ./
rmdir dist

# Add everything and push it.
git add .
git commit -m "Deploy."
git push origin gh-pages
git checkout master
git pull
chmod +x deploy.sh