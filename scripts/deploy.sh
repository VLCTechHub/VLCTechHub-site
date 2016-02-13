#!/usr/bin/env bash

function build {
	git checkout master
	git pull
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
	if [ -z "$SLACK_VLCTECHHUB_TOKEN" ]; then
		 echo "WARN: Set SLACK_VLCTECHHUB_TOKEN to publish a message about this deploy"
	else
		echo 'Communicating with slack...'
		message="https://slack.com/api/chat.postMessage?token=${SLACK_VLCTECHHUB_TOKEN}&channel=%23vlctechhub&text=%3Atada%3AVersion%20$(version_published)%20released!&username=techhub-bot&icon_emoji=%3Arocket%3A&pretty=1"
		curl -s $message > /dev/null
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