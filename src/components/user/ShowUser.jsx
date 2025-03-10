//src/components/user/ShowUser.jsx

import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function ShowUserComponent() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [totalUsers, setTotalUsers] = useState(0)

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "role", label: "Role", minWidth: 100 },
    { id: "createdAt", label: "Created At", minWidth: 170 },
    { id: "updatedAt", label: "Updated At", minWidth: 170 },
  ];
  // Fetch users data from API
  useEffect(() => {
    getUserLists();
  }, []);

  const getUserLists = async () => {
    try {
      console.log("get user API call");
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        console.error("No token found");
        return;
      }
      //setPage(page+1)
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/user/?page=${page+1}&rowsPerPage=${rowsPerPage}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("GET User API Response :-", response.data);
      console.log("count",response.data.count);
      setPage(response.data.page)   //1
      setRowsPerPage(response.data.rawsPerPage)   //10
      console.log("page",page);
      console.log("page size",rowsPerPage);
      
      if (response.data.code === 200) {
        toast.success(response.data.message);
        setUsers(response.data.data);
        setTotalUsers(response.data.count);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to 0 when rows per page changes
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  User Details
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer />
    </>
  );
}

export default ShowUserComponent;