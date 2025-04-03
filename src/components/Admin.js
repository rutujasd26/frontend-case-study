import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilesData from "../profiles.json";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import "./Admin.css";

const Admin = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: "", description: "", photo: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      alert("You must be logged in to access this page!");
      navigate("/signin");
    } else {
      try {
        if (!profilesData || !Array.isArray(profilesData)) {
          throw new Error("Invalid or missing profile data.");
        }
        setProfiles(profilesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [navigate]);

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowEditModal(true);
  };

  const saveChanges = () => {
    if (!editingProfile.name || !editingProfile.description) {
      alert("Name and description are required.");
      return;
    }
    setProfiles(profiles.map((p) => (p.id === editingProfile.id ? editingProfile : p)));
    setShowEditModal(false);
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const addNewProfile = () => {
    if (!newProfile.name || !newProfile.description || !newProfile.photo) {
      alert("Please fill in all fields.");
      return;
    }
    const newId = profiles.length ? profiles[profiles.length - 1].id + 1 : 1;
    setProfiles([...profiles, { id: newId, ...newProfile }]);
    setShowAddModal(false);
    setNewProfile({ name: "", description: "", photo: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/signin");
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div className="admin-container">
      <div className="header">
        <h2>Admin Panel</h2>
        <Button className="logout-btn" onClick={handleLogout}>Logout</Button>
        <Button className="add-btn" onClick={() => setShowAddModal(true)}>➕ Add User</Button>
      </div>

      <table className="table table-hover shadow-sm rounded profile-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td><img src={profile.photo} alt={profile.name} className="profile-img" /></td>
              <td>{profile.name}</td>
              <td>{profile.description}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(profile)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteProfile(profile.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editingProfile?.name || ""}
                onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text" 
                value={editingProfile?.description || ""}
                onChange={(e) => setEditingProfile({ ...editingProfile, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={newProfile.name}
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text" 
                value={newProfile.description}
                onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control 
                type="text" 
                value={newProfile.photo}
                onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="success" onClick={addNewProfile}>Add Profile</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
