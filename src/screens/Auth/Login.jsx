import React, { useState,useEffect } from "react";
import { FormContainer } from "../../components";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const navigate = useNavigate();

  const onSubmitForm = async () => {
    try {
      setIsLoading(true);
      await axios
        .post('http://localhost:3001/login' , {email , password})
        .then(
            (res) => {
                console.log({res})
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/admin/dashboard');
                window.location.reload();
            },
            (err) => {
                console.log({err : err.response.data.msg});
                setMessageError(err.response.data.msg)
            }
        )
      setIsLoading(false);
      
    } catch (err) {
      console.log({err})
    }
  };

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <FormContainer>
      {messageError && <Alert variant="danger">{messageError}</Alert>}
      <h1>Sign In</h1>
      <Form>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="text-center">
          {isLoading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          ) : (
            <Button variant="primary" onClick={() => onSubmitForm()}>
              Sign In
            </Button>
          )}
        </div>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          {/*<Link to={redirect ? `/register?redirect=${redirect} ` : '/register'>}>*/}
          <Link to="/signup">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login;
