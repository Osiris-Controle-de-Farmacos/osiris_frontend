import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
	TextField,
	Button,
	Grid,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Box,
	CircularProgress,
	IconButton,
} from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import api from "../../services/api";

interface Prescription {
	id: number;
	date: string;
	pacient: string;
	status: number;
	name: string;
	medicines: Array<Medicine>;
	formatedDate?: string;
}

interface Medicine {
	id: number;
	name: string;
	description: string;
	dosage: string;
}

function Prescriptions() {
	const history = useHistory();
	const [prescriptions, setPrescriptions] = useState({
		list: Array<Prescription>(),
	});
	const [searchText, setSearchText] = useState("");

	function openPrescription(id: number) {
		history.push(`prescription/show/${id}`);
	}

	function createNewPrescription() {
		history.push("prescription/create");
	}

	function filterPrescriptions(
		prescriptions: Array<Prescription>,
		searchText: string
	) {
		searchText = searchText.toLowerCase();
		return prescriptions.filter((prescription) => {
			let medicines = "";
			for (const medicine of prescription.medicines) {
				medicines += medicine.name.toLocaleLowerCase();
			}

			return (
				medicines.includes(searchText) ||
				String(prescription.id).includes(searchText) ||
				prescription.formatedDate?.includes(searchText) ||
				prescription.name.toLowerCase().includes(searchText) ||
				prescription.pacient.toLowerCase().includes(searchText)
			);
		});
	}

	useEffect(() => {
		api.get("prescriptions").then((response) => {
			response.data.forEach((prescription: Prescription) => {
				const date = new Date(prescription.date);
				const ddmmyyyyDate = `${String(date.getDate()).padStart(
					2,
					"0"
				)}/${String(date.getMonth() + 1).padStart(
					2,
					"0"
				)}/${date.getFullYear()}`;
				prescription.formatedDate = ddmmyyyyDate;
			});

			setPrescriptions({
				list: response.data,
			});
		});
	}, []);

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
				<Grid item xs={12} md={9}>
					<TextField
						label="Pesquisar receita"
						placeholder="Pesquise pelo código, data, nome do paciente, nome do médico ou medicamentos"
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
						onClick={createNewPrescription}
						fullWidth
					>
						Nova receita
					</Button>
				</Grid>
			</Grid>
			{prescriptions.list.length === 0 ? (
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
										<b>Código</b>
									</TableCell>
									<TableCell align="center">
										<b>Data</b>
									</TableCell>
									<TableCell align="center">
										<b>Médico</b>
									</TableCell>
									<TableCell align="center">
										<b>Paciente</b>
									</TableCell>
									<TableCell align="center">
										<b>Medicamentos</b>
									</TableCell>
									<TableCell align="center">
										<b>Status</b>
									</TableCell>
									<TableCell align="center">
										<b>Visualizar</b>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filterPrescriptions(prescriptions.list, searchText).map(
									(prescription) => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={prescription.id}
											>
												<TableCell align="center">{prescription.id}</TableCell>
												<TableCell align="center">
													{prescription.formatedDate}
												</TableCell>
												<TableCell align="center">
													{prescription.name}
												</TableCell>
												<TableCell align="center">
													{prescription.pacient}
												</TableCell>
												<TableCell align="center">
													{prescription.medicines.map((medicine) => {
														return (
															<p>
																{medicine.name}, {medicine.dosage}
															</p>
														);
													})}
												</TableCell>
												<TableCell align="center">
													<Box
														display="flex"
														alignItems="center"
														justifyContent="center"
													>
														{prescription.status == 0 ? (
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
																Aguardando retirada
															</Box>
														) : prescription.status == 1 ? (
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
																Finalizada
															</Box>
														) : (
															""
														)}
													</Box>
												</TableCell>
												<TableCell align="center">
													<IconButton
														onClick={() => openPrescription(prescription.id)}
													>
														<Search />
													</IconButton>
												</TableCell>
											</TableRow>
										);
									}
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			)}
		</Container>
	);
}

export default Prescriptions;
