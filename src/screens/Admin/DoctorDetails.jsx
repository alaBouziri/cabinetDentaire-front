import React, { useState, useEffect } from "react";
import { FormContainer, Loader } from "../../components";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

function DoctorDetails() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState();
  const [userInfo, setUserInfo] = useState({
    email: "",
    nom: "",
    prenom: "",
    adresse: "",
    nomCabinet: "",
    tel : ""
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const updateDocotor = async () => {
    console.log({ ...userInfo, isAdmin });
    try {
      await axios
        .put(`http://localhost:3001/dentiste/${id}`, { ...userInfo, isAdmin })
        .then((res) => {
          console.log(res);
          navigate("../admin/list/doctors",{replace : true});
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      await axios.get(`http://localhost:3001/dentiste/${id}`).then((res) => {
        setUser(res.data);
        setIsAdmin(res.data.isAdmin);
        setUserInfo({
          email: res.data.email,
          nom: res.data.nom,
          prenom: res.data.prenom,
          adresse: res.data.adresse,
          nomCabinet: res.data.nomCabinet,
        });
        setLoading(false);
      });
    };
    getUser();
    console.log(isAdmin);
  }, []);

  return (
    <FormContainer>
      <h2>DOCTORS</h2>
      {loading ? (
        <Form.Group className="mb-5">
          <div className="text-center" style={{ marginTop: 40 }}>
            <Loader />
          </div>
        </Form.Group>
      ) : (
        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Name"
              defaultValue={user.email}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="name"
              name="nom"
              placeholder="Enter Email"
              onChange={changeHandler}
              defaultValue={user.nom}
            />
          </Form.Group>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>prenom</Form.Label>
            <Form.Control
              type="name"
              name="prenom"
              placeholder="Enter Name"
              onChange={changeHandler}
              defaultValue={user.prenom}
            />
          </Form.Group>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>telephone</Form.Label>
            <Form.Control
              type="name"
              name="tel"
              placeholder="Enter tel"
              onChange={changeHandler}
              defaultValue={user.tel}
            />
          </Form.Group>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Nom cabinet</Form.Label>
            <Form.Control
              type="name"
              name="nomCabinet"
              placeholder="Enter Name"
              onChange={changeHandler}
              defaultValue={user.nomCabinet}
            />
          </Form.Group>
          <div className="text-center">
            <Form.Group controlId="isAdmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
            </Form.Group>

            <LinkContainer to={`/admin/list/doctors`}>
              <Button variant="primary">Back</Button>
            </LinkContainer>
            <Button variant="secondary" onClick={() => updateDocotor()}>
              Update
            </Button>
          </div>
        </Form>
      )}
    </FormContainer>
  );
}

export default DoctorDetails;
