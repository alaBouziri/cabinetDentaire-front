import React, { useState, useEffect } from "react";
import { FormContainer } from "../../components";
import { Table, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function ListDoctors() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(false);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure : " + id)) {
      await axios.delete(`http://localhost:3001/dentiste/${id}`).then((res) => {
        if (res.status == 200) console.log("deleted successfully");
      });
      getUsers();
    }
  };

  const getUsers = async () => {
    try {
      await axios
        .get(`http://localhost:3001/dentiste`)
        .then((res) => setUsers(res.data));
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <h1>DENTISTE</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>IsAdmin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }} />
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/doctordetails/${user._id}`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit" />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(user._id)}
                >
                  <i className="fas fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ListDoctors;
