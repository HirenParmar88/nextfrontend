//src/components/accessories/ShowAccessories.jsx

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
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function ShowAccessoriesComponent() {
  const [accessories, setAccessories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [totalAccessories, setTotalAccessories] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAccessories, setCurrentAccessories] = useState({ id: "", accessory_name: "", productId: "" });

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "accessory_name", label: "Accessory Name", minWidth: 170 },
    { id: "productId", label: "ProductId", minWidth: 100 },
  ];
  // Fetch products data from API
  useEffect(() => {
    getAccessoriesLists();
  }, []);

  const getAccessoriesLists = async () => {
    try {
      console.log("get accessories API call");
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        console.error("No token found");
        return;
      }
      //setPage(page+1)
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/accessories/?page=${
          page + 1
        }&rowsPerPage=${rowsPerPage}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("GET Accessories API Response :-", response.data);
      console.log("count", response.data.count);
      setPage(response.data.page); //1
      setRowsPerPage(response.data.rawsPerPage); //10
      console.log("page", page);
      console.log("page size", rowsPerPage);

      if (response.data.code === 200) {
        toast.success(response.data.message);
        setAccessories(response.data.data);
        setTotalAccessories(response.data.count);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const handleDelete = async(id) => {
    console.log("Deleting Accessories with ID:", id);
    try {
      console.log("DELETE ACCESSORIES API CALLED..");
      const token = Cookies.get("token"); 
      console.log("Delete Accessories token :",token);
      
      if (!token) {
        console.error("No token found");
        return;
      }
      const deleteRes = await axios({
        method:"delete",
        url:`http://localhost:3000/accessories/${id}`,
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      console.log(deleteRes.data);
      if(deleteRes.data.code === 200){
        setAccessories(prevAccessories => prevAccessories.filter(accessories => accessories.id!==id))
        toast.success(deleteRes.data.message)
      }else{
        toast.warning(deleteRes.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  };

  const handleOpenDialog = (accessories) => {
    setCurrentAccessories({ id: accessories.id, accessory_name: accessories.accessory_name, productId: accessories.productId });
    setOpenDialog(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      console.log("UPDATE ACCESSORIES API CALL..");
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios({
        method: "put",
        url: `http://localhost:3000/accessories/${currentAccessories.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          accessory_name: currentAccessories.accessory_name
        },
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        setAccessories(prevAccessories => prevAccessories.map(accessories => accessories.id === currentAccessories.id ? { ...accessories, ...currentAccessories } : accessories));
        setOpenDialog(false); // Close the dialog
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5} style={{fontSize:20, fontWeight:"bold"}}>
                  Accessories Details
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth,fontWeight:"bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ minWidth: 170,fontWeight:"bold" }} stickyHeader={true}>
                  Actions
                </TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {accessories.map((row) => {
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
                    <TableCell align="center">
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          startIcon={<ModeEditIcon />}
                          onClick={() => handleOpenDialog(row)}
                          style={{fontWeight:"bold"}}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(row.id)}
                          style={{fontWeight:"bold"}}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalAccessories}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Update User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ sx: { borderRadius: "0.7rem", width:"25%"} }} sx={{
        backdropFilter: 'blur(4px) sepia(5%)',
      }}>
        <DialogTitle style={{fontWeight:"bold"}}>Update Product</DialogTitle>
        <DialogContent>
          <DialogContentText style={{marginBottom:"0.5rem"}}>
              Fill details and press update.
          </DialogContentText>
          <form onSubmit={handleUpdate}>
          <TextField
              autoFocus
              margin="dense"
              label="ID"
              type="text"
              fullWidth
              value={currentAccessories.id}
              onChange={(e) => setCurrentAccessories({ ...currentAccessories, id: e.target.value })}
              required
              disabled={true}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Accessory Name"
              type="text"
              fullWidth
              value={currentAccessories.accessory_name}
              onChange={(e) => setCurrentAccessories({ ...currentAccessories, accessory_name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="productId"
              type="text"
              fullWidth
              value={currentAccessories.productId}
              onChange={(e) => setCurrentAccessories({ ...currentAccessories, productId: e.target.value })}
              required
            />
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="warning" variant="outlined" style={{fontWeight:"bold", color:"red", backgroundColor:""}}>
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="outlined" style={{color:"white", backgroundColor:"#3393FF", fontWeight:"bold"}}>
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}
export default ShowAccessoriesComponent;