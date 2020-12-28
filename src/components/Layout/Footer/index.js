import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import SourceLink from '../../SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2020 Copyright Thao Tran Van for <SourceLink>Truong Thinh</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
