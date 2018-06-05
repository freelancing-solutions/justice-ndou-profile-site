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
    userid = ndb.StringProperty()
    projectid = ndb.StringProperty()
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
    project_status = ndb.StringProperty("created") # read, started, milestone, completed

    
    
    def set_project_status(self,status):
        try:
            status = str(status)
            if status in ["created","read","started","milestone","completed"]:
                self.project_status = status
                return True
            else:
                return False
        except:
            return False

    def write_projectid(self,projectid):
        try:
            projectid = str(projectid)
            if projectid != None:
                self.projectid = projectid
                return True
            else:
                return False

        except:
            return False

    def write_userid(self,userid):
        try:
            userid = str(userid)
            if userid != None:
                self.userid = userid
                return True
            else:
                return False

        except:
            return False

    
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

    def write_project_title(self,project_title):
        try:
            project_title = str(project_title)
            project_title = project_title.strip()
            if (project_title != None):
                self.project_title = project_title
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
            route = self.request.get('route')
            if route == "hireme":
                names = self.request.get('names')
                cell = self.request.get('cell')
                email = self.request.get('email')
                website = self.request.get('website')
                facebook = self.request.get('myfacebook')
                twitter = self.request.get('mytwitter')
                company = self.request.get('company')
                freelancing = self.request.get('freelancing')
                project_type = self.request.get('projecttype')
                project_title = self.request.get('projecttitle')
                project_description = self.request.get('projectdescription')

                logging.info("services handler received all variables")

                #//TODO- please do error corrections within the browser using javascript

                this_hireme = HireMe()

                if this_hireme.write_names(names=names) == False:
                    self.response.write("Please enter correct Names")
                elif this_hireme.write_cell(cell=cell) == False:
                    self.response.write("Please enter a valid cell phone Number")
                elif this_hireme.write_email(email=email) == False:
                    self.response.write("Please enter a valid email address")
                elif this_hireme.write_website(website=website) == False:
                    self.response.write("Please enter a valid website address")
                elif this_hireme.write_company(company=company) == False:
                    self.response.write("Please enter a valid company name")
                elif this_hireme.write_project_type(project_type=project_type) == False:
                    self.response.write("Please enter a valid project type")
                elif this_hireme.write_project_title(project_title=project_title) == False:
                    self.response.write("Please enter a valid project title")
                elif this_hireme.write_project_description(project_description=project_description) == False:
                    self.response.write("Please enter a valid project description")

                else:
                    this_hireme.write_facebook(facebook=facebook)
                    this_hireme.write_twitter(twitter=twitter)
                    this_hireme.write_freelancing(freelancing=freelancing)
                    this_hireme.put()
                    self.response.write("Successfuly created your request i will get back to you as soon as possible")

            elif route == "get-hireme-requests":
                
                this_find_requests = HireMe.query(HireMe.project_status != "completed")
                this_hireme_list = this_find_requests.fetch()

                template = template_env.get_template("templates/justice-ndou/personal-profile/services/hireme-list.html")
                context = {'thishiremelist': this_hireme_list}
                self.response.write(template.render(context))
                    
        except:
            self.response.write("an error occured creating a hireme request")

class ThisServicesHandler(webapp2.RequestHandler):
    def get(self):
        """
            Note get the userid from the firebase script on the user end and then use that as a userid
        """
        #TODO- just show the hireme form

        route_url = self.request.uri 
        route_url = route_url.split("?")
        route_url = route_url[0]
        route_url = route_url.split("/")
        route_url = route_url[len(route_url) - 1]

        if route_url == "dohire":
            template = template_env.get_template("templates/justice-ndou/personal-profile/services/dohire.html")
            context = {}
            self.response.write(template.render(context))

        elif route_url == "request-status":
            template = template_env.get_template("templates/justice-ndou/personal-profile/services/status.html")
            context = {}
            self.response.write(template.render(context))
            
    def post(self):
        
        route = self.request.get('route')

        if route == "request-this-status":
            projectid = self.request.get('projectid')
            this_project_query = HireMe.query(HireMe.projectid == projectid)
            this_project_list = this_project_query.fetch()

            if len(this_project_list) > 0:
                this_project = this_project_list[0]

                template = template_env.get_template('templates/justice-ndou/personal-profile/services/status-response.html')
                context = {'thisproject': this_project}
                self.response.write(template.render(context))


app = webapp2.WSGIApplication([
    ('/services', ServicesHandler),
    ('/services/.*', ThisServicesHandler)
], debug=True)