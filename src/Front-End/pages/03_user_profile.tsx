import React, { useEffect } from 'react';
import '../scss/App.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSave, faEdit, faCancel } from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '../../User-Auth/AuthContext';
import {useState} from 'react'
import { FirebaseError } from 'firebase/app';
import axios, {AxiosError, AxiosResponse} from "axios";

const api = axios.create({
    baseURL: "http://localhost:4001/api/"
});

const UserProfile = () => {
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [lng, setLng] = useState<string>("");
    const [lat, setLat] = useState<string>("");
    const { currentUser } = useAuth();
    const { updateInfo } = useAuth();

    const [userId, setUserId] = useState<string>("")
    const [newfname, setNewfname] = useState<string>("")
    const [newlname, setNewlname] = useState<string>("")
    const [newemail, setNewemail] = useState<string>("")
    const [newlng, setNewlng] = useState<string>("");
    const [newlat, setNewlat] = useState<string>("");
    

    useEffect(()=>{
        const queryemail = currentUser.email
        console.log(queryemail);
        api.get(`users?where={"email":"${queryemail}"}`)
        .then((res)=>{
            const userInfo = res.data.data[0]
            setFname(userInfo.Fname)
            setLname(userInfo.Lname)
            setEmail(queryemail);
            setLat(String(userInfo.address[0]))
            setLng(String(userInfo.address[1]))
            setUserId(userInfo._id)

            
        })
    // eslint-disable-next-line
    },[])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "first-name": {
                setNewfname(value);
                break;
            }
            case "last-name": {
                setNewlname(value);
                break;
            }
            case "add-on-email": {
                setNewemail(value);
                break;
            }
            case "latitude-input": {
                setNewlat(value);
                break;
            }
            case "longitude-input": {
                setNewlng(value);
                break;
            }
        }
    }

    function updateUserInfo(e: React.MouseEvent<HTMLElement, MouseEvent>){
        e.preventDefault();

        var newLatitude = newlat===""? lat : Number(newlat)
        var newLongitude = newlng===""? lng : Number(newlng)
        api.put(`users/${userId}`, {
            "email": newemail==="" ? email : newemail,
            "Fname": newfname==="" ? fname : newfname,
            "Lname": newlname==="" ? lname : newlname,
            "address": [newLatitude, newLongitude],
            "placesVisited": [],
            "reviews": []
        })
        .then((res: AxiosResponse) => {
            console.log(res.data.data)
            setFname(res.data.data.Fname);
            setLname(res.data.data.Lname);
            setEmail(res.data.data.email);
            setLat(String(res.data.data.address[0]))
            setLng(String(res.data.data.address[1]))
            
            console.log(newemail)
            if(newemail !== "") {
                updateInfo(newemail)
                .then(()=>{
                    alert("User Information Successsfully updated!");
                    setNewfname("")
                    setNewlname("")
                    setNewemail("")
                    setNewlat("")
                    setNewlng("")
                })
                .catch((err: FirebaseError)=>{
                    console.log(err)
                })
            }
        })
        .catch((err: AxiosError) => {
            console.log(err)
            var errMessage = JSON.parse(err.response?.request.response).message
            alert(errMessage);
        })
    }

    return (

        <React.Fragment>
            <section className="section-03-user-profile">
                <div className="user-profile-content">
                    <div className="div-user-details">
                        <div className="user-detail-items">
                            <ul>
                                <li>
                                    <h1>Hello, {fname+" "+lname}</h1>
                                </li>
                                <li>
                                    <h6>{email}</h6>
                                </li>
                                <li>
                                    <h6>Location (Lat, Lng) : {lat + " " + lng}</h6>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="nav-edit-user-and-view-restaurant-visit-history">


                        <section className="section-user-profile">

                            <div className="div-edit-cancel-save">

                                <button id="edit">
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                                <button id="cancel">
                                    <FontAwesomeIcon icon={faCancel} /> Cancel
                                </button>
                                <button id="save" onClick={updateUserInfo}>
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>

                            </div>

                            <div className="div-user-profile-content">
                                <div>
                                    <h3>Change User Information</h3>
                                </div>
                                <div className="first-name">
                                    <label>
                                        First Name:
                                    </label>
                                    <input type="text" name="first-name" onChange={handleInputChange} value={newfname} placeholder="Enter the first name"/>
                                </div>
                                <div className="last-name">
                                    <label>
                                        Last Name:
                                    </label>
                                    <input type="text" name="last-name" onChange={handleInputChange} value={newlname} placeholder="Enter the last name"/>
                                </div>

                                <div className="add-on-email">
                                    <label>
                                        Add-on Email:
                                    </label>
                                    <input type="text" name="add-on-email" onChange={handleInputChange} value={newemail} placeholder="Enter the email"/>
                                </div>

                                <div className="latlng-div">
                                    <label className="latlng-label">
                                        Geolocation:
                                    </label>

                                    <input className="latitude-input" type="text" name="latitude-input" onChange={handleInputChange} value={newlat} placeholder="Enter Latitude"/>
                                    <input className="longitude-input" type="text" name="longitude-input" onChange={handleInputChange} value={newlng} placeholder="Enter Longitude"/>

                                </div>

                            </div>
                        </section>

                    </div>
                </div>
            </section>
        </React.Fragment>

    );
};

export default UserProfile;
