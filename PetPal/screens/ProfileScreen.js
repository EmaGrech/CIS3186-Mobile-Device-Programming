import { useEffect, useState } from "react";
import { getUserProfile } from "../FirebaseConfig";

function ProfileScreen() {
  const [user, setUser] = useState([]);

  const getDataFromFirestore = async () => {
    try {
      const data = await getUserProfile("1");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);
}

export default ProfileScreen;
