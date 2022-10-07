import "../Caixa/styles.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { CaixaForm } from "../../components/CaixaForm";
import { CaixaResume } from "../../components/CaixaResume";
import Divider from '@mui/material/Divider';

export const Caixa = () => {
  return (
    <div className="body">
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: "60px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <CaixaForm />
          </Grid>
          <Divider orientation="vertical" flexItem style={{marginTop: '40px'}}>            
          </Divider>
          <Grid item xs={12} md={3}>
            <CaixaResume />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
