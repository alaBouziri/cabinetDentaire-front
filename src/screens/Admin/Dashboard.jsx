import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import { Table, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState();
  const [labo, setLabo] = useState();
  const [activePatient, setActievePatient] = useState();
  const [descativePatient, setDescativePatient] = useState();
  const [doctor, setDoctor] = useState();

  const filterPatient =  (data) => {
      const active = data.filter(p => (!p.isActivate));
      setActievePatient(active.length);
      setDescativePatient(data.length - active.length)
  }



  const getPatient = async () => {
    await axios.get("http://localhost:3001/patient").then((res) => {
      filterPatient(res.data);
      setPatient(res.data.length);
    });
  };

  const getLabo = async () => {
    await axios.get("http://localhost:3001/labo").then((res) => {
      setLabo(res.data.length);
    });
  };

  const getDoctor = async () => {
    await axios.get("http://localhost:3001/dentiste").then((res) => {
      setDoctor(res.data.length);
    });
  };

  useEffect(() => {
    getPatient();
    getLabo();
    getDoctor();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Form.Group className="mb-5">
          <div className="text-center" style={{ marginTop: 80 }}>
            <Loader />
          </div>
        </Form.Group>
      ) : (
        <div class="container-fluid" style={{marginTop : 80}}>
          <div class="col-md-12 my-1">
            <div class="row">
              <div
                className="col-md-3 bg-success mx-2"
                style={{ height: 130, width: 800 }}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      >
                        {patient}
                      </h5>
                      <h5 className="text-white">Total Patients</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-users"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
        
              <div
                className="col-md-3 bg-danger mx-2"
                style={{ height: 130, width: 800 }}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      >
                        {labo}
                      </h5>
                      <h5 className="text-white">Total Labo</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-tasks"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-3 bg-warning mx-2"
                style={{ height: 130, width: 800 }}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      >
                      {doctor}
                      </h5>
                      <h5 className="text-white">Total Dosctor</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-tasks"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-3 bg-dark mx-2"
                style={{ height: 130, width: 800, marginTop: 20 }}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      >
                        {descativePatient}
                      </h5>
                      <h5 className="text-white">Active account</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-check-circle"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-3 bg-primary mx-2"
                style={{ height: 130, width: 800, marginTop: 20 }}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      >
                        {activePatient}
                      </h5>
                      <h5 className="text-white">desactive account</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-tasks"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
