#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import urlfetch
import logging
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))
#import firebase_admin
#from firebase_admin import credentials
#cred = credentials.Certificate('templates/firebase/service_account.json')
#default_app = firebase_admin.initialize_app(cred)

from accounts import Accounts

this_topics = ["CyberAttacks","Hacking Tools","Linux","Kali Linux","Hacking","Hackers","Penetration Testing","Algorithms","Botnets",
               "Crypto Mining","New Crypto Coins","Crypto Coins","DDOS","Networking","State Sponsored Hacking","State Sponsored Malware",
               "Mathematics","Mathematics in Programing","Numerical Algorithms","Graph Theory","Cryptography",
               "Numerical Analysis","Signal Processing","Fourier Transforms","Laplace Transforms","Combinatorials",
               "Theory of Everything", "Quantum Mechanics", "Python", "Programming", "Algorithms", "Google App Engine","Javascript", "Angular", "React", "Typescript","HTML5",
               "CSS3","Jquery","Server Side Rendering","NODEJS","NODE","NPM","Jinja2","Jinja Templating",
               "Physics","Nanotechnolodgy","Space Exploration","SpaceX","Advanced Physics","Moon","Mars","Astronomy",
               "Astrophysics","Chemical Engineering"]

this_page_size = 50

apiKey = '41e896a0a1c94b61903408fae1a49471'
import json


def convert_datestring_to_datetime(date_string):
    try:
        date_string = str(date_string)
        try:
            date_list =  date_string.split("\\")            
            my_year = int(date_list[0])
            my_month = int(date_list[1])
            my_day = int(date_list[2])
        except:
            date_list = date_string.split("-")

            if len(date_list) == 3:
                my_year = int(date_list[0])
                my_month = int(date_list[1])
                my_day = int(date_list[2])
            else:
                this_date = datetime.datetime.now()
                this_date = this_date.date()
                my_year = this_date.year
                my_month = this_date.month
                my_day = this_date.day 
        
        this_date = datetime.date(year=my_year,month=my_month,day=my_day)

        return this_date
                

    except Exception as e:
        raise e

class Interests(ndb.Expando):
    _sep = ":"
    topic_id = ndb.StringProperty()
    topic = ndb.StringProperty()
    subjects = ndb.StringProperty()

    topic_active = ndb.BooleanProperty(default=True)


    def write_topic_id(self,id):
        try:
            id = str(id)
            if id != None:
                self.topic_id = id
                return True
            else:
                return False

        except Exception as e:
            raise e

    
    def write_topic(self,topic):
        try:
            topic = str(topic)
            if topic != None:
                self.topic = topic
                return True
            else:
                return False
        except Exception as e:
            raise e


    def write_subjects(self,subject):
        try:
            subject = str(subject)
            logging.info(subject)
            if subject != None:                
                if(self.subjects != None) and len(self.subjects) != 0:
                    self.subjects += self._sep + subject 
                else:
                    self.subjects = subject 
                return True
            else:
                return False
        except Exception as e:
            logging.warning(subject)
            
            raise e

    def set_topic_active(self,value):
        try:
            if value in [True,False]:
                self.topic_active = value
                return True
            else:
                return False
        except Exception as e:
            raise e 

class Articles (ndb.Expando):

    article_reference = ndb.StringProperty()
    topic = ndb.StringProperty()
    url = ndb.StringProperty()
    title = ndb.StringProperty()
    urlToImage = ndb.StringProperty()
    description = ndb.StringProperty()
    this_date = ndb.DateProperty(auto_now_add=True)



    def write_topic(self,topic):
        try:
            if topic != None:
                self.topic = topic
                return True
            else:
                return False

        except:
            return False

    def create_reference(self):
        import random,string
        try:
            reference = ""
            for i in range(256):
                reference += random.SystemRandom().choice(string.digits + string.ascii_lowercase)
            return reference
        except:
            return ""

    def write_reference(self,ref):
        try:
            if ref != "":
                self.article_reference = ref
                return True
            else:
                return False
        except:
            return False

    def write_url(self,url):
        try:
            url = str(url)
            if url != None:
                self.url = url
                return url
        except Exception as e:
            raise e

    def write_title(self,title):
        try:
            title = str(title)
            title = title.strip()
            if title != None:
                self.title = title
                return True
            else:
                return False

        except Exception as e:
            raise e

    def write_urlToImage(self,urlToImage):
        try:
            urlToImage = str(urlToImage)
            if urlToImage != None:
                self.urlToImage = urlToImage
                return True
            else:
                return False
        except Exception as e:
            raise e
    
    def write_description(self,description):
        try:
            description = str(description)
            description = description.strip()
            if description != None:
                self.description = description
                return True
            else:
                return False
        except Exception as e:
            raise e

    def fetch_articles(self,total):
        """
        
        """
        try:
            import random

            articles_url = 'https://newsapi.org/v2/everything?q='

            mydate = datetime.datetime.now()

            this_date = str(mydate.year) + "-" + str(mydate.month) + "-" + str(mydate.day)



            myarticles_url = articles_url + random.choice(this_topics) + '&language=en' +  '&from=' + this_date + '&apiKey=' + apiKey

            headers = {'Content-Type': 'text/html'}
            result = urlfetch.fetch(url=myarticles_url, method=urlfetch.GET, headers=headers, validate_certificate=True)

            try:
                if result.status_code == 200:
                    myjson = json.loads(result.content)
                    logging.info("ARE WE THERE YET")
                    logging.info(myjson)
                    logging.info("WE ARE THERE")
                    return myjson
                else:
                    return "{STATUS : " + str(result.status_code) + "}"
            except Exception as e:
                logging.info(e)
                raise e
                
        except Exception as e:
            logging.info(e)
            return {"Message": "There was an error accessing NEWS API"}

    def fetch_topic(self, topic):
        """
        """
        try:
            articles_url = 'https://newsapi.org/v2/everything?q='
            mydate = datetime.datetime.now()
            this_date = str(mydate.year) + "-" + str(mydate.month) + "-" + str(mydate.day)

            myarticles_url = articles_url + topic + "&language=en" + "&from=" + this_date + "&apiKey=" + apiKey

            headers = {'Content-Type': 'text/html'}
            result = urlfetch.fetch(url=myarticles_url, method=urlfetch.GET, headers=headers, validate_certificate=True)

            try:
                if result.status_code == 200:
                    myjson = json.loads(result.content)
                    logging.info("ARE WE THERE YET")
                    logging.info(myjson)
                    logging.info("WE ARE THERE")
                    return myjson
                else:
                    return ""
            except Exception as e:
                logging.info(e.message)
                pass

        except Exception as e:
            logging.info(e)
            return ""

    def save_topics(self):
        try:

            for topic in this_topics:
                json_results = self.fetch_topic(topic=topic)
                if json_results != "":
                    articles = json_results['articles']

                    this_date = datetime.datetime.now()
                    this_date = this_date.date()

                    for article in articles:
                        self.write_url(url=article['url'])
                        self.write_title(title=article['title'])
                        self.write_urlToImage(urlToImage=article['urlToImage'])
                        self.write_description(description=article['description'])
                        self.write_reference(ref=self.create_reference())
                        self.put()

                    logging.info("SAVED TOPIC : " + topic)
                else:
                    pass
        except Exception as e:
            raise e


class Posts(ndb.Expando):
    """
        this is for the blog
    """
    
    post_url = ndb.StringProperty()
    post_title = ndb.StringProperty()
    post_description = ndb.StringProperty()
    post_body = ndb.StringProperty()
    
    post_date = ndb.DateProperty()
    post_time = ndb.TimeProperty()

    post_category = ndb.StringProperty()

    post_seo_description = ndb.StringProperty()
    

    def write_post_url(self,post_url):
        try:
            post_url = str(post_url)
            post_url = post_url.strip()

            if post_url != None:
                self.post_url = post_url
                return True
            else:
                return False
        except Exception as e:
            raise e


    def write_post_title(self,post_title):
        try:
            post_title = str(post_title)
            post_title = post_title.strip()
            if post_title != None:
                self.post_title = post_title
                return True
            else:
                return False
        except Exception as e:
            raise e

    def write_post_description(self,post_description):        
        try:
            post_description = str(post_description)
            post_description = post_description.strip()
            if post_description != None:
                self.post_description = post_description
                return True
            else:
                return False

        except Exception as e:
            raise e

    def write_post_body(self,post_body):
        try:
            post_body = str(post_body)
            post_body = post_body.strip()

            if post_body != None:
                self.post_body = post_body
                return True
            else:
                return False
        except Exception as e:
            raise e

    def write_post_date(self,post_date):
        try:

            if isinstance(post_date,datetime.date):
                self.post_date = post_date
                return True
            else:
                return False

        except Exception as e:
            raise e

    def write_post_time(self,post_time):
        try:
            
            if isinstance(post_time,datetime):
                self.post_time = post_time
                return True
            else:
                return False

        except Exception as e:
            raise e

    
    def write_post_category(self,post_category):
        try:

            post_category = str(post_category)        
            if post_category != None:
                self.post_category = post_category
                return True
            else:
                return False

        except Exception as e:
            raise e

    def write_post_seo_description(self,post_seo_description):
        try:

            post_seo_description = str(post_seo_description)
            post_seo_description = post_seo_description.strip()

            if post_seo_description != None:
                self.post_seo_description = post_seo_description
                return True
            else:
                return False

        except Exception as e:
            raise e




class MainRouterHandler(webapp2.RequestHandler):

    def RouteSitemap(self):
        #TODO- Consider creating a dynamic sitemap by actually crawling my site and then outputting the sitemap here
        #TODO- i think i use to have a function to do this coupled with thoth

        template = template_env.get_template('templates/sitemap/sitemap.xml')
        context = {}
        self.response.headers["Content-Type"] = 'text/xml'
        self.response.write(template.render(context))

    def RouteRobots(self):
        template = template_env.get_template('templates/sitemap/robots.txt')
        context = {}
        self.response.headers["Content-Type"] = "text/plain"
        self.response.write(template.render(context))

    def RouteHome(self):
        import random
        this_articles = Articles()
        #this_articles.save_topics()

        topic = random.choice(this_topics)
        articles = this_articles.fetch_topic(topic=topic)

        if articles != "":
            articles = articles['articles']

        template = template_env.get_template('templates/index.html')
        context = {'articles':articles}
        self.response.write(template.render(context))

    def RouteLogin(self):
        template = template_env.get_template('templates/authentication/login.html')
        context = {}
        self.response.write(template.render(context))

    def RouteLogout(self):
        template = template_env.get_template('templates/authentication/logout.html')
        context = {}
        self.response.write(template.render(context))

    def RouteAbout(self):
        template = template_env.get_template('templates/about.html')
        context = {}
        self.response.write(template.render(context))

    def RouteContact(self):
        template = template_env.get_template('templates/contact/contact.html')
        context = {}
        self.response.write(template.render(context))

    def RouteBlog(self):
        template = template_env.get_template("templates/blog/home.html")
        context = {}
        self.response.write(template.render(context))

    def RouteAlgorithms(self):
        template = template_env.get_template("templates/algorithms/algos.html")
        context = {}
        self.response.write(template.render(context))

    def RouteStrange(self):
        template = template_env.get_template("templates/algorithms/strange/strange.html")
        context = {}
        self.response.write(template.render(context))

    def RoutePerlin(self):
        template = template_env.get_template("templates/algorithms/perlin/perlin.html")
        context = {}
        self.response.write(template.render(context))

    def RouteLife(self):
        template = template_env.get_template("templates/algorithms/gameoflife/life.html")
        context = {}
        self.response.write(template.render(context))

    def RouteMaze(self):
        template = template_env.get_template("templates/algorithms/maze/maze.html")
        context = {}
        self.response.write(template.render(context))


    def RoutePath(self):
        template = template_env.get_template("templates/algorithms/pathfinder/path.html")
        context = {}
        self.response.write(template.render(context))


    def RouteMatter(self):
        template = template_env.get_template("templates/algorithms/matter/matter.html")
        context = {}
        self.response.write(template.render(context))


    def RouteDashboard(self):

        if users.is_current_user_admin():
            logout_url = users.create_logout_url(dest_url='/')
            # logout_url = ''
            template = template_env.get_template("templates/dashboard/dashboard.html")
            context = {'logout_url':logout_url}
            self.response.write(template.render(context))
        else:
            login_url = users.create_login_url(dest_url='/dashboard')
            template = template_env.get_template("templates/lockscreen.html")
            context = {'login_url':login_url}
            self.response.write(template.render(context))

    def RouteGames(self):
        template = template_env.get_template("templates/games/games.html")
        context = {}
        self.response.write(template.render(context))

    def RouteTetris(self):
        template = template_env.get_template("templates/games/tetris/tetris.html")
        context = {}
        self.response.write(template.render(context))

    def RoutePacman(self):
        template = template_env.get_template("templates/games/pacman/pacman.html")
        context = {}
        self.response.write(template.render(context))

    def RouteChess(self):
        template = template_env.get_template("templates/games/garbo/chess.html")
        context = {}
        self.response.write(template.render(context))

    def RouteCheckers(self):
        template = template_env.get_template("templates/games/checkers/checkers.html")
        context = {}
        self.response.write(template.render(context))


    def RoutePingPong(self):
        template = template_env.get_template("templates/games/pingpong/pingpong.html")
        context = {}
        self.response.write(template.render(context))

    def RouteMatrix(self):
        template = template_env.get_template("templates/games/matrix/matrix.html")
        context = {}
        self.response.write(template.render(context))

    def RouteSnake(self):
        template = template_env.get_template("templates/games/snake/snake.html")
        context = {}
        self.response.write(template.render(context))

    def RoutePlinko(self):
        template = template_env.get_template("templates/algorithms/plinko/plinko.html")
        context = {}
        self.response.write(template.render(context))

        
    def RouteMazeSolver(self):
        template = template_env.get_template("templates/algorithms/mazepath/mazepath.html")
        context = {}
        self.response.write(template.render(context))
        
        
        
    def RouteDashboardPost(self,route):
        from services import HireMe

        if route == "hireme":
            
            find_hires = HireMe.query(HireMe.project_status <> "completed")
            this_hires_list = find_hires.fetch()
            
            template = template_env.get_template('templates/dashboard/hireme.html')
            context = {'this_hires_list':this_hires_list}
            self.response.write(template.render(context))

        elif route == "get-project": # dashboard project get
            projectid = self.request.get('projectid')
            find_hires = HireMe.query(HireMe.projectid == projectid)
            this_hires_list = find_hires.fetch()
            if len(this_hires_list) > 0:
                this_hire = this_hires_list[0]
                template = template_env.get_template('templates/dashboard/project.html')
                context ={'this_hire':this_hire} 
                self.response.write(template.render(context))
            else:
                this_hire = HireMe()
                template = template_env.get_template('templates/dashboard/project.html')
                context ={'this_hire':this_hire} 
                self.response.write(template.render(context))
                
        elif route == "update-project": #dashboard project updater
            projectid = self.request.get('projectid')
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
            estimated_budget = self.request.get('estimated-budget')
            start_date = self.request.get('start-date')
            project_status = self.request.get('project-status')

            start_date = convert_datestring_to_datetime(start_date)



            find_project = HireMe.query(HireMe.projectid == projectid)
            this_project_list = find_project.fetch()
            if len(this_project_list) > 0:
                this_project = this_project_list[0]
            else:
                this_project = HireMe()

            this_project.write_names(names=names)
            this_project.write_cell(cell=cell)
            this_project.write_email(email=email)
            this_project.write_website(website=website)
            this_project.write_facebook(facebook=facebook)
            this_project.write_twitter(twitter=twitter)
            this_project.write_company(company=company)
            this_project.write_freelancing(freelancing=freelancing)
            this_project.write_project_type(project_type=project_type)
            this_project.write_project_title(project_title=project_title)
            this_project.write_project_description(project_description=project_description)
            this_project.write_start_date(start_date=start_date)
            this_project.set_project_status(status=project_status)
            this_project.put()

            self.response.write("project succesfully updated")


        elif route == "messages":
            template = template_env.get_template('templates/dashboard/messages.html')
            context = {}
            self.response.write(template.render(context))

        elif route == "interests":
            find_topics = Interests.query()
            interests_list = find_topics.fetch()
            template = template_env.get_template('templates/dashboard/interests.html')
            context = {'interests_list':interests_list}
            self.response.write(template.render(context))


        elif route == "createpage":
            template = template_env.get_template('templates/dashboard/createpage.html')
            context = {}
            self.response.write(template.render(context))

        elif route == "createposts":
            template = template_env.get_template('templates/dashboard/createposts.html')
            context = {}
            self.response.write(template.render(context))

        elif route == "subjectfromtopicid":
            topicid = self.request.get('topicid')
            find_subjects = Interests.query(Interests.topic_id == topicid)
            this_interests_list = find_subjects.fetch()
            if len(this_interests_list) > 0:
                
                this_interest = this_interests_list[0] 
                #this_subjects_list = this_interest.subjects.split(this_interest._sep)
                #logging.info(this_subjects_list)
                self.response.write(this_interest.subjects)

        elif route == "addsubjectstotopicid":
            topicid = self.request.get('topicid')
            subjects_list = self.request.get('subjects-list')
            find_subjects = Interests.query(Interests.topic_id == topicid)
            this_interests_list = find_subjects.fetch()
            if len(this_interests_list) > 0:
                this_interest = this_interests_list[0]
            else:
                this_interest = Interests()

            this_interest.write_topic_id(id=topicid)            
            subjects_list = subjects_list.split(this_interest._sep)
            for subject in subjects_list:
                this_interest.write_subjects(subject=subject)
            
            this_interest.put()
            self.response.write("completed adding subjects")

        elif route == "removesubjectstopicid":
            topicid = self.request.get('topicid')
            subjects_list = self.request.get('subjects-list')
            find_subjects = Interests.query(Interests.topic_id == topicid)
            this_interests_list = find_subjects.fetch()
            if len(this_interests_list) > 0:
                this_interest = this_interests_list[0]
                temp_subjects_list = this_interest.subjects.split(this_interest._sep)
                subjects_list = subjects_list.split(":")
                for subject in subjects_list:
                    if subject in temp_subjects_list:
                        temp_subjects_list.remove(subject)
                this_interest.subjects = ""
                for subject in temp_subjects_list:
                    if this_interest.subjects == "":
                        this_interest.subjects = subject
                    else:
                        this_interest.subjects += ':' + subject
                
                this_interest.put()

                self.response.write("subjects removed")

        elif route == "createtopic":
            topicid = self.request.get('topicid')
            topiclabel = self.request.get('topiclabel')

            find_topic = Interests.query(Interests.topic == topiclabel)
            this_topics_list = find_topic.fetch()

            if len(this_topics_list) > 0:
                self.response.write("This topic is already present")
            else:
                this_interest = Interests()
                this_interest.write_topic_id(id=topicid)
                this_interest.write_topic(topic=topiclabel)
                this_interest.put()
                self.response.write("Topic successfully created")
            

    def Route404(self):
        template = template_env.get_template('templates/404.html')
        context = {}
        self.response.write(template.render(context))

    def Route500(self):
        template = template_env.get_template('templates/500.html')
        context = {}
        self.response.write(template.render(context))




    def RouteLoginPost(self,route):
        from accounts import Accounts
        #from firebase_admin import auth

        if route == "email-not-verified":
            template = template_env.get_template('templates/authentication/loggedin.html')
            context = {}
            self.response.write(template.render(context))

        elif route == "email-verified":
            template = template_env.get_template('templates/authentication/loggedin.html')
            context = {}
            self.response.write(template.render(context))

        elif route == "user-not-loggedin":
            template = template_env.get_template('templates/authentication/loggedout.html')
            context = {}
            self.response.write(template.render(context))

        elif route == "2":
            vstrDisplayName = self.request.get('vstrDisplayName')
            vstrEmail = self.request.get('vstrEmail')
            vstremailVerified = self.request.get('vstremailVerified')
            vstrUserID = self.request.get('vstrUserID')
            vstrPhoneNumber = self.request.get('vstrPhoneNumber')
            vstrProviderData = self.request.get('vstrProviderData')
            vstrAccessToken = self.request.get('vstrAccessToken')

            #decode_token = auth.verify_id_token(vstrAccessToken)
            #uid = decode_token['uid']

            findRequest = Accounts.query(Accounts.strUserID == vstrUserID)
            thisAccountList = findRequest.fetch()

            if len(thisAccountList) > 0:
                thisAccount = thisAccountList[0]
                thisAccount.writeEmail(strinput=vstrEmail)

            else:
                findRequest = Accounts.query(Accounts.strEmail == vstrEmail)
                thisAccountList = findRequest.fetch()
                if len(thisAccountList) > 0:
                    thisAccount = thisAccountList[0]
                    thisAccount.writeUserID(strinput=vstrUserID)
                else:
                    thisAccount = Accounts()
                    thisAccount.writeUserID(strinput=vstrUserID)
                    thisAccount.writeNames(strinput=vstrDisplayName)
                    thisAccount.writeEmail(strinput=vstrEmail)
                    thisAccount.writeProviderData(strinput=vstrProviderData)


            if vstremailVerified == "YES":
                thisAccount.writeVerified(strinput=True)
            else:
                thisAccount.writeVerified(strinput=False)
                thisAccount.writeUserID(strinput=vstrUserID)
                thisAccount.writeCell(strinput=vstrPhoneNumber)
                thisAccount.writeProviderData(strinput=vstrProviderData)

            thisAccount.writeAccessToken(strinput=vstrAccessToken)
            thisAccount.put()

            #TODO - Refine this part


    def get(self):
        """
            The Main Get Router entry point
        :return:
        """
        URL = self.request.url
        URL = str(URL)
        URL = URL.lower()
        strURLlist = URL.split("/")

        logging.info(str(len(strURLlist)))

        if len(strURLlist) >= 4:

            if ("index" in strURLlist) or ("index.html" in strURLlist):
                self.RouteHome()
            elif ("login" in strURLlist) or ("login.html" in strURLlist) or ("signin" in strURLlist) or ("signin.html" in strURLlist) or ("subscribe" in strURLlist) or ("subscribe.html" in strURLlist):
                self.RouteLogin()

            elif ("logout" in strURLlist) or ("logout.html" in strURLlist) or ("signout" in strURLlist) or ("signout.html" in strURLlist):
                self.RouteLogout()

            elif "sitemap.xml" in strURLlist:
                self.RouteSitemap()

            elif "robots.txt" in strURLlist:
                self.RouteRobots()

            elif ("about" in strURLlist) or ("about.html" in strURLlist):
                self.RouteAbout()

            elif ("contact" in strURLlist) or ("contact.html" in strURLlist):
                self.RouteContact()

            elif ("blog" in strURLlist) or ("blog.html" in strURLlist):
                self.RouteBlog()

            elif ("strange" in strURLlist) and ("algorithms" in strURLlist):
                self.RouteStrange()

            elif ("perlin" in strURLlist) and ("algorithms" in strURLlist):
                self.RoutePerlin()

            elif ("matrix" in strURLlist) and ("algorithms" in strURLlist):
                self.RouteMatrix()

            elif ("gameoflife" in strURLlist) and ("algorithms" in strURLlist):
                self.RouteLife()

            elif ("maze" in strURLlist) and ("algorithms" in strURLlist):
                self.RouteMaze()

            elif ("path" in strURLlist) and ("algorithms" in strURLlist):
                self.RoutePath()


            elif ("matter" in strURLlist) and ("algorithms" in strURLlist):
                self.RouteMatter()

            elif ("plinko" in strURLlist) and ("algorithms" in strURLlist):
                self.RoutePlinko()

            elif ("mazesolver" in strURLlist) and ("algorithms" in strURLlist):
                self.RouteMazeSolver()


            elif ("algorithms" in strURLlist) or ("algorithms.html" in strURLlist):
                self.RouteAlgorithms()

            elif ("dashboard" in strURLlist) or("dashboard.html" in strURLlist):
                self.RouteDashboard()

            elif ("games" in strURLlist) or ("games.html" in strURLlist):
                self.RouteGames()
            elif ("matrix" in strURLlist):
                self.RouteMatrix()
            elif ("snake" in strURLlist):
                self.RouteSnake()

            elif ("500" in strURLlist):
                self.Route500()
            else:
                self.RouteHome()
        else:
            self.RouteHome()

    def post(self):
        """
            The Main Post Router will also have sub routers for login and logout
        :return:
        """
        URL = self.request.url
        URL = str(URL)
        URL = URL.lower()
        strURLlist = URL.split("/")
        if len(strURLlist) == 4:
            if ("login" in strURLlist) or ("login.html" in strURLlist) or ("signin" in strURLlist) or ("signin.html" in strURLlist) or ("subscribe" in strURLlist) or ("subscribe.html" in strURLlist):
                route = self.request.get("route")
                self.RouteLoginPost(route=route)
            elif ("games" in strURLlist):
                route = self.request.get('route')
                if route == "tetris":
                    self.RouteTetris()
                elif route == "pacman":
                    self.RoutePacman()
                elif route == "chess":
                    self.RouteChess()
                elif route == "checkers":
                    self.RouteCheckers()
                elif route == "pingpong":
                    self.RoutePingPong()
                elif route == "matrix":
                    self.RouteMatrix()


            elif ("dashboard" in strURLlist):
                route = self.request.get('route')
                self.RouteDashboardPost(route=route)
                
        else:
            pass


class DashboardHandler(webapp2.RequestHandler):
    def get(self):
        template = template_env.get_template('templates/dashboard/dashboard.html')
        context = {}
        self.response.write(template.render(context))



app = webapp2.WSGIApplication([
    
    
    ('.*', MainRouterHandler)

], debug=True)
