import { useState, useEffect } from "react";

import "../style/dashboard.css"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Dashboard = () => {

  const [company, setCompany] = useState([]);

  const fetchOrganisations = async () => {
      const token = localStorage.getItem("site");
      
      try {
      const response = await fetch("https://api-testmart.app.thetestmart.com/auth/get_user_details/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "bearer " + token
        }
      });
      const res = await response.json();
      if (res.user) {
        // setCompany(res.user.company);
        let list = res.user.company;
        setCompany(list);

        const recordingPromise = Object.values(list).map(org => fetchRecordings(org.company));

        return Promise.all(recordingPromise).then((d) => {
          if(d.length > 0)
            setCompany(d);
        });
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchRecordings = async (id) => {
    const token = localStorage.getItem("site");

    try {
      const response = await fetch("https://api-testmart.app.thetestmart.com/library/get_list_recordings_json/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "bearer " + token
        },
        body: JSON.stringify({"company": id}),
      });
      const res = await response.json();
      if (res.data) {
        let resp = res.data;
        resp = Object.values(resp).map(r => {r["company"] = id; return r})
        return resp;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    fetchOrganisations();
    console.log(company)
  }, []);


  const renderOrgs = () => { 
        return ( <TableContainer style={{marginBottom: 20}} component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="List of tests">
              <TableHead>
                <TableRow>
                  <TableCell style={{borderRight: '1px solid #f3f3f3', width: 250}}><b>Company</b></TableCell>
                  <TableCell style={{borderRight: '1px solid #f3f3f3', width: 500}}>Name</TableCell>
                  <TableCell style={{borderRight: '1px solid #f3f3f3', width: 100}} align="right">Status</TableCell>
                  <TableCell style={{borderRight: '1px solid #f3f3f3', width: 100}} align="right">Submitted</TableCell>
                  <TableCell style={{borderRight: '1px solid #f3f3f3', width: 100}} align="right">Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Object.values(company).map((orgs) => { 
                  return Object.values(orgs).map((row, i) => { return (
                    <TableRow
                      key={row.timestamp}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell style={{borderRight: '1px solid #f3f3f3'}} component="th"><b>{i == 0 ? row.company: ""}</b></TableCell>
                      <TableCell style={{borderRight: '1px solid #f3f3f3'}} component="th" scope="row">
                        <a target="_blank" href={"https://app.thetestmart.com/recordings/" + row.timestamp + "?org=" + row.company}>{row.name}</a>
                      </TableCell>
                      <TableCell style={{borderRight: '1px solid #f3f3f3'}} align="right">{row.status ? row.status : "--"}</TableCell>
                      <TableCell style={{borderRight: '1px solid #f3f3f3'}} align="right">{row.timestamp}</TableCell>
                      <TableCell style={{borderRight: '1px solid #f3f3f3'}} align="right">{row.author ? row.author : "--"}</TableCell>
                    </TableRow>
                  )})
                  })
                }
              </TableBody>
            </Table>
        </TableContainer>
    )
  }

  return (
    <div id="dashboard">
      <div id="orgs">
        {
          renderOrgs()
        }
      </div>
    </div>
  );
};

export default Dashboard;