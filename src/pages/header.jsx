import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,

  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

} from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className='mt-2 mr-3'>
              <Link to="/sendverified">sendverified</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {
            props.Auth.isLogin?
            null
            :
            <Nav >
              <NavItem className='mt-2 mr-3'>
                <Link to="/register">Register</Link>
              </NavItem>
              <NavItem className='mt-2 mr-3'>
                <Link to="/login">Login</Link>
              </NavItem>
            </Nav>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}

const MapstatetoProps=(state)=>{
  return{
    Auth:state.Auth
  }
}
export default connect(MapstatetoProps) (Example);