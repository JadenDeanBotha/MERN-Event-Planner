import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function SignUpForm({
  isLoggedIn,
  username,
  email,
  password,
  setStateForSingUp,
  admin,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to see if checkbox is checked
  const [isAdmin, ] = useState(false);

  //This determines whether or not the checkbox has been checked or not
  //Then sets the admin permission accordingly
  const handleChange = (event) => {
    if (event.target.checked) {
      admin = true;
    } else {
      admin = false;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    //This function takes all of the user inputs and then creates a user based on the user modal
    //created in the backend
    try {
      await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          admin: admin,
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
          setStateForSingUp(
            username,
            email,
            password,
            isAdmin,
            (isLoggedIn = true)
          );
        });
    } catch (error) {
      console.log("There was an error with sign up", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="signup" onSubmit={(e) => handleSignUp(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={username}
                onChange={(e) => (username = e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                defaultValue={email}
                onChange={(e) => (email = e.target.value)}
              />
              <Form.Text className="text-muted">
                email must end in @gmail.com eg. johndoe@gmail.com. We'll never
                share your email with anyone else.
              </Form.Text>
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Organizer"
                defaultValue={isAdmin}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button variant="primary" form="signup">
            Sign Up
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignUpForm;
