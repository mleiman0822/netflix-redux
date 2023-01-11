import React from 'react'
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import Nav from '../Nav'
import './ProfileScreen.css'
import PlansScreen from './PlansScreen';
import { auth } from '../firebase';

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className='profileScreen'>
        <Nav/>
        <div className='profileScreen__body'>
            <h1>Edit Profile</h1>
            <div className='profileScreen__info'>
                <img
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt=''
                />
                <div className='profileScreen_details'>
                    <h2>{user.email}</h2>
                    <div className='profileScreen__plans'>
                        <h3>Plans</h3>
                        <PlansScreen />
                        <button
                         onClick={()=> auth.signOut()}
                         className='profileScreen_signOut'>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen