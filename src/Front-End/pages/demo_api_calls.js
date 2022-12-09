axios = require('axios');
const url = require("url");

var email = "test@gmail.com"

//User GET request (Searching for a current user's info)
/*
axios.get(`http://localhost:4001/api/users?where={"email":"${email}"}`)
.then((res)=>{
    console.log(res.data.data);
})
.catch((err)=>{
    console.log(err);
})*/

//User POST Request (Create new user when signing in)
/*
axios.post("http://localhost:4001/api" + `/users`,{
    "email" : "test9@gmail.com",
    "Fname" : "test",
    "Lname" : "nine",
    "address" : [123,123],
    "placesVisited" : [],
    "reviews" : []
})
.then((res)=>{
    //console.log(res);
    user_id = res.data.data
    console.log(typeof(res.data.data._id))
})
.catch((err)=>{
    console.log(err);
})*/

//User DELETE by ID
/*
axios.delete("http://localhost:4001/api" + `/users/` + `${user_id}`)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})*/

var user_id = "6392b0a3da166d3422cff1f7"
//User GET by ID Request (Get all restaurants that this user has visited)
axios.get("http://localhost:4001/api" + `/users?` + `where={"email":"${email}"}` + "&" + `select={"placesVisited": 1}`)
.then((res)=>{
    console.log(res.data.data.placesVisited);
})
.catch((err)=>{
    console.log(err);
})
