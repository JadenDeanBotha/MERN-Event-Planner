import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SignUpForm from "./SignUpModal";
import LogInForm from "./LogInModal";
import Button from "react-bootstrap/Button";
import AddEvent from "./AddEvent";

function Header({
  isLoggedIn,
  username,
  email,
  eventState,
  password,
  setStateForSingUp,
  admin,
  setLoggedInState,
  setStateForLogIn,
  title,
  company,
  description,
  date,
  childFriendly,
}) {
  //This is the function which deals with logging the user out
  const handleLogout = () => {
    localStorage.clear();
    isLoggedIn = false;
    setLoggedInState(isLoggedIn);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="Header" data-testid="navbar-test">
      <Container>
        <Navbar.Brand href="#home">Event Planner</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn === true ? (
              <AddEvent
                eventState={eventState}
                title={title}
                company={company}
                description={description}
                date={date}
                childFriendly={childFriendly}
              />
            ) : (
              <p>Please log in</p>
            )}

            {isLoggedIn === false ? (
              <>
                <SignUpForm
                  isLoggedIn={isLoggedIn}
                  setStateForSingUp={setStateForSingUp}
                  email={email}
                  username={username}
                  password={password}
                  admin={admin}
                />
                <LogInForm
                  isLoggedIn={isLoggedIn}
                  email={email}
                  username={username}
                  password={password}
                  admin={admin}
                  setStateForLogIn={setStateForLogIn}
                />
              </>
            ) : (
              <Button variant="danger" onClick={() => handleLogout()}>
                logout
              </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
