import { Container, Nav, Navbar} from "react-bootstrap";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to="/admin">Dashboard De Administracion</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/admin">Películas</Nav.Link>
                <Nav.Link as={Link} to="/admin/actores">Reparto</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>

    </Navbar>
    );
};

export default Header;
