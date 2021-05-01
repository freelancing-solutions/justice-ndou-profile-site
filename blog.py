import logging
import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

class BlogHandler(webapp2.RequestHandler):
    def post(self):
        pass
    def get(self):
        request_url = self.request.uri
        request_url = request_url.split('?')
        request_url = request_url[0]

        request_url_list = request_url.split("/")
        this_url = request_url_list[len(request_url_list) - 1]

        if this_url == "programming":
            template = template_env.get_template('templates/justice-ndou/blog/categories/programming/programming.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "science":
            template = template_env.get_template('templates/justice-ndou/blog/categories/science/science.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "philosophy":
            template = template_env.get_template('templates/justice-ndou/blog/categories/philosophy/philosophy.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "mathematics":
            template = template_env.get_template('templates/justice-ndou/blog/categories/mathematics/mathematics.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "hacking":
            template = template_env.get_template('templates/justice-ndou/blog/categories/hacking/hacking.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "networking":
            template = template_env.get_template('templates/justice-ndou/blog/categories/networking/networking.html')
            context = {}
            self.response.write(template.render(context))

        elif this_url == "ai":
            template = template_env.get_template('templates/justice-ndou/blog/categories/ai/ai.html')
            context = {}
            self.response.write(template.render(context))



class TopicsHandler(webapp2.RequestHandler):
    def get(self):
        pass
    def post(self):
        pass
    def put(self):
        pass



#TODO- consider methods of obtaining and storing old articles and then submitting them as secong pages indexed by dates

app = webapp2.WSGIApplication([
    ('/blog/.*', BlogHandler),
    ('/topics/.*', TopicsHandler)



], debug=True)
