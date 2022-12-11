import sys
import getopt
import http.client
import urllib
import json
from random import randint
from random import choice
from datetime import date
from time import mktime

def main(argv):

    # Server Base URL and port
    baseurl = "localhost"
    port = 4000

    # Number of POSTs that will be made to the server
    userCount = 50
    taskCount = 200

    places = open('places.txt', 'r')
    placesLines = places.readlines()
    users = open('users.txt', 'r')
    usersLines = users.readlines()
    reviews = open('reviews.txt', 'r')
    reviewsLines = reviews.readlines()

    for line in placesLines:
        placeArr = line.split(",")
        name = placeArr[0].strip()
        location = placeArr[1].strip()
        locationPair = location.split(" ")
        latitude = float(locationPair[0])
        longitude = float(locationPair[1])
        cuisine = placeArr[2].strip()
        brackets = placeArr[3].strip()
        dishesList = brackets[brackets.find("[")+1:brackets.find("]")]
        dishesList = dishesList.split(";")
        for i in range (0,len(dishesList)):
            dishesList[i] = dishesList[i].strip()
        imageUrl = placeArr[4].strip()
        websiteUrl = placeArr[5].strip()
        print("Name: " + name)
        print("Location: " + str(latitude) + ", " + str(longitude))
        print("Cuisine: " + cuisine)
        print("Dishes: ", end="")
        for dish in dishesList:
            print(dish + ", ", end="")
        print()
        print("ImageURL: " + imageUrl)
        print("WebsiteURL: " + websiteUrl)
        print()
    for line in usersLines:
        userArr = line.split(",")
        fName = userArr[0].strip()
        lName = userArr[1].strip()
        email = userArr[2].strip()
        lat = userArr[3].strip()
        lon = userArr[4].strip()
        userLocation = [float(lat), float(lon)]

    for line in reviewsLines:
        reviewArr = line.split(";")
        rating = round(float(reviewArr[0].strip()), 1)
        description = reviewArr[1].strip()
        


if __name__ == "__main__":
     main(sys.argv[1:])
