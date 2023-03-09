import React, { useEffect, useState } from "react";
import { getAllPatientsForDoctor, getAppointments } from "../API";
import Tests from "../components/Tests";
import Treatments from "./Treatments";
import moment from "moment";
import { getUser } from "../log";
import "./doctor.css";

function Doctor() {
  let [appointments, setAppointments] = React.useState([]);
  let [patients, setPatients] = React.useState([]);
  let [pop1, setPop1] = React.useState(null);
  let [pop2, setPop2] = React.useState(null);
  let [searchid, setSearchid] = React.useState(0);
  let [searchname, setSearchname] = React.useState("");
  let [searchid2, setSearchid2] = React.useState(0);
  let [searchname2, setSearchname2] = React.useState("");
  let [searchdate, setSearchdate] = React.useState(null);
  const [selectedPanel, setSelectedPanel] = React.useState(0);

  const formatDate = (date: Date) => {
    let d = moment(date);
    return d.format("YYYY-MM-DD");
  };
  //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []);

  useEffect(() => {
    if (!user) return;
    console.log({ user });
    getAppointments(user.username, user.password).then((res) => {
      console.log({ res });
      setAppointments(res.data);
    });
    getAllPatientsForDoctor(user).then((res) => {
      setPatients(res);
    });
  }, [user]);

  function handleSearchId(e: any) {
    const id = parseInt(e.target.value);
    if (id < 0 || id.toString() == "NaN") {
      // alert("can't be less than 0");
      setSearchid(0);
      return;
    }
    setSearchid(id);
  }
  function handleSearchName(e: any) {
    const name = e.target.value;
    setSearchname(name);
  }
  function handlesubmitId() {
    setSearchid(0);
  }
  function handlesubmitName() {
    setSearchname("");
  }

  function handleSearchId2(e: any) {
    const id = parseInt(e.target.value);
    if (id < 0 || id.toString() == "NaN") {
      // alert("can't be less than 0");
      setSearchid2(0);
      return;
    }
    setSearchid2(id);
  }
  function handleSearchName2(e: any) {
    const name = e.target.value;
    setSearchname2(name);
  }
  function handlesubmitId2() {
    setSearchid2(0);
  }
  function handlesubmitName2() {
    setSearchname2("");
  }
  function handleDate(e: any) {
    const date = e.target.value;
    setSearchdate(date);
    console.log(searchdate);
  }

  return (
    <>
      <div className="px-6">
        <h2 className="mt-8 mb-2">Dashboard</h2>
        <div>Hello sir, you have {appointments.length} upcoming Appointments!</div>
        <select name="select"
          className="mt-8 mb-2 shadow-lg font-bold"
          onChange={(event:any) => {
          if (event.target.value === "Appointment") {
            setSelectedPanel(0);
          } else {
            setSelectedPanel(1);
          }
        }}>
            <option value="Appointment">Appointment</option>
            <option value="Patient Info">Patient Info</option>
          </select>
        {
        (selectedPanel == 0) ?
        (<>
        <div className="search">
          <label className="id">
            {" "}
            Search by ID:
            <input
              className="input"
              type="number"
              value={searchid > 0 ? searchid : ""}
              onChange={handleSearchId}
            />
            <button className="button" onClick={handlesubmitId}>
              clear
            </button>
          </label>
          <br />
          <label className="name">
            {" "}
            Search by Name:
            <input
              className="input"
              type="text"
              value={searchname}
              onChange={handleSearchName}
            />
            <button className="button" onClick={handlesubmitName}>
              clear
            </button>
          </label>
          <label className="name">Search By Date: </label>
          <input
            onChange={handleDate}
            min={new Date().toISOString().split("T")[0]}
            type="date"
            placeholder="patient name"
            name="scheduleDate"
            autoComplete="off"
          />
        </div>
        <div className="grid grid-cols-7 gap-3 mb-2 mt-4 shadow-lg text-center">
          <h3 className="col-span-1">Patient ID</h3>
          <h3 className="col-span-2">Patient Name</h3>
          <h3 className="col-span-1">Contact</h3>
          <h3 className="col-span-2">Email</h3>
          <h3 className="col-span-1">Date</h3>
          {/* <h3 className="col-span-2">Priority</h3> */}
        </div>
        <div className="flex flex-col gap-3 whitespace-nowrap mb-8">
          {appointments.sort((a: any, b: any) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
            return b.priority - a.priority;
          }) &&
            appointments.map(
              (appointment: any) =>
                ((searchdate != null && searchdate != "") ?  (searchdate == appointment.date.slice(0,10)): ((searchid == 0 && searchname == "") || (searchid != 0 && appointment.pID.toString().startsWith(searchid.toString())) || (searchname != "" && appointment.pName.toLowerCase().startsWith(searchname.toLowerCase())))) &&(
                  <div
                    className="grid grid-cols-7 gap-3"
                    key={appointment.appID}
                  >
                    <div className="card col-span-1">{appointment.pID}</div>
                    <div className="card col-span-2">{appointment.pName}</div>
                    <div className="card col-span-1">{appointment.Contact}</div>
                    <div className="card col-span-2">{appointment.Email}</div>
                    <div className="card col-span-1">
                      {formatDate(appointment.date)}
                    </div>
                    {/* <div className="card col-span-2">{appointment.priority}</div> */}
                  </div>
                )
            )}
        </div>
        </>
        ):(
          <>
        <div className="search">
          <label className="id">
            {" "}
            Search by ID:
            <input
              className="input"
              type="number"
              value={searchid2 > 0 ? searchid2 : ""}
              onChange={handleSearchId2}
            />
            <button className="button" onClick={handlesubmitId2}>
              clear
            </button>
          </label>
          <br />
          <label className="name">
            {" "}
            Search by Name:
            <input
              className="input"
              type="text"
              value={searchname2}
              onChange={handleSearchName2}
            />
            <button className="button" onClick={handlesubmitName2}>
              clear
            </button>
          </label>
        </div>
        <div className=" flex flex-col mb-16 ">
          <div className="grid grid-cols-8 gap-3 mb-2 mt-4 shadow-lg text-center">
            <h3 className=" col-span-1 ">ID</h3>
            <h3 className=" col-span-2 ">Name</h3>
            <h3 className=" col-span-1">Contact</h3>
            <h3 className=" col-span-2 ">Email</h3>
            <h3 className="col-span-2">Actions</h3>
          </div>
          <div className="flex flex-col gap-3 whitespace-nowrap">
            {patients.sort((a: any, b: any) => a.ID - b.ID) &&
              patients.map(
                (patient: any) =>
                  ((searchid2 == 0 && searchname2 == "") ||
                    (searchid2 != 0 &&
                      patient.ID.toString().toLowerCase().startsWith(searchid2.toString().toLowerCase())) ||
                    (searchname2 != "" &&
                      patient.Name.toLowerCase().startsWith(searchname2.toLowerCase()))) && (
                    <div className="grid grid-cols-8 gap-3" key={patient.ID}>
                      <div className="card col-span-1 ">{patient.ID}</div>
                      <div className="card col-span-2">{patient.Name}</div>
                      <div className="card col-span-1">{patient.Contact}</div>
                      <div className="card col-span-2">{patient.Email}</div>
                      <button
                        onClick={async () => {
                          setPop1(patient.ID);
                        }}
                        className=" blue"
                      >
                        treatments
                      </button>
                      <button
                        onClick={async () => {
                          setPop2(patient.ID);
                        }}
                        className="orange"
                      >
                        tests
                      </button>
                      <Treatments
                        user={user}
                        open={pop1 == patient.ID}
                        patientId={patient.ID}
                        onClose={() => {
                          setPop1(null);
                        }}
                      />
                      <Tests
                        user={user}
                        open={pop2 == patient.ID}
                        patientId={patient.ID}
                        onClose={() => {
                          setPop2(null);
                        }}
                      />
                    </div>
                  )
              )}
          </div>
        </div>
        </>
        )
        }
      </div>
    </>
  );
}
export default Doctor;