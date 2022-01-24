import React, { useState, useEffect } from "react";
import { Loader } from "../../components";
import { Table, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";  

function ListPatient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete : " + id)) {
      await axios.delete(`http://localhost:3001/patient/${id}`).then((res) => {
        console.log(res.data)
        getUsers();
      });
    }
    setLoading(false)
  };


  const acceptUser = async (id) => {
    try {
      await axios
        .put(`http://localhost:3001/patient/${id}`, { isActivate: true })
        .then((res) => {
          console.log(res);
          getUsers();
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:3001/patient").then((res) => {
        setUsers(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Patients</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        {loading ? (
          <Form.Group className="mb-5">
            <div className="text-center" style={{ marginTop: 40 }}>
              <Loader />
            </div>
          </Form.Group>
        ) : (
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>

                <td>
                  <LinkContainer to={`/admin/patientdetails/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                   {user.isActivate === true ? (
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteUser(user._id)}
                    >
                      DELETE USER
                    </Button>
                  ) : ( 
                    <>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteUser(user._id)}
                          >
                            DECLIINE
                          </Button>
                          <Button
                            variant="success"
                            className="btn-sm"
                            onClick={() => acceptUser(user._id)}
                            
                          >
                            ACCEPT
                          </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </>
  );
}

export default ListPatient;
