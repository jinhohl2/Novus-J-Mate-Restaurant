const axios = require('axios');

/*
axios.get("http://localhost:4001/api" + `/users?sort={"email": 1}`)
.then((res)=>{
    console.log(res.data);
})
.catch((err)=>{
    console.log(err);
})*/

axios.post("http://localhost:4001/api" + `/users`,{
    "email" : "test9@gmail.com",
    "Fname" : "test",
    "Lname" : "nine",
    "address" : [123,123],
    "placesVisited" : [],
    "reviews" : []
})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

/*
axios({
    url: '/users',
    method: 'get',
    baseURL: 'http://localhost:4001/api',
    params : {
        sort : {"email": 1}
    }
})*/


/*
axios.post('http://localhost:4001/api/users').then((Response)=>{
    console.log(Response.data);
}).catch((Error)=>{
    console.log(Error);
})*/

