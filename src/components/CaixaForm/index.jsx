import { useContext } from "react";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import "./styles.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { BootstrapInput } from "./styles.jsx";
import { basicAlert } from "../../utils/alert.js";
import IconButton from "@mui/material/IconButton";

export const CaixaForm = () => {
  const INITIAL_VALUE_ITEMS = {
    product: null,
    qtd: 0,
  };
  const [formData, setFormData] = useState(INITIAL_VALUE_ITEMS);
  const [listProducts, setListProducts] = useState([]);

  const { listItems, setListItems, formatCoin, removeItemCart } =
    useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = (filter) => {
    axios
      .get(process.env.REACT_APP_URL_BASE + "products", {
        params: { filter: filter },
      })
      .then((result) => {
        setListProducts(result.data);
      });
  };

  const OnInsertItem = () => {
    if (formData?.qtd < 1) {
      basicAlert("Quantidade inválida", "", "error");
    } else {
      var qtd = parseFloat(formData?.qtd);
      const index = listItems
        .map((object) => object.id)
        .indexOf(formData?.product.id);

      if (index !== -1) {
        qtd = listItems[index].qtd + qtd;
        listItems.splice(index, 1);
      }

      const itens = {};
      itens.id = formData?.product.id;
      itens.name = formData?.product.name;
      itens.qtd = qtd;
      itens.unit_price = parseFloat(formData?.product.price);
      itens.total = itens.unit_price * itens.qtd;

      setListItems((item) => [...item, itens]);
      
    }
  };

  return (
    <>
      <h3>Produtos</h3>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={6}>
          <InputLabel style={{ fontSize: 12 }}>
            Buscar pelo código de barras ou descrição
          </InputLabel>
          {/* <BootstrapInput style={{ width: "100%" }} /> */}

          <Autocomplete			 	
            onChange={(e, value) =>
              setFormData({ ...formData, product: value })
            }
            style={{
              marginTop: 8,
              border: "0px solid #ced4da",
            }}
            size="small"
            freeSolo
            // value={formProduct}
            options={listProducts}
            getOptionLabel={(option) => option.id + " - " + option.name}
            value={formData.product}				
            renderInput={(params) => (
              <TextField
				  value={formData.product}
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <InputLabel style={{ fontSize: 12 }}>Quantidade de itens</InputLabel>
          <BootstrapInput
            type="number"
            style={{ width: "100%" }}
            value={formData.qtd || null}
            onChange={(e) => setFormData({ ...formData, qtd: e.target.value })}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => OnInsertItem()}
            variant="contained"
            style={{
              marginTop: "25px",
              textTransform: "none",
              borderRadius: 0,
              fontSize: 15,
            }}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>

      <TableContainer
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
        style={{ marginLeft: "-10px", marginTop: "30px" }}
      >
        <Table aria-label="caption table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Produtos/Serviços</b>
              </TableCell>
              <TableCell align="right">
                <b>Quantidade</b>
              </TableCell>
              <TableCell align="right">
                <b>Preço unitário</b>
              </TableCell>
              <TableCell align="right">
                <b>Total</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.qtd}</TableCell>
                <TableCell align="right">
                  {formatCoin(row.unit_price)}
                </TableCell>
                <TableCell align="right">{formatCoin(row.total)}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      color="error"
                      onClick={() => removeItemCart(row)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
