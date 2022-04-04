import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { submitLogin } from "../../connection/connections";
import { useNavigate } from "react-router-dom";
import { tokenCookies } from "../helper_components/authentication";


export const Login = ()=>{
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    
    useEffect(()=>{
        const a = tokenCookies()
        if (a.length > 9) {
            navigate('/home')
        }

    })
    return(
        <div style={{width:"100%", height:"100%"}}>
            <Card className="logincard">
                
                <Form className="form">
                    <h1>Hadeer Admin</h1>
                    <Form.Group className="formgroup" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e)=>{setUserData({...userData, username:e.target.value})}} type="text" placeholder="Enter username" />
                        
                    </Form.Group>

                    <Form.Group className="formgroup" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>{setUserData({...userData, password:e.target.value})}} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        We'll never share your information with anyone else.
                        </Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button onClick={(e)=>{
                        e.preventDefault()
                        console.log(userData)
                        submitLogin(userData)
                    }} variant="primary" >
                        Submit
                    </Button>
                </Form>
                <div style={{marginTop: 'auto',color:'grey'}}>© Hadeer Attendance</div>
            </Card>
            
        </div>
    )
}


