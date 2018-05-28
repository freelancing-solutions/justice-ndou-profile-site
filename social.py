import logging
import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

class SocialHandler(webapp2.RequestHandler):
    def get(self):
        pass

    def post(self):
        request_url = self.request.uri
        request_url_list = request_url.split("/")
        this_url = request_url_list[len(request_url_list) - 1]

        if this_url == "facebook":
            template = template_env.get_template('templates/justice-ndou/social/facebook.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "google":
            template = template_env.get_template('templates/justice-ndou/social/google.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "twitter":
            template = template_env.get_template('templates/justice-ndou/social/twitter.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "youtube":
            template = template_env.get_template('templates/justice-ndou/social/youtube.html')
            context = {}
            self.response.write(template.render(context))


app = webapp2.WSGIApplication([
    ('/social/.*', SocialHandler),



], debug=True)