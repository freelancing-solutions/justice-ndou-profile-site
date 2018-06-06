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
from newsapi import NewsApiClient
import logging
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))
#import firebase_admin
#from firebase_admin import credentials
#cred = credentials.Certificate('templates/firebase/service_account.json')
#default_app = firebase_admin.initialize_app(cred)

from accounts import Accounts


this_topics = '"CyberAttacks" OR "Hacking Tools" OR "Linux" OR "Kali Linux" OR "Hacking" OR "Penetration Testing Algorithms" OR "Botnets" OR "Botnet Mining" OR  "Hackers" OR "Penetration Testing" OR "DDOS" OR "Networking" OR "State Sponsored Hacking" OR "Maths" OR "Mathematics in Programming" OR "Mathematics" OR "Numerical Algorithms" OR "Graph Theory"  OR "Cryptography" OR "Numerical Analysis" OR "Theory of Everything" OR "Number Theory" OR "Combinatorials" OR "Programming" OR "Python Algorithms" OR "Algorithms" OR "AI Algorithms" OR "Advanced Algorithms"  OR "Cryptographic Algorithms" OR "Javascript" OR "Python27" OR "HTML5" OR "CSS3" OR "Jquery" OR "Jinja2" OR "Jinja-Templating" OR "Google App Engine" OR "Google App Engine" OR "Physics" OR "Nanotechnolodgy" OR "Space Exploration" OR "Advanced Physics" OR "Astronomy" OR "Mechanical Engineering" OR "Chemical Engineering" OR "Biotech"'
this_page_size = 50
apiKey = '3b2be7ef781441f4bde537854ffff2bf'

class Articles (ndb.Expando):
    
    url = ndb.StringProperty()
    title = ndb.StringProperty()
    urlToImage = ndb.StringProperty()
    description = ndb.StringProperty()

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
        try:
            strMessage = strMessage + " Optout:Reply STOP"
            form_data = 'user=' + self.strLoginName + '&password=' + self.strPassword + '&cell=' + strCell + '&msg=' + strMessage + '&ref=' + strMessageID
            headers = {'Content-Type': 'application/x-www-form-urlencoded'}
            result = urlfetch.fetch(url=self.strSendHTTPS,payload=form_data,method=urlfetch.POST,headers=headers,validate_certificate=True)
            if (result.status_code >= 200) and (result.status_code < 400) :
                strResult = result.content
                strResult = strResult.replace("ACCEPTED"," ")
                strResult = strResult.strip()
                return strResult
            else:
                return None
        except urlfetch.Error:
            return None
        
        """
        try:
            newsapi = NewsApiClient(api_key='3b2be7ef781441f4bde537854ffff2bf')

            articles_url = 'https://newsapi.org/v2/everything?q='

            total = str(total)
            total = total.strip()
            mydate = datetime.datetime.now()
            
            this_date = str(mydate.year) + "-" + str(mydate.month) + "-" + str(mydate.day)

            myarticles_url = articles_url + this_topics + "&pageSize=" + total + '&from=' + this_date + '&apiKey=' + apiKey


            if (total.isdigit() and (int(total) <= this_page_size)):
                
                all_articles = newsapi.get_everything(q='bitcoin')

                logging.info(all_articles)
                return all_articles
                            
            else:
                return ""

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
        this_articles = Articles()
        
        #articles = this_articles.fetch_articles(total=43)



        template = template_env.get_template('templates/index.html')
        #context = {'articles':articles}
        context = {}
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



    def Route404(self):
        template = template_env.get_template('templates/404.html')
        context = {}
        self.response.write(template.render(context))

    def Route500(self):
        template = template_env.get_template('templates/500.html')
        context = {}
        self.response.write(template.render(context))




    def RouteLoginPost(self,vstrChoice):
        from accounts import Accounts,Organization
        #from firebase_admin import auth

        if vstrChoice == "0":
            template = template_env.get_template('templates/authentication/loggedin.html')
            context = {}
            self.response.write(template.render(context))
        elif vstrChoice == "1":
            template = template_env.get_template('templates/authentication/loggedout.html')
            context = {}
            self.response.write(template.render(context))

        elif vstrChoice == "2":
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
                findRequest = Organization.query(Organization.strOrganizationID == thisAccount.strOrganizationID)
                thisOrgList = findRequest.fetch()
                if len(thisOrgList) > 0:
                    thisOrg = thisOrgList[0]
                    thisOrg.writeUserID(strinput=vstrUserID)
                    thisOrg.put()

            else:
                findRequest = Accounts.query(Accounts.strEmail == vstrEmail)
                thisAccountList = findRequest.fetch()
                if len(thisAccountList) > 0:
                    thisAccount = thisAccountList[0]
                    thisAccount.writeUserID(strinput=vstrUserID)
                    findRequest = Organization.query(Organization.strOrganizationID == thisAccount.strOrganizationID)
                    thisOrgList = findRequest.fetch()
                    if len(thisOrgList) > 0:
                        thisOrg = thisOrgList[0]
                        thisOrg.writeUserID(strinput=vstrUserID)
                        thisOrg.put()
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

            elif ("faq" in strURLlist) or ("faq.html" in strURLlist):
                self.RouteFAQ()
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
                vstrChoice = self.request.get("vstrChoice")
                self.RouteLoginPost(vstrChoice=vstrChoice)
            else:
                pass
        else:
            pass


app = webapp2.WSGIApplication([
    ('.*', MainRouterHandler)

], debug=True)
