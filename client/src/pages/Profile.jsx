import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser, user } = useAuth();

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/users/profile");

        setUserData(res.data.user);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };

    fetchProfile();
  }, []);

  // update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.put("/api/users/profile", {
        name,
        email,
        password,
      });

      const updatedUserData = {
        token: user.token,
        user: res.data.user,
      };

      updateUser(updatedUserData);
      setUserData(res.data.user);
      setPassword(""); // clear password field

      alert("Profile updated");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile Page</h2>

      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;