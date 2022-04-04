import { Button, Container, Nav, Navbar } from "react-bootstrap"

export const Navigation = (props) =>{
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/home">Hadeer Admin</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={()=>{
                        props.setShowList(0)
                    }}>Pelajaran</Nav.Link>
                    <Nav.Link onClick={()=>props.setShowList(1)}>Users</Nav.Link>
                    <Button style={{position : 'absolute',right: 0,top:0,marginRight:"8px",marginTop:"8px"}} variant="danger" onClick={()=>{document.cookie = "token="; window.location.reload()}}>Logout</Button>
                </Nav>
            </Container>
        </Navbar>
    )
}