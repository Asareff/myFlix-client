import React, { useState } from "react";
import { Col, Row, Container, Form, Button, Modal } from "react-bootstrap";
import "./profile-view.scss";

const ProfileView = ({ user, setUser, token }) => {
  console.log(user); // Add this line to check the user object
  const [newUserData, setNewUserData] = useState({
    Username: user ? user.Username : "",
    Email: user ? user.Email : "",
    Birthday: user ? user.Birthday : "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://movies-service-330159435834.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUserData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Update was successful");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Update failed");
    }
  };

  const handleDeregister = () => {
    setShowConfirmation(true);
  };

  const confirmDeregister = async () => {
    try {
      const response = await fetch(
        `https://movies-service-330159435834.herokuapp.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to deregister user");
      }
      setUser(null);
      alert("User has been deleted");
      localStorage.clear();
      // Redirect to login page or perform any other action after deregistration
    } catch (error) {
      console.error("Error deregistering user:", error);
      alert("Something went wrong.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  if (!user) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
        <div className="profile-card">
          <h3 className="profile-title">My Profile</h3>
          <p>Username: {user.username}</p> {/* Note the lowercase 'username' */}
          <p>Email: {user.email}</p> {/* Note the lowercase 'email' */}
          <p>Birthday: {user.birthday}</p> {/* Ensure that the property name is correct */}
        </div>
        </Col>
        <Col md={7} className="mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                name="Username"
                value={newUserData.Username}
                onChange={handleChange}
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                name="Email"
                value={newUserData.Email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                name="Birthday"
                value={newUserData.Birthday}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" className="mt-3 me-2">Update</Button>
            <Button onClick={handleDeregister} className="mt-3 bg-danger border-danger text-white">Delete User</Button>
          </Form>
        </Col>
      </Row>
      <Modal
        className="confirmation-modal"
        show={showConfirmation}
        onHide={handleCloseConfirmation}
      >
        <Modal.Header closeButton>
          <Modal.Title className="confirmation-modal-title">
            Confirm Deregistration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="confirmation-modal-body">
          Are you sure you want to delete your account?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="profile-button"
            variant="secondary"
            onClick={handleCloseConfirmation}
          >
            Cancel
          </Button>
          <Button
            className="profile-button"
            variant="danger"
            onClick={confirmDeregister}
          >
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfileView;
