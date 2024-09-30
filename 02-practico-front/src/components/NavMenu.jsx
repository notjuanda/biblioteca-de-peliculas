import { Container, Nav, Navbar} from "react-bootstrap";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to="/">Biblioteca de películas</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Películas</Nav.Link>
                <Nav.Link as={Link} to="/reparto">Reparto</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>

    </Navbar>
    );
};

export default Header;
