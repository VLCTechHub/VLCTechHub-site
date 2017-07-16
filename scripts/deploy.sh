#!/usr/bin/env bash

function build {
	git checkout master
	git pull origin master
	rm -rf dist
	ember build --environment production
	# Make sure we're in a good state.
	[ "$?" -ne "0" ] && echo "ERROR: Could not build ember project. Aborting..." && exit 1
}

function tag {
	ember release --local false --yes true
}

function publish {
	echo 'Publishing...'
	cp dist/index.html dist/200.html
	surge ./dist
}

function version_published () {
	git tag --sort=-v:refname | head  -n 1
}

function say_in_slack {
	if [ -z "$SLACK_WEBHOOK" ]; then
		 echo "WARN: Set SLACK_WEBHOOK to publish a message about this deploy"
	else
		echo 'Communicating with slack...'
    request_body=$(< <(cat <<EOF
    {
      "channel": "#vlctechhub",
      "username": "vlctechhub-bot",
      "text": ":tada:Version $(version_published) released!",
      "icon_emoji": ":rocket:"
    }
EOF
))
    curl -X POST --data-urlencode "payload=$request_body" $SLACK_WEBHOOK > /dev/null
  fi
}

function say_in_command_line {
echo ''
echo '+=========================+'
echo "| Tada! $(version_published) published! |"
echo '+=========================+'
}

build
tag
publish
say_in_slack
say_in_command_line
