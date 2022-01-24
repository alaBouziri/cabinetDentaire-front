import React, { useState, useEffect } from "react";
import { FormContainer, Loader } from "../../components";
import { Form, Button, Spinner } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

function UserDetails() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      await axios.get("http://localhost:3001/patient/" + id).then((res) => {
        setUser(res.data);
        setLoading(false);
      });
    };
    getUser();
  }, []);

  return (
    <FormContainer>
      <h2>Patient</h2>
      {loading ? (
        <Form.Group className="mb-5">
          <div className="text-center" style={{ marginTop: 40 }}>
            <Loader />
          </div>
        </Form.Group>
      ) : (
        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter Name"
              defaultValue={user.nom}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              name="Last name"
              placeholder="Enter Last Name"
              defaultValue={user.prenom}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              defaultValue={user.email}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter Name"
              defaultValue={user.adresse}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter Name"
              defaultValue={user.tel}
              disabled
            />
          </Form.Group>
          <div className="text-center">
            <LinkContainer to={`/admin/list/patients`}>
              <Button variant="primary">
                Back
              </Button>
            </LinkContainer>
          </div>
        </Form>
      )}
    </FormContainer>
  );
}

export default UserDetails;
