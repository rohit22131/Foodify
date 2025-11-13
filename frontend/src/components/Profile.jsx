import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaHeart,
  FaBell,
  FaEdit,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsPromotions: false,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser({
          ...res.data,
          addresses: res.data.addresses || [],
          cards: res.data.cards || [],
          favorites: res.data.favorites || [],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const togglePreference = (type) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/upload-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prev) => ({ ...prev, profilePhoto: res.data.profilePhoto }));
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user)
    return <div className="text-center mt-10">Failed to load user data</div>;

  const profilePhoto = user.profilePhoto
    ? `${import.meta.env.VITE_API_BASE_URL}${user.profilePhoto.replace(
        /\\/g,
        "/"
      )}`
    : "https://www.gravatar.com/avatar/?d=mp";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="relative bg-white rounded-xl shadow overflow-hidden">
          <div
            className="relative h-100 sm:h-56 md:h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1050&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-6 py-6 z-10">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                {/* Profile Photo */}
                <div className="relative">
                  <label htmlFor="profilePhotoInput" className="cursor-pointer">
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover hover:opacity-80 transition-opacity"
                    />
                  </label>
                  <input
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {uploading && (
                    <p className="text-sm text-white mt-1 text-center sm:text-left">
                      Uploading...
                    </p>
                  )}
                </div>

                {/* User Info */}
                <div className="text-white text-center sm:text-left">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-sm">{user.phone || "+91 XXXXXXXX"}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex items-center gap-2 justify-center"
                  onClick={() => navigate("/edit-profile")}
                >
                  <FaEdit /> Edit Profile
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2 justify-center"
                  onClick={() => navigate(`/reset-password/sampletoken123`)}
                >
                  <FaLock /> Reset Password
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2 justify-center"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Saved Addresses */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2 mb-3">
              <FaMapMarkerAlt /> Saved Addresses
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 mb-2">
              {user.addresses.length > 0 ? (
                user.addresses.map((addr, idx) => <li key={idx}>🏠 {addr}</li>)
              ) : (
                <li className="text-gray-500">No saved addresses.</li>
              )}
            </ul>
            <button
              className="text-sm text-orange-500 hover:underline"
              onClick={() => navigate("/manage-addresses")}
            >
              Manage Addresses
            </button>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2 mb-3">
              <FaCreditCard /> Payment Methods
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 mb-2">
              {user.cards.length > 0 ? (
                user.cards.map((card, idx) => (
                  <li key={idx}>
                    💳 **** **** **** {card.last4} ({card.brand})
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No saved cards.</li>
              )}
            </ul>
            <button
              className="text-sm text-orange-500 hover:underline"
              onClick={() => navigate("/manage-cards")}
            >
              Manage Cards
            </button>
          </div>

          {/* Favorites */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2 mb-3">
              <FaHeart /> Favorite Restaurants
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 mb-2">
              {user.favorites.length > 0 ? (
                user.favorites.map((fav, idx) => <li key={idx}>❤️ {fav}</li>)
              ) : (
                <li className="text-gray-500">No favorites yet.</li>
              )}
            </ul>
            <button
              className="text-sm text-orange-500 hover:underline"
              onClick={() => navigate("/favorites")}
            >
              View Favorites
            </button>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2 mb-3">
              <FaBell /> Notification Preferences
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={preferences.emailNotifications}
                  onChange={() => togglePreference("emailNotifications")}
                />
                <span className="text-sm text-gray-700">
                  Email Notifications
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={preferences.smsPromotions}
                  onChange={() => togglePreference("smsPromotions")}
                />
                <span className="text-sm text-gray-700">SMS Promotions</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
