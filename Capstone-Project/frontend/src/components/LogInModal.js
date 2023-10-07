import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function LogInForm({ isLoggedIn, username, password, setStateForLogIn }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //This is the function which deals with logging the user in
  const LogIn = async (e) => {
    e.preventDefault();
    //This grabs the username and password that the user enters and talks to the backend
    //To determine whether or not they are an existing user
    await fetch("/api/LogInUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem(
          "username",
          JSON.stringify(response.user.username)
        );
        localStorage.setItem("admin", JSON.stringify(response.user.admin));
        setStateForLogIn(
          username,
          response.user.email,
          password,
          response.user.admin,
          (isLoggedIn = true)
        );
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Log In
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="logIn" onSubmit={(e) => LogIn(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={username}
                onChange={(e) => (username = e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                defaultValue={password}
                onChange={(e) => (password = e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button variant="primary" form="logIn">
            Log In
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogInForm;
