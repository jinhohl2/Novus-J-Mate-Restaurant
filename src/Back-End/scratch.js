const axios = require('axios');

axios("http://localhost:4001/api" + `/users?sort={"email": 1}`)
.then((res)=>{
    console.log(res.data);
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

