import React from "react";
import {
	Paper,
	Box,
	Typography,
	Button,
	TextField,
	Divider,
} from "@material-ui/core";

function AddMedicineModal() {
	return (
		<Paper>
			<Box
				p={1}
				width="400px"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Typography variant="h6" gutterBottom>
					Adicionar medicação
				</Typography>
				<Box width="300px">
					<Divider />
				</Box>
				<TextField
					label="Nome da medicação"
					fullWidth
					margin="normal"
					variant="outlined"
					size="small"
				/>
				<Box my={1} width="100%">
					<TextField
						id="standard-number"
						label="Quantidade inicial"
						type="number"
						variant="outlined"
						fullWidth
						size="small"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Box>
				<Box mb={1} width="100%">
					<TextField
						id="outlined-multiline-static"
						label="Descrição"
						multiline
						rows={4}
						variant="outlined"
						fullWidth
					/>
				</Box>
				<Button variant="contained" color="primary">
					Adicionar medicação
				</Button>
			</Box>
		</Paper>
	);
}

export default AddMedicineModal;
