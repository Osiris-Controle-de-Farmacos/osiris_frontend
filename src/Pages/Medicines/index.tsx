import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Grid,
	Container,
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Modal,
	Fade,
	Backdrop,
	IconButton,
	CircularProgress,
	Snackbar,
} from "@material-ui/core";

import { Search, Add } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import MedicineModal from "./components/MedicineModal";
import AddMedicineModal from "./components/AddMedicineModal";
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
	description: string;
	amount: number;
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Medicines() {
	const [open, setOpen] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [modalId, setModalId] = useState(0);
	const [openMedicine, setOpenMedicine] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [medicines, setMedicines] = useState({
		list: Array<Medicine>(),
	});
	const classes = useStyles();
	const handleClose = () => setOpen(false);
	const addMedicine = () => setOpenMedicine(true);
	const handleCloseMedicineModal = () => setOpenMedicine(false);

	useEffect(() => {
		loadMedicines();
	}, []);

	function loadMedicines() {
		api.get("medicines").then((response) => {
			setMedicines({
				list: response.data,
			});
		});
	}

	function openMedicineModal(id: number) {
		setOpen(true);
		setModalId(id);
	}

	const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setAlertOpen(false);
	};
	return (
		<Container maxWidth="lg">
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				alignContent="center"
				spacing={1}
			>
				<Grid item xs={12} md={9}>
					<TextField
						label="Pesquise por um medicamento"
						fullWidth
						margin="normal"
						variant="outlined"
						size="small"
						onChange={(e) => setSearchText(e.currentTarget.value)}
					/>
				</Grid>

				<Grid xs={12} md={3} item>
					<Button
						variant="contained"
						color="secondary"
						size="medium"
						endIcon={<Add />}
						fullWidth
						onClick={addMedicine}
					>
						Adicionar Medicação
					</Button>
				</Grid>
			</Grid>
			<Box mb="20px">
				{medicines.list.length === 0 ? (
					<Box display="flex" justifyContent="center">
						<CircularProgress />
					</Box>
				) : (
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
									{medicines.list
										.filter((medicine) =>
											medicine.name
												.toLowerCase()
												.includes(searchText.toLowerCase())
										)
										.map((row) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.id}
												>
													<TableCell align="center">{row.name}</TableCell>
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
														<IconButton
															onClick={() => openMedicineModal(row.id)}
														>
															<Search />
														</IconButton>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				)}
			</Box>
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
					<MedicineModal
						id={modalId}
						setOpen={setOpen}
						loadMedicines={loadMedicines}
						setAlertOpen={setAlertOpen}
						setAlertMessage={setAlertMessage}
					/>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={openMedicine}
				onClose={handleCloseMedicineModal}
				className={classes.modal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openMedicine}>
					<AddMedicineModal
						setOpen={setOpenMedicine}
						loadMedicines={loadMedicines}
						setAlertOpen={setAlertOpen}
						setAlertMessage={setAlertMessage}
					/>
				</Fade>
			</Modal>
			<Snackbar
				open={alertOpen}
				autoHideDuration={6000}
				onClose={handleAlertClose}
			>
				<Alert onClose={handleAlertClose} severity="success">
					{alertMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
}

export default Medicines;
