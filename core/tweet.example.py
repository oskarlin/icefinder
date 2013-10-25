#!/usr/bin/env python

import sys
import tweepy

CONSUMER_KEY = 'paste your Consumer Key here'
CONSUMER_SECRET = 'paste your Consumer Secret here'
ACCESS_KEY = 'paste your Access Key here'
ACCESS_SECRET = 'paste your Access Secret here'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)
api.update_status(sys.argv[1])

##you need to have installed tweepy, Look here: http://talkfast.org/2010/05/31/twitter-from-the-command-line-in-python-using-oauth/