import React from 'react';
import { Box, Button, TextField, Typography, Grid } from '@material-ui/core';

function Home() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="40px">
      <Box width="480px">
        <Box display="flex" justifyContent="center" marginBottom="40px">
          <Typography variant="h5" component="h1">
            Bem vindo general tamo junto
        </Typography>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Box width="75%">
            <Grid
              container
              direction="column"
              spacing={1}
            >
              <Grid item>
                <Button variant="contained" color="primary" size="large" fullWidth>
                  Receitar
            </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="large" fullWidth>
                  Visualizar Receitar
            </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="large" fullWidth>
                  Visualizar Medicações
            </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default Home;