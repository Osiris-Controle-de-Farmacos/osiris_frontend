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
} from "@material-ui/core";

import { Search, Add } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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

function Medicines() {
	const [open, setOpen] = useState(false);
	const [modalId, setModalId] = useState(0);
	const [openMedicine, setOpenMedicine] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [medicines, setMedicines] = useState({
		list: Array<Medicine>(),
	});
	const classes = useStyles();
	const handleClose = () => setOpen(false);
	const addMedicine = () => setOpenMedicine(true);
	const handleCloseMedicineModal = () => setOpenMedicine(false);
	useEffect(() => {
		api.get("medicines").then((response) => {
			setMedicines({
				list: response.data,
			});
		});
	}, []);
	function openMedicineModal(id: number) {
		setOpen(true);
		setModalId(id);
		console.log(id);
	}
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
										.filter((medicine) => medicine.name.includes(searchText))
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
														<IconButton>
															<Search
																onClick={() => openMedicineModal(row.id)}
															/>
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
					<MedicineModal id={modalId} />
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
					<AddMedicineModal />
				</Fade>
			</Modal>
		</Container>
	);
}

export default Medicines;
