import React from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';

import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  const user = { displayName: 'test', username: 'Test', image: '' };
  const logout = () => alert('logging out');

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">          
          Meredian Credit Services
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
