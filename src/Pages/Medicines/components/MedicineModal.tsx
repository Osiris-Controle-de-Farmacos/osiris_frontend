import React, { useState, useEffect } from "react";
import {
	Paper,
	Box,
	Typography,
	Divider,
	Button,
	Grid,
	IconButton,
	CircularProgress,
} from "@material-ui/core";

import { Delete, AddCircle, RemoveCircle } from "@material-ui/icons";
import api from "../../../services/api";

interface MedicineModalProps {
	id: number;
	setOpen: (value: boolean) => void;
	loadMedicines: () => void;
	setAlertOpen: (value: boolean) => void;
	setAlertMessage: (value: string) => void;
}

function MedicineModal(props: MedicineModalProps) {
	const [medicine, setMedicine] = useState("");
	const [amount, setAmount] = useState(0);
	const [showSaveButton, setShowSaveButton] = useState(false);

	function removeMedication() {
		api.delete(`medicine/${props.id}`).then(() => {
			props.setOpen(false);
			props.setAlertMessage("Mecicamento removido");
			props.setAlertOpen(true);
			props.loadMedicines();
		});
	}

	function changeMedicine() {
		api
			.put(`medicine`, {
				id: props.id,
				amount: amount,
			})
			.then((response) => {
				props.setAlertMessage("Unidades disponíveis de medicamento alteradas");
				props.setAlertOpen(true);
				props.loadMedicines();
			});
	}

	useEffect(() => {
		api.get(`medicine/${props.id}`).then((response) => {
			setMedicine(response.data.name);
			setAmount(response.data.amount);
		});
	}, []);

	return (
		<Paper>
			{medicine === "" ? (
				<Box
					width="400px"
					height="250px"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress />
				</Box>
			) : (
				<Box
					p={3}
					width="400px"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="h6">{medicine}</Typography>
					<Box mb={4} width="200px">
						<Divider style={{ height: "2px" }} />
					</Box>
					<Box>
						<Grid container alignItems="center" direction="row" spacing={1}>
							<Grid item>
								<IconButton
									arial-label="Remover uma unidade"
									onClick={() => {
										setAmount(amount - 1);
										setShowSaveButton(true);
									}}
								>
									<RemoveCircle />
								</IconButton>
							</Grid>
							<Grid item>
								{amount > 300 ? (
									<Box
										component="span"
										p={1}
										borderRadius="2px"
										style={{
											backgroundColor: "#11871D",
											color: "white",
										}}
									>
										{amount} unidades disponíveis
									</Box>
								) : amount > 100 ? (
									<Box
										component="span"
										p={1}
										borderRadius="2px"
										style={{
											backgroundColor: "#FF9F1C",
											color: "white",
										}}
									>
										{amount} unidades disponíveis
									</Box>
								) : (
									<Box
										component="span"
										p={1}
										borderRadius="2px"
										style={{
											backgroundColor: "#BB0000",
											color: "white",
										}}
									>
										{amount} unidades disponíveis
									</Box>
								)}
							</Grid>
							<Grid item>
								<IconButton
									arial-label="Adicionar uma unidade"
									onClick={() => {
										setAmount(amount + 1);
										setShowSaveButton(true);
									}}
								>
									<AddCircle />
								</IconButton>
							</Grid>
						</Grid>
					</Box>
					<Box
						mt={2}
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
					>
						<Box mb="5px" display={showSaveButton ? "inline" : "none"}>
							<Button
								variant="contained"
								color="secondary"
								onClick={changeMedicine}
							>
								Salvar unidades
							</Button>
						</Box>
						<Button
							variant="contained"
							color="primary"
							onClick={removeMedication}
						>
							Remover medicação &#160;
							<Delete style={{ fontSize: 20 }} />
						</Button>
					</Box>
				</Box>
			)}
		</Paper>
	);
}

export default MedicineModal;
