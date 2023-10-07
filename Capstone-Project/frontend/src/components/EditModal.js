import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function EditEvent({
  title,
  company,
  description,
  date,
  childFriendly,
  setTitle,
  setDescription,
  setCompany,
  setDate,
  setChildFriendly,
  eventState,
  event,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Function to edit an event
  const editEvent = async (e) => {
    e.preventDefault();

    const id = event._id;
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await fetch(`/api/editEvent/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          title: title,
          company: company,
          description: description,
          date: date,
          childFriendly: childFriendly,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          eventState(response[1]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add" onSubmit={(e) => editEvent(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                defaultValue={event.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company name"
                defaultValue={event.company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={event.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={event.date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age Restriction</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={event.childFriendly}
                onChange={(e) => setChildFriendly(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button variant="primary" form="add">
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEvent;
