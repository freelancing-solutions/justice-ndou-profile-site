import logging
import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))


class ProfilesHandler(webapp2.RequestHandler):
    def get(self):
        pass

    def post(self):


        request_url = self.request.uri
        request_url_list = request_url.split("/")
        this_url = request_url_list[len(request_url_list) - 1]

        if this_url == "software-projects":
            template = template_env.get_template('templates/justice-ndou/personal-profile/software-projects/software-projects.html')
            context = {}
            self.response.write(template.render(context))
        elif this_url == "linkedin":
            template = template_env.get_template('templates/justice-ndou/personal-profile/linkedin-profile/linkedin.html')
            context = {}
            self.response.write(template.render(context))

app = webapp2.WSGIApplication([
    ('/profiles/.*', ProfilesHandler),



], debug=True)