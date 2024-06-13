import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../lib/firebase.js'
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import './register.css'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            // console.log(user);

            if(user){
                await setDoc(doc(db, 'Users', user.uid),{
                    email: user.email,
                    firstname: fname,
                    lastname: lname,
                })
            }
            console.log(`User ${user.email} Registered Successfully !!!`)
            
            window.location.href = "/profile";
            toast.success("User Registered Successfully!!", {
              position: "top-center",
            });
            
        } catch (error) {
            console.log(error);            
            toast.error(error.message, {
              position: "bottom-center",
            });
        }

    }

  return (
    
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  )
}

export default Register