import React, { useState, useEffect, useRef } from "react";
import {
	Container,
	Box,
	Paper,
	Grid,
	TextField,
	TableContainer,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Button,
	CircularProgress,
	Typography,
	Snackbar,
} from "@material-ui/core";

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom";
import { Print } from "@material-ui/icons";
import api from "../../services/api";
import ReactToPrint from "react-to-print";
import Logo from "../../Pages/Layout/assets/images/osiris.png";
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
	amount: number;
	dosage: string;
}

interface PrescriptionParams {
	id: string;
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ShowPrescription() {
	const [alertOpen, setAlertOpen] = useState(false);
	const [prescription, setPrescription] = useState({
		medicines: Array<Medicine>(),
	} as Prescription);

	let { id } = useParams<PrescriptionParams>();
	const printRef = useRef<HTMLDivElement>(null);

	function finalizePriscription() {
		api.put(`prescription`, { id: id, status: 1 }).then(() => {
			setAlertOpen(true);
			setPrescription({ ...prescription, status: 1 });
		});
	}

	const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setAlertOpen(false);
	};

	useEffect(() => {
		api.get(`prescription/${id}`).then((response) => {
			const date = new Date(response.data.date);
			const ddmmyyyyDate = `${String(date.getDate()).padStart(2, "0")}/${String(
				date.getMonth() + 1
			).padStart(2, "0")}/${date.getFullYear()}`;
			response.data.formatedDate = ddmmyyyyDate;
			setPrescription(response.data);
		});
	}, [id]);

	return (
		<Container maxWidth="lg">
			{prescription.pacient === undefined ? (
				<Box display="flex" justifyContent="center" mt="10px">
					<CircularProgress />
				</Box>
			) : (
				<Paper ref={printRef}>
					<Box mt="20px" p="20px">
						<Grid>
							<Grid item>
								<Box display="flex" justifyContent="right" displayPrint="none">
									<Box mr="4px">
										<Button
											variant="contained"
											color="primary"
											size="medium"
											onClick={finalizePriscription}
											disabled={prescription.status === 1}
										>
											Finalizar Receita
										</Button>
									</Box>
									<ReactToPrint
										trigger={() => (
											<Button variant="contained" color="primary" size="medium">
												Imprimir receita
												<Print />
											</Button>
										)}
										content={() => printRef.current}
									/>
								</Box>
							</Grid>
						</Grid>
						<Box
							display="none"
							displayPrint="flex"
							justifyContent="center"
							alignItems="center"
							margin="40px"
						>
							<img src={Logo} style={{ width: "90px" }} alt="" />
							<Box display="flex" flexDirection="column" marginLeft="20px">
								<Typography variant="h3" component="h3">
									Osíris
								</Typography>
								<Typography variant="h6" component="h6">
									Controle local de fármacos
								</Typography>
							</Box>
						</Box>
						<Grid item>
							<Box display="flex">
								<Box>
									<TextField
										id="date"
										label="Data"
										style={{ margin: 8 }}
										value={prescription.formatedDate}
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
										value={prescription.pacient}
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
								value={prescription.name}
								style={{ margin: 8 }}
								margin="normal"
								fullWidth
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item>
							<TableContainer>
								<Table stickyHeader aria-label="sticky table">
									<TableBody>
										{prescription.medicines.map((row) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.id}
												>
													<TableCell align="center">{row.name}</TableCell>
													<TableCell style={{ width: "40%" }}>
														<Box style={{ borderBottom: "1px dashed #333" }} />
													</TableCell>
													<TableCell>{row.dosage}</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item>
							<Box
								mt="80px"
								display="flex"
								alignItems="center"
								justifyContent="center"
								flexDirection="column"
							>
								<Box width="50%" borderBottom={1} />
								<Typography variant="subtitle1">Assinatura</Typography>
							</Box>
						</Grid>
					</Box>
					<Snackbar
						open={alertOpen}
						autoHideDuration={6000}
						onClose={handleAlertClose}
					>
						<Alert onClose={handleAlertClose} severity="success">
							Receita finalizada
						</Alert>
					</Snackbar>
				</Paper>
			)}
		</Container>
	);
}

export default ShowPrescription;
