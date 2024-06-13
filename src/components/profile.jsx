import React, { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async(user) => {
            console.log(user);

            const docRef = doc(db, "Users", user.uid);
            const docSnap= await getDoc(docRef);

            if(docSnap.exists){
                setUserDetails(docSnap.data());
                console.log(docSnap.data())
            }
            else{
                console.log('User is not Logged in ...')
                toast.warning("User is not Logged in ...", {
                  position: "top-center",})
            }
        });
    }
    useEffect(()=>{
        fetchUserData();
    },[]);

    async function handleLogout() {
      try {
        await auth.signOut();
        window.location.href = "/login";

        console.log("User logged out successfully!");
        toast.success("User logged out successfully!", {
          position: "top-center",})
      } catch (error) {
        console.error("Error logging out:", error.message);
        toast.error("Error logging out", {
          position: "top-center",})
      }
    }


  return (
    
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            /> */}
          </div>

          <h3>Welcome {userDetails.firstname} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstname}</p>
            <p>Last Name: {userDetails.lastname}</p>
          </div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p> 
      )} 
    </div>
  )
}

export default Profile