import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import MapComponent from "../components/MapComponent";
import SearchFilter from "../components/SearchFilter";
import profilesData from "../profiles.json";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    setProfiles(profilesData);
    setFilteredProfiles(profilesData);
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Profile List</h1>
      
      <SearchFilter profiles={profiles} setFilteredProfiles={setFilteredProfiles} />

      <div className="profile-grid">
        {filteredProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onShowLocation={setSelectedProfile} />
        ))}
      </div>
      
      {selectedProfile && <MapComponent selectedProfile={selectedProfile} />}
    </div>
  );
};

export default Home;


const styles = `
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.heading {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);