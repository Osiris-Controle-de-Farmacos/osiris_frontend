import React, { useState } from "react";
import {
	Paper,
	Box,
	Typography,
	Button,
	TextField,
	Divider,
} from "@material-ui/core";
import api from "../../../services/api";

interface AddMedicineModalProps {
	setOpen: (value: boolean) => void;
	loadMedicines: () => void;
	setAlertOpen: (value: boolean) => void;
	setAlertMessage: (value: string) => void;
}

function AddMedicineModal(props: AddMedicineModalProps) {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");

	function createMedication() {
		props.setOpen(false);
		api
			.post("/medicine", {
				name: name,
				description: description,
				initialAmount: amount,
			})
			.then(() => {
				props.loadMedicines();
				props.setAlertMessage("Medicamento adicionado");
				props.setAlertOpen(true);
			});
	}

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
					onChange={(e) => setName(e.currentTarget.value)}
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
						onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
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
						onChange={(e) => setDescription(e.currentTarget.value)}
					/>
				</Box>
				<Button variant="contained" color="primary" onClick={createMedication}>
					Adicionar medicação
				</Button>
			</Box>
		</Paper>
	);
}

export default AddMedicineModal;
