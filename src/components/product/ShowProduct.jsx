//src/components/product/ShowProduct.jsx

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

function ShowProductComponent() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [totalProduct, setTotalProduct] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: "", product_name: "", price: "", description: "", userId: "" });

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "product_name", label: "Product Name", minWidth: 170 },
    { id: "price", label: "Price", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "userId", label: "UserId", minWidth: 100 },
  ];
  // Fetch products data from API
  useEffect(() => {
    getProductLists();
  }, []);

  const getProductLists = async () => {
    try {
      console.log("get product API call");
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        console.error("No token found");
        return;
      }
      //setPage(page+1)
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/product/?page=${
          page + 1
        }&rowsPerPage=${rowsPerPage}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("GET Product API Response :-", response.data);
      console.log("count", response.data.count);
      setPage(response.data.page); //1
      setRowsPerPage(response.data.rawsPerPage); //10
      console.log("page", page);
      console.log("page size", rowsPerPage);

      if (response.data.code === 200) {
        toast.success(response.data.message);
        setProduct(response.data.data);
        setTotalProduct(response.data.count);
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
    console.log("Deleting product with ID:", id);
    try {
      console.log("DELETE PRODUCT API CALLED..");
      const token = Cookies.get("token"); 
      console.log("Delete User token :",token);
      
      if (!token) {
        console.error("No token found");
        return;
      }
      const deleteRes = await axios({
        method:"delete",
        url:`http://localhost:3000/product/${id}`,
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      console.log(deleteRes.data);
      if(deleteRes.data.code === 200){
        setProduct(prevProduct => prevProduct.filter(product => product.id!==id))
        toast.success(deleteRes.data.message)
      }else{
        toast.warning(deleteRes.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  };

  const handleOpenDialog = (product) => {
    setCurrentProduct({ id: product.id, product_name: product.product_name, description: product.description,price:product.price, userId: product.userId });
    setOpenDialog(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      console.log("UPDATE PRODUCT API CALL..");
      
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios({
        method: "put",
        url: `http://localhost:3000/product/${currentProduct.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          product_name: currentProduct.product_name,
          price: currentProduct.price,
          description: currentProduct.description,
        },
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        setProduct(prevProduct => prevProduct.map(product => product.id === currentProduct.id ? { ...product, ...currentProduct } : product));
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
                  Product Details
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
              {product.map((row) => {
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
          count={totalProduct}
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
              value={currentProduct.id}
              onChange={(e) => setCurrentProduct({ ...currentProduct, id: e.target.value })}
              required
              disabled={true}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Product Name"
              type="text"
              fullWidth
              value={currentProduct.product_name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, product_name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Price"
              type="text"
              fullWidth
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="userId"
              type="text"
              fullWidth
              value={currentProduct.userId}
              onChange={(e) => setCurrentProduct({ ...currentProduct, userId: e.target.value })}
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

export default ShowProductComponent;
