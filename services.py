import logging
import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

class HireMe(ndb.Expando):
    names = ndb.StringProperty()
    cell = ndb.StringProperty()
    email = ndb.StringProperty()
    website = ndb.StringProperty()
    facebook = ndb.StringProperty()
    twitter = ndb.StringProperty()
    company = ndb.StringProperty()
    freelancing = ndb.StringProperty()
    project_type = ndb.StringProperty()
    project_title = ndb.StringProperty()
    project_description = ndb.StringProperty()
    estimated_budget = ndb.IntegerProperty(default=50)
    start_date = ndb.DateProperty()

    def write_names(self,names):
        try:
            names = str(names)
            names = names.strip().lower()
            if names != None:
                self.names = names.strip().lower()
                return True
            else:
                return False
        except:
            return False

    def write_cell(self,cell):
        try:

            cell = str(cell)
            cell = cell.strip()
            cell = cell.lower()

            if cell != None:
                self.cell = cell
                return True
            else:
                return False
        except:
            return False

    def write_email(self,email):
        try:
            email = str(email)
            email = email.strip()
            email = email.lower()
            if email != None:
                self.email = email
                return True
            else:
                return False
        except:
            return False

    def write_website(self,website):
        try:
            website = str(website)
            website = website.strip()
            website = website.lower()
            if website != None:
                self.website = website
                return True
            else:
                return False
        except:
            return False

    def write_facebook(self,facebook):
        try:
            facebook = str(facebook)
            facebook = facebook.strip()
            facebook = facebook.lower()
            if facebook != None:
                self.facebook = facebook
                return True
            else:
                return False
        except:
            return False

    def write_twitter(self,twitter):
        try:
            twitter = str(twitter)
            twitter = twitter.strip()
            twitter = twitter.lower()
            if twitter != None:
                self.twitter = twitter
                return True
            else:
                return False
        except:
            return False

    def write_company(self,company):
        try:
            company = str(company)
            company = company.strip()
            company = company.lower()
            if company != None:
                self.company = company
                return True
            else:
                return False
        except:
            return False

    def write_freelancing(self,freelancing):
        try:
            freelancing = str(freelancing)
            freelancing = freelancing.strip()
            freelancing = freelancing.lower()
            if freelancing != None:
                self.freelancing = freelancing
                return True
            else:
                return False
        except:
            return False

    def write_project_type(self,project_type):
        try:
            project_type = str(project_type)
            if project_type != None:
                self.project_type = project_type
                return True
            else:
                return False
        except:
            return False

    def write_project_description(self,project_description):
        try:
            project_description = str(project_description)
            project_description = project_description.strip()
            if project_description != None:
                self.project_description = project_description
                return True
            else:
                return False
        except:
            return False



class ServicesHandler(webapp2.RequestHandler):

    def post(self):
        try:

            names = self.request.get('names')
            cell = self.request.get('cell')
            email = self.request.get('email')
            website = self.request.get('website')
            facebook = self.request.get('facebook')
            twitter = self.request.get('twitter')
            company = self.request.get('company')
            freelancing = self.request.get('freelancing')
            project_type = self.request.get('project-type')
            project_title = self.request.get('project-title')
            project_description = self.request.get('project-description')
        except:
            pass



app = webapp2.WSGIApplication([
    ('/services', ServicesHandler),



], debug=True)