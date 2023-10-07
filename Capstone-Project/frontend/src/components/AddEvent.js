import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddEvent({
  title,
  company,
  description,
  date,
  childFriendly,
  eventState,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //This is the state values to get the user inputs
  const [newtitle, setnewTitle] = useState("");
  const [newcompany, setnewCompany] = useState("");
  const [newdescription, setnewDescription] = useState("");
  const [newdate, setnewDate] = useState("");
  const [newchildFriendly, setnewChildFriendly] = useState("");

  //This functions handles the add functionality
  const handleAdd = async (e) => {
    e.preventDefault();
    //This gets the token and username from local storage so that they can be used in the fetch request
    const token = JSON.parse(localStorage.getItem("token"));
    const username = JSON.parse(localStorage.getItem("username"));

    console.log(token);
    console.log(username);

    try {
      //The fetch request communicates with the backend using a POST method to create a new event
      await fetch("/api/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          title: newtitle,
          company: newcompany,
          description: newdescription,
          date: newdate,
          childFriendly: newchildFriendly,
          username: username,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response[0]);
          eventState(response[1]);
        });
    } catch (error) {
      console.log({ mssg: error });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Event
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add" onSubmit={(e) => handleAdd(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                defaultValue={newtitle}
                onChange={(e) => setnewTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company name"
                defaultValue={newcompany}
                onChange={(e) => setnewCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={newdescription}
                onChange={(e) => setnewDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={newdate}
                onChange={(e) => setnewDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age Restriction</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={newchildFriendly}
                onChange={(e) => setnewChildFriendly(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button variant="primary" form="add">
            Add Event
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEvent;
