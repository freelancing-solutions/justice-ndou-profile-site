import logging
import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail
import datetime

template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

class Accounts(ndb.Expando):

    strUserID = ndb.StringProperty()
    strOrganizationID = ndb.StringProperty()
    strNames = ndb.StringProperty()
    strSurname = ndb.StringProperty()
    strCell = ndb.StringProperty()
    strTel = ndb.StringProperty()
    strEmail = ndb.StringProperty()
    strWebsite = ndb.StringProperty()
    strVerified = ndb.BooleanProperty(default=False)
    strVerificationCode = ndb.StringProperty()
    strSuspended = ndb.BooleanProperty(default=False)

    strPhotoURL = ndb.StringProperty()
    strProviderData = ndb.StringProperty()
    strAccessToken = ndb.StringProperty()

    strLastSignInDate = ndb.DateProperty()
    strLastSignInTime = ndb.TimeProperty()
    strTimeStamp = ndb.DateTimeProperty()

    def writeLastSignInDate(self,strinput):
        try:
            if isinstance(strinput,datetime.date):
                self.strLastSignInDate = strinput
                return True
            else:
                return False
        except:
            return False

    def writeLastSignInTime(self,strinput):
        try:
            if isinstance(strinput,datetime.time):
                self.strLastSignInTime = strinput
                return True
            else:
                return False
        except:
            return False

    def writePhotoURL(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strPhotoURL = strinput
                return True
            else:
                return False
        except:
            return False

    def writeProviderData(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strProviderData = strinput
                return True
            else:
                return False
        except:
            return False

    def writeAccessToken(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strAccessToken = strinput
                return True
            else:
                return False
        except:
            return False

    def writeVerified(self,strinput):
        try:
            if strinput in [True,False]:
                self.strVerified = strinput
                return True
            else:
                return False

        except:
            return False
    def writeVerificationCode(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strVerificationCode = strinput
                return True
            else:
                return False
        except:
            return False
    def CreateVerificationCode(self):
        import random, string
        try:
            strVerificationCode = ""
            for i in range(6):
                strVerificationCode += random.SystemRandom().choice(string.digits + string.ascii_uppercase)
            return strVerificationCode
        except:
            return None
    def writeUserID(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strUserID = strinput
                return True
            else:
                return False
        except:
            return False
    def writeOrganizationID(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strOrganizationID = strinput
                return True
            else:
                return False
        except:
            return False
    def writeNames(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strNames = strinput
                return True
            else:
                return False
        except:
            return False
    def writeSurname(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strSurname = strinput
                return True
            else:
                return False
        except:
            return False
    def writeCell(self,strinput):
        # this is just to test git
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strCell = strinput
                return True
            else:
                return False
        except:
            return False
    def writeTel(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strTel = strinput
                return True
            else:
                return False
        except:
            return False
    def writeEmail(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strEmail = strinput
                return True
            else:
                return False
        except:
            return False
    def writeWebsite(self,strinput):
        try:
            strinput = str(strinput)
            if strinput != None:
                self.strWebsite = strinput
                return True
            else:
                return False
        except:
            return False

