import React, { useContext, usee } from "react";
import userContext from "../../context/userContext";
import { FaUser } from 'react-icons/fa';

function Profile() {
  const { user } = useContext(userContext);


  return (
    <div className="flex items-center justify-center p-4 h-5/6">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
        <div className="p-4 text-center">
          <FaUser className="text-6xl mx-auto fill-gray-700 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
          <div className="mt-4">
            <p className="text-lg text-gray-600">First Name: <span className="font-semibold text-black">{user.user_name}</span></p>
            <p className="text-lg text-gray-600">Last Name: <span className="font-semibold text-black">{user.user_lastname}</span></p>
            <p className="text-lg text-gray-600">Email: <span className="font-semibold text-black">{user.user_email}</span></p>
            <p className="text-lg text-gray-600">ID: <span className="font-semibold text-xs text-black">{user.user_id}</span></p>
            {user.user_role === 'admin' && <p className="text-lg text-gray-600">Role: <span className="font-semibold text-black">Admin</span></p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;