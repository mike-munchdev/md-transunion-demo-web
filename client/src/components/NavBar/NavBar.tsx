import React from 'react';
import { Menu, Container, Dropdown } from 'semantic-ui-react';

import { NavLink, Link } from 'react-router-dom';
import {
  useCustomerInfo,
  useLogout,
  useLoggedIn,
} from '../../utils/customerInfo';

const NavBar: React.FC = () => {
  const customerInfo = useCustomerInfo();
  const isLoggedIn = useLoggedIn();

  const logout = useLogout();
  if (!isLoggedIn) return null;

  return (
    <Menu fixed="top" className="menu-header">
      <Container>
        <Menu.Item header as={NavLink} exact to="/" className="logo-header">
          <img src="./header-logo.png" alt="TransUnion powered by Meredian" />
        </Menu.Item>
        {customerInfo && (
          <Menu.Item position="right">
            <Dropdown pointing="top left" text={customerInfo.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/customer`}
                  text="View/Edit Information"
                  icon="user"
                />
                
                <Dropdown.Item
                  as={Link}
                  to={`/accounts`}
                  text="View Accounts"
                  icon="money"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
