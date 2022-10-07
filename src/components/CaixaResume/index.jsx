import React, { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import "./styles.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { basicAlert } from "../../utils/alert";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const CaixaResume = () => {
  const [clients, setClients] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [sellerSelected, setSellerSelected] = useState("");
  const [clientSelected, setClientSelected] = useState("");
  const [statusButtonCancel, setStatusButtonCancel] = useState(true);
  const [statusButtonPay, setStatusButtonPay] = useState(true);

  const { listItems, formatCoin, clearListItem } = useContext(CartContext);

  const [total, setTotal] = useState(0);

  const sumTotal = () => {
    var sum = listItems.reduce(function (prev, cur) {
      return prev + cur.total;
    }, 0);

    setTotal(sum);
  };

  useEffect(() => {
    getClients();
    getSellers();
  }, []);

  useEffect(() => {
    sumTotal();
  }, [listItems]);

  useEffect(() => {
    handleButtonCancelAndPay();
  }, [clientSelected, clientSelected, listItems]);

  function questionAlert(title) {
    MySwal.fire({
      title: title,
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Venda cancelada!", "", "success");
		  clearSale()
      }
    });
  }

  function clearSale() {
    setSellerSelected("");
    setClientSelected("");
    clearListItem();
  }

  const handleButtonCancelAndPay = () => {
    if (
      listItems.length > 0 &&
      clientSelected !== "" &&
      sellerSelected !== ""
    ) {
      setStatusButtonCancel(false);
      setStatusButtonPay(false);
    } else {
      setStatusButtonCancel(true);
      setStatusButtonPay(true);
    }
  };

  const handleClientSelected = (event) => {
    setClientSelected(event.target.value);
  };

  const handleSellerSelected = (event) => {
    setSellerSelected(event.target.value);
  };

  const getClients = () => {
    axios.get(process.env.REACT_APP_URL_BASE + "clients").then((result) => {
      setClients(result.data);
    });
  };

  const getSellers = () => {
    axios.get(process.env.REACT_APP_URL_BASE + "sellers").then((result) => {
      setSellers(result.data);
    });
  };

  const onPayment = () => {
    if (listItems.length > 0) {
      var orders = Array();
      listItems.forEach((element) => {
        var order = Array();
        order.push(element.id);
        order.push(element.qtd);
        orders.push(order);
      });
      var payload = {};
      payload.client = clientSelected;
      payload.seller = sellerSelected;
      payload.orders = orders;

      console.log(payload);

      axios
        .post(process.env.REACT_APP_URL_BASE + "sales/", payload)
        .then((res) => {
          if (res.status === 201) {
            clearSale();
            basicAlert("Venda realizada com sucesso", "", "success");
          } else {
            basicAlert("Erro ao realizar a venda", "", "error");
          }
        })
        .catch(() => {
          basicAlert("Erro ao realizar a venda", "", "error");
        });
    } else {
      basicAlert("Você não tem itens na sua lista de compras", "", "error");
    }
  };

  const handleCancelSale = () => {
    questionAlert("Deseja cancelar a venda?");
  };

  return (
    <>
      <h3>Dados da Venda</h3>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <InputLabel style={{ width: "100%", fontSize: 12 }}>
            Escolha um vendedor
          </InputLabel>
          <FormControl sx={{ m: 0, minWidth: 350 }} size="small">
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sellerSelected}
              onChange={handleSellerSelected}
            >
              {sellers.map((client) => (
                <MenuItem value={client.id}>{client.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <InputLabel style={{ width: "100%", fontSize: 12 }}>
            Escolha um cliente
          </InputLabel>
          <FormControl sx={{ m: 0, minWidth: 350 }} size="small">
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clientSelected}
              onChange={handleClientSelected}
            >
              {clients.map((seller) => (
                <MenuItem value={seller.id}>{seller.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={7} style={{ marginTop: "40px" }}>
        <Grid item xs={9}>
          <h4>Valor Total da Venda</h4>
        </Grid>
        <Grid item xs={3}>
          <h3>{formatCoin(total)}</h3>
        </Grid>
        <Grid item xs={9}>
          <Button
            onClick={() => handleCancelSale()}
            variant="contained"
            disabled={statusButtonCancel}
            style={{
              marginTop: "25px",
              textTransform: "none",
              borderRadius: 0,
              fontSize: 15,
            }}
          >
            Cancelar
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={() => onPayment()}
            variant="contained"
            color="success"
            disabled={statusButtonPay}
            style={{
              marginTop: "25px",
              textTransform: "none",
              borderRadius: 0,
              fontSize: 15,
            }}
          >
            Finalizar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
