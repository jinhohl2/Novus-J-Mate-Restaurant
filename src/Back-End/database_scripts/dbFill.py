import sys
import getopt
import http.client
import urllib
import json

from random import randint
from random import choice
from random import randrange
from datetime import date
from datetime import timedelta
from datetime import datetime

from time import mktime

headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}

def main(argv):

    # Server Base URL and port
    baseurl = "localhost"
    port = 4001

    conn = http.client.HTTPConnection(baseurl, port)

    places = open('places.txt', 'r')
    placesLines = places.readlines()
    users = open('users.txt', 'r')
    usersLines = users.readlines()
    reviews = open('reviews.txt', 'r')
    reviewsLines = reviews.readlines()

    userIDs = []
    userFnames = []
    userLnames = []
    userAdds = []
    placeIDs = []
    placeNames = []
    placeAdds = []
    reviewIDs = []
    start_date = datetime.strptime('1/1/2022 12:00 AM', '%m/%d/%Y %I:%M %p')
    end_date = datetime.strptime('12/12/2022 12:00 AM', '%m/%d/%Y %I:%M %p')
    diffTime = end_date-start_date
    intDiffTime = (diffTime.days * 24 * 60 * 60) + diffTime.seconds


    for line in placesLines:
        placeArr = line.split(",")
        name = placeArr[0].strip()
        location = placeArr[1].strip()
        locationPair = location.split(" ")
        address = [float(locationPair[0]), float(locationPair[1])]
        cuisine = placeArr[2].strip()
        brackets = placeArr[3].strip()
        dishesList = brackets[brackets.find("[")+1:brackets.find("]")]
        dishesList = dishesList.split(";")
        for i in range (0,len(dishesList)):
            dishesList[i] = dishesList[i].strip()
        imageUrl = placeArr[4].strip()
        websiteUrl = placeArr[5].strip()
        params = urllib.parse.urlencode({'name': name, 'address': address, 'cuisine': cuisine, 'dishes': dishesList, 'imageUrl': imageUrl, 'websiteUrl': websiteUrl}, True)

        conn.request("POST", "/api/places", params, headers)  
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)  
        placeIDs.append(str(d['data']['_id']))  
        placeNames.append(str(d['data']['name']))
        #placeAdds.append(d['data']['address'])
        
    for line in usersLines:
        userArr = line.split(",")
        fName = userArr[0].strip()
        lName = userArr[1].strip()
        email = userArr[2].strip()
        lat = userArr[3].strip()
        lon = userArr[4].strip()
        userLocation = [float(lat), float(lon)]
        lastClick = ""
        params = urllib.parse.urlencode({'email': email, 'Fname': fName, 'Lname': lName, 'address': userLocation, 'lastClick': ""}, True)
        conn.request("POST", "/api/users", params, headers)  
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)
        userIDs.append(str(d['data']['_id']))
        #userFnames.append(str(d['data']['Fname']))
        #userLnames.append(str(d['data']['Lname']))
        #userAdds.append(d['data']['address'])

    for placeID in placeIDs:
        conn.request("GET","/api/places/" +placeID)
        placeRes = conn.getresponse()
        placeData = placeRes.read()
        pd = json.loads(placeData)
        
        assignedPlaceName = str(pd['data']['name'])
        assignedPlaceAdd = pd['data']['address']
        assignedPlaceDate = str(pd['data']['dateCreated'])
        assignedUsersVisited = pd['data']['usersVisited']
        assignedUsersVisited = [str(x).replace('[','').replace(']','').replace("'",'').replace('"','') for x in assignedUsersVisited]
        

        numUsersVisited = randint(70,140)
        for user in range(0, numUsersVisited):
            userID = choice(userIDs)
            print(userID)
            conn.request("GET","/api/users/"+userID)
            userRes = conn.getresponse()
            userData = userRes.read()
            ud = json.loads(userData)

            assignedUserFname = str(ud['data']['Fname'])
            assignedUserLname = str(ud['data']['Lname'])
            assignedUserEmail = str(ud['data']['email'])
            
            assignedUserAdd = ud['data']['address']
            assignedUserUVisits = ud['data']['uniqueVisits']
            
            assignedUserDate = str(ud['data']['dateCreated'])

            random_sec = randrange(intDiffTime)   
            randDate = start_date + timedelta(seconds=random_sec)
            assignedUserUVisits[randDate.month - 1] += 1

            if "lastClick" not in ud or ((str(ud['data']['lastClick'])).strip() == ""):
                assignedUserLClick = str(randDate)
            else:
                assignedUserLClick = str(max(ud['data']['lastClick'], randDate))




            assignedPlacesVisited = ud['data']['placesVisited']
            assignedPlacesVisited = [str(x).replace('[','').replace(']','').replace("'",'').replace('"','') for x in assignedPlacesVisited]

            assignedPlacesVisited.append(placeID)

            print("placeID:")
            print(type(placeID))
            print(placeID)            
            if userID not in assignedUsersVisited:
                assignedUsersVisited.append(userID)

            userParams = urllib.parse.urlencode({'_id': userID, 'email': assignedUserEmail, 'Fname': assignedUserFname, 
                                                'Lname': assignedUserLname, 'address': assignedUserAdd, 
                                                'placesVisited': assignedPlacesVisited, 
                                                'uniqueVisits': assignedUserUVisits,
                                                'lastClick': assignedUserLClick,
                                                'dateCreated': assignedUserDate}, True)
            conn.request("PUT", "/api/users/"+userID, userParams, headers)
            r1 = conn.getresponse()
            dat1 = r1.read()
            d1 = json.loads(dat1)
        placeParams = urllib.parse.urlencode({'_id': placeID, 'name': assignedPlaceName, 'address': assignedPlaceAdd,
                                              'usersVisited': assignedUsersVisited, 
                                              'dateCreated': assignedPlaceDate}, True)
        conn.request("PUT", "/api/places/"+placeID, placeParams, headers)
        r2 = conn.getresponse()
        dat2 = r2.read()
        d2 = json.loads(dat2)     
        print(d2)
    
                                  
        

    for line in reviewsLines:
        break
        reviewArr = line.split(";")
        rating = round(float(reviewArr[0].strip()), 1)
        description = reviewArr[1].strip()
    conn.close()


if __name__ == "__main__":
     main(sys.argv[1:])
