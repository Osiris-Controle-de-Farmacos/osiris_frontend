import React from 'react';
import { Alert, Autocomplete } from '@material-ui/lab';
import {
  TextField,
  Button,
  Grid,
  Hidden,
  IconButton,
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Snackbar
} from '@material-ui/core';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import { Search, Add } from '@material-ui/icons';

interface Data {
  id: number;
  medicine: string;
  amount: number;
}
const autocompleteop = ["Dipirona", "Chá de pea"];

const rows: Data[] = [
  { id: 0, medicine: "Dipirona", amount: 301 },
  { id: 1, medicine: "Paracetamol", amount: 200 },
  { id: 1, medicine: "Propanolol", amount: 100 },
]

function Medicines() {

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing={1}
      >
        <Grid
          item
          xs={12}
          md={7}
        >
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={autocompleteop.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pesquise por um medicamento"
                margin="normal"
                variant="outlined"
                size="small"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
        >
          <Button
            variant="contained"
            color="primary"
            size="medium"
            endIcon={<Search />}
            fullWidth
          >
            Pesquisar
          </Button>
        </Grid>

        <Grid
          xs={12}
          md={3}
          item
        >
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            endIcon={<Add />}
            fullWidth
          >
            Adicionar Medicação
      </Button>
        </Grid>
      </Grid>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Medicamento</b>
                </TableCell>
                <TableCell align="center">
                  <b>Quantidade</b>
                </TableCell>
                <TableCell align="center">
                  <b>Visualizar</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="center">
                      {row.medicine}
                    </TableCell>
                    <TableCell align="center">
                      {(row.amount > 300) ? (
                        <Box component="span" p={1} borderRadius="2px" style={{ backgroundColor: "#11871D", color: "white" }}>
                          {row.amount} unidades disponíveis
                        </Box>
                      ) : (row.amount > 100) ?
                          <Box component="span" p={1} borderRadius="2px" style={{ backgroundColor: "#FF9F1C", color: "white" }}>
                            {row.amount} unidades disponíveis
                          </Box> :
                          <Box component="span" p={1} borderRadius="2px" style={{ backgroundColor: "#BB0000", color: "white" }}>
                            {row.amount} unidades disponíveis
                          </Box>
                      }
                    </TableCell>
                    <TableCell align="center">
                      <Search />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container >
  )
}

export default Medicines;