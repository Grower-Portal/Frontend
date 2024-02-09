// UserInfo.js
import React from 'react';

function UserInfo() {
  const firstName = localStorage.getItem('firstName'); // Assuming the first name is stored in localStorage
  
  if (firstName === null) {
    return <p className='user-info'>Welcome</p>;
  }

  return (
    <p className='user-info'>Hi, {firstName}</p>
  );
}

export default UserInfo;