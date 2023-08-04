import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const userId = useParams().id;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:5000/user/${userId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const user = await response.json();
      console.log(user.firstName);
    };
    fetchUser().catch((error) => console.log(error.message));
  }, [userId]);
  return <div>profile</div>;
}

export default Profile;

