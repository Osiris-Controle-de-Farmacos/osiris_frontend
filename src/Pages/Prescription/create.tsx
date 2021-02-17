import React from "react";
import { useState } from "react";
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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
import DosageModal from "./components/DosageModal";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
function CreatePrescription() {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	interface Data {
		id: number;
		medicine: string;
		amount: number;
		dosage: string;
	}
	const autocompleteop = ["Dipirona", "Chá de pea"];
	const handleClose = () => {
		setOpen(false);
	};
	const rows: Data[] = [
		{ id: 0, medicine: "Dipirona", amount: 301, dosage: "40mg 1 vez de manhã" },
		{
			id: 1,
			medicine: "Paracetamol",
			amount: 200,
			dosage: "40mg 1 vez de manhã",
		},
		{
			id: 1,
			medicine: "Propanolol",
			amount: 100,
			dosage: "40mg 1 vez de manhã",
		},
	];
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
										style={{ margin: 8 }}
										type="date"
										defaultValue="2021-01-01"
										InputLabelProps={{
											shrink: true,
										}}
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
								disableClearable
								options={autocompleteop.map((option) => option)}
								onChange={() => {
									setOpen(true);
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
										{rows.map((row) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.id}
												>
													<TableCell align="center">{row.medicine}</TableCell>
													<TableCell>{row.dosage}</TableCell>
													<TableCell align="center">
														{row.amount > 300 ? (
															<Box
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
													</TableCell>
													<TableCell align="center">
														<Delete />
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
					<DosageModal medicine={"ASPIRINA"} amount={202} />
				</Fade>
			</Modal>
		</Container>
	);
}

export default CreatePrescription;
