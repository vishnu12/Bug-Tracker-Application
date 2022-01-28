import { useContext } from 'react'
import { Col, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { Context } from '../context/StateContext'
import './NavbarComp.css'

export const NavbarComp = () => {

  const { handleShow, setFilter, setSearchTerm } = useContext(Context)
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand as={Link} to='/' style={{ color: '#fff', marginLeft: '1rem' }} onClick={() => setFilter({ value: 'all' })}><h2>Bug Tracker</h2></Navbar.Brand>
        <Container fluid style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Row>
            <Col>
              <Nav.Link><span className="nav-link-style" onClick={() => handleShow("Add Bug")}>Add Bug</span></Nav.Link>
            </Col>
            <Col>
              <NavDropdown title={
                <span className="nav-link-style">Filter Bugs</span>
              }>
                <NavDropdown.Item onClick={() => setFilter({ value: 'all' })}><span className='nav-dropdown'>All Bugs</span></NavDropdown.Item>
                <NavDropdown.Item onClick={() => setFilter({ value: 'open' })}><span className='nav-dropdown'>Open Bugs</span></NavDropdown.Item>
                <NavDropdown.Item onClick={() => setFilter({ value: 'closed' })}><span className='nav-dropdown'>Closed Bugs</span></NavDropdown.Item>
              </NavDropdown>
            </Col>
            <Col>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="me-2"
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Form>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  )
}
