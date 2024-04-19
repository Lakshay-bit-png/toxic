import React, { useState } from 'react'
import index from './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Add = () => {
    const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [secret,setsecret] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(secret=='shinchan'){
        try {
            const response = await fetch("https://toxic-3y8d.onrender.com/api/users/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                username,
                imgUrl,
              }),
            });
            const data = await response.json();
            if (response.ok) {
              console.log(data)
              toast.success('Data saved Successfully');
              setTimeout(() => {
                window.location.reload();
              }, 3000);
             
              
             
            } else {
              console.log(response)
            }
          } catch (error) {
            console.error("Error:", error);
            toast.error('Error Occured')
           
          }
    }
    else {
        toast.error('Secret Key Incorrect')
    }
    // Fetch code to send form data to backend
  
  };
  
  return (
    
    <>
    <ToastContainer/>
     <form onSubmit={handleSubmit} className="adder-panel">
            
            <div className='add-user'>Add NEW USER Details</div>
            <div className="details">
              <input
                className="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="email"
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="url">
                <input
                  

                  placeholder="Enter Image URL"
                  value={imgUrl}
                  onChange={(e) => setimgUrl(e.target.value)}
                  required
                />
                
              </div>
              <div className='secret'>
                <input type='text' placeholder='secret-key' onChange={(e)=>{setsecret(e.target.value)}} required/>
              </div>
            </div>
            <button type="submit" className="save-button">Save</button>
            
          </form>
    </>
  )
}
