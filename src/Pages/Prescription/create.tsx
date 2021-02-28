import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
	Container,
	Box,
	Paper,
	Grid,
	TextField,
	TableContainer,
	TableRow,
	TableCell,
	Table,
	TableBody,
	Button,
	IconButton,
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
import DosageModal from "./components/DosageModal";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import api from "../../services/api";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
);

interface Medicine {
	id: number;
	name: string;
	amount: number;
	dosage: string;
}

function CreatePrescription() {
	const history = useHistory();
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [pacient, setPacient] = useState("");
	const [date, setDate] = useState(() => {
		const currentDate = new Date();
		const parsedDate = `${currentDate.getFullYear()}-${String(
			currentDate.getMonth()
		).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
		return parsedDate;
	});

	const [medicines, setMedicines] = useState({
		list: Array<Medicine>(),
	});

	const [allMedicines, setAllMedicines] = useState({
		list: Array<Medicine>(),
	});

	const [autocompleteMedicine, setAutocompleteMedicine] = useState(
		{} as Medicine
	);

	function handleClose() {
		setOpen(false);
	}

	function openDosageModal(medicine: Medicine) {
		setAutocompleteMedicine(medicine);
		setOpen(true);
	}

	function removeMedicine(id: number) {
		setMedicines({
			list: medicines.list.filter((medicine) => medicine.id != id),
		});
	}

	function createMedicine() {
		const body = {
			prescription: {
				date: date,
				pacient: pacient,
				status: 0,
				idDoctor: 2,
			},
			medicines: medicines.list,
		};
		api.post("/prescription", body).then((response) => {
			history.push(`/prescription/show/${response.data.id}`);
		});
	}

	useEffect(() => {
		api.get("medicines").then((response) => {
			setAllMedicines({
				list: response.data,
			});
		});
	}, []);

	return (
		<Container maxWidth="lg">
			<Paper>
				<Box mt="20px" p="20px">
					<Grid>
						<Grid item>
							<Box display="flex">
								<Box>
									<TextField
										id="date"
										label="Data"
										defaultValue={date}
										style={{ margin: 8 }}
										type="date"
										InputLabelProps={{
											shrink: true,
										}}
										onChange={(e) => setDate(e.currentTarget.value)}
									/>
								</Box>
								<Box flexGrow={1}>
									<TextField
										label="Nome do paciente"
										style={{ margin: 8 }}
										placeholder="Nome do paciente"
										margin="normal"
										fullWidth
										InputLabelProps={{
											shrink: true,
										}}
										onChange={(e) => setPacient(e.currentTarget.value)}
									/>
								</Box>
							</Box>
						</Grid>
						<Grid item>
							<TextField
								label="Médico"
								defaultValue="Dr(a) Márcio Tanure"
								disabled
								style={{ margin: 8 }}
								margin="normal"
								fullWidth
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item>
							<Autocomplete
								freeSolo
								id="free-solo-2-demo"
								value={autocompleteMedicine}
								options={allMedicines.list}
								getOptionLabel={(option) => option.name}
								onChange={(e, value) => {
									openDosageModal(value as Medicine);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Pesquise por um medicamento"
										margin="normal"
										variant="outlined"
										size="small"
										InputProps={{
											...params.InputProps,
											type: "search",
										}}
									/>
								)}
							/>

							<TableContainer>
								<Table stickyHeader aria-label="sticky table">
									<TableBody>
										{medicines.list.map((row) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.id}
												>
													<TableCell align="center">{row.name}</TableCell>
													<TableCell align="center">{row.dosage}</TableCell>
													<TableCell align="center">
														<Box
															display="flex"
															alignItems="center"
															justifyContent="center"
														>
															{row.amount > 300 ? (
																<Box
																	display="block"
																	minWidth="180px"
																	component="span"
																	p={1}
																	borderRadius="2px"
																	style={{
																		backgroundColor: "#11871D",
																		color: "white",
																	}}
																>
																	{row.amount} unidades disponíveis
																</Box>
															) : row.amount > 100 ? (
																<Box
																	display="block"
																	minWidth="180px"
																	component="span"
																	p={1}
																	borderRadius="2px"
																	style={{
																		backgroundColor: "#FF9F1C",
																		color: "white",
																	}}
																>
																	{row.amount} unidades disponíveis
																</Box>
															) : (
																<Box
																	display="block"
																	minWidth="180px"
																	component="span"
																	p={1}
																	borderRadius="2px"
																	style={{
																		backgroundColor: "#BB0000",
																		color: "white",
																	}}
																>
																	{row.amount} unidades disponíveis
																</Box>
															)}
														</Box>
													</TableCell>
													<TableCell align="center">
														<IconButton>
															<Delete onClick={() => removeMedicine(row.id)} />
														</IconButton>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item>
							<Box mt="5px" alignSelf="right">
								<Button
									variant="contained"
									color="primary"
									fullWidth
									size="large"
									onClick={createMedicine}
								>
									Criar receita
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Paper>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				className={classes.modal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<DosageModal
						medicine={autocompleteMedicine}
						medicines={medicines}
						setMedicines={setMedicines}
						setOpen={setOpen}
					/>
				</Fade>
			</Modal>
		</Container>
	);
}

export default CreatePrescription;
