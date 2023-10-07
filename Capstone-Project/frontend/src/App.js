import Header from "./components/Header";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import EditEvent from "./components/EditModal";

function App() {
  //This is the state for whether or not a user is logged in
  //It's default state will be false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //State values to handle the sign up and login forms
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  //State variable for events
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [childFriendly, setChildFriendly] = useState("");

  //Function to grab the state from the signUp form
  function setStateForSingUp(username, email, password, admin, isLoggedIn) {
    setUsername(username);
    setEmail(email);
    setPassword(password);
    setAdmin(admin);
    setIsLoggedIn(isLoggedIn);
  }

  //Function to grabe the logged in state from the logout button
  function setLoggedInState(value) {
    setIsLoggedIn(value);
  }

  //Function to fetch state from the Log In form
  function setStateForLogIn(username, email, password, admin, isLoggedIn) {
    setUsername(username);
    setEmail(email);
    setPassword(password);
    setAdmin(admin);
    setIsLoggedIn(isLoggedIn);
  }

  //Function to get event state
  const eventState = (event) => {
    setEvents(event);
  };

  //This useEffect allows for the program to get all of the events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await fetch("/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setEvents(response[0]);
          });
      } catch (error) {
        console.log([error, ""]);
      }
    };
    fetchEvents();
  }, []);

  //Function to delete the item
  const handleDelete = async (event) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = JSON.parse(localStorage.getItem("username"));
    try {
      await fetch(`/api/delete/${event._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setEvents(response[1]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        setStateForSingUp={setStateForSingUp}
        email={email}
        username={username}
        password={password}
        admin={admin}
        setLoggedInState={setLoggedInState}
        setStateForLogIn={setStateForLogIn}
        eventState={eventState}
        title={title}
        company={company}
        description={description}
        date={date}
        childFriendly={childFriendly}
      />

      {/* 
This makes the program check whether or not the user has admin permissions or not
and depending on whether the user does or doesn't have the edit and delete functionality do not even display
  */}
      {isLoggedIn === true && JSON.parse(localStorage.getItem("admin")) === true
        ? events.map((event) => (
            <Table striped="columns" id="displayTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Organizer</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Family Friendly</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.company}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>{event.childFriendly}</td>
                  <td>
                    <EditEvent
                      event={event}
                      title={title}
                      company={company}
                      description={description}
                      date={date}
                      childFriendly={childFriendly}
                      eventState={eventState}
                      setTitle={setTitle}
                      setCompany={setCompany}
                      setDescription={setDescription}
                      setDate={setDate}
                      setChildFriendly={setChildFriendly}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDelete(event)}>delete</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          ))
        : events.map((event) => (
            <Table striped="columns" id="displayTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Organizer</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Family Friendly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{event.title}</td>
                  <td>{event.company}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>{event.childFriendly}</td>
                </tr>
              </tbody>
            </Table>
          ))}
    </div>
  );
}

export default App;
