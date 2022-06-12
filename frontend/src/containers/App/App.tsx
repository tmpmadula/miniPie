import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Col, Row } from "react-bootstrap";
import Vaccines from "../Vaccines/Vaccines";
import Cases from "../Cases/Cases";
//import logo from "../images/logo.zenysis.png";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <img src={"logo"} alt="Logo" />
        <h1>Covid Info</h1>
      </header>
      <main>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Cases</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Vaccines</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={7}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Cases />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Vaccines />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </main>
    </>
  );
}

export default App;
