import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
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
} from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MedicineModal from "./components/MedicineModal";
import AddMedicineModal from "./components/AddMedicineModal";
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
];

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
function Medicines() {
	const [open, setOpen] = useState(false);
	const [openMedicine, setOpenMedicine] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [filteredMedicines, setFilteredMedicines] = useState({
		medicines: rows,
	});
	const classes = useStyles();
	const handleClose = () => setOpen(false);
	const addMedicine = () => setOpenMedicine(true);
	const handleCloseMedicineModal = () => setOpenMedicine(false);
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
							{filteredMedicines.medicines.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										<TableCell align="center">{row.medicine}</TableCell>
										<TableCell align="center">
											{row.amount > 300 ? (
												<Box
													component="span"
													p={1}
													borderRadius="2px"
													style={{ backgroundColor: "#11871D", color: "white" }}
												>
													{row.amount} unidades disponíveis
												</Box>
											) : row.amount > 100 ? (
												<Box
													component="span"
													p={1}
													borderRadius="2px"
													style={{ backgroundColor: "#FF9F1C", color: "white" }}
												>
													{row.amount} unidades disponíveis
												</Box>
											) : (
												<Box
													component="span"
													p={1}
													borderRadius="2px"
													style={{ backgroundColor: "#BB0000", color: "white" }}
												>
													{row.amount} unidades disponíveis
												</Box>
											)}
										</TableCell>
										<TableCell align="center">
											<IconButton>
												<Search onClick={() => setOpen(true)} />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
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
					<MedicineModal medicine={"ASPIRINA"} amount={202} />
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
