import React from "react";
import { motion } from "framer-motion";
import "./ProfileCard.css"; 

const ProfileCard = ({ profile, onShowLocation }) => {
  return (
    <motion.div
      className="card shadow-lg p-3 mb-4 bg-white rounded"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <img src={profile.photo} className="card-img-top rounded" alt={profile.name} />
      <div className="card-body">
        <h5 className="card-title">{profile.name}</h5>
        <p className="card-text">{profile.description}</p>
        <button className="btn btn-primary" onClick={() => onShowLocation(profile)}>
          Show on Map
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
