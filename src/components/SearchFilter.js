import React, { useState } from "react";
import { motion } from "framer-motion";
import "./SearchFilter.css";

const SearchFilter = ({ profiles, setFilteredProfiles }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  return (
    <motion.input
      type="text"
      className="form-control my-3 shadow-sm rounded-pill px-3"
      placeholder="🔍 Search profiles..."
      value={searchTerm}
      onChange={handleSearch}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default SearchFilter;
