import React from "react";
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
} from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";

interface Data {
	id: number;
	date: string;
	pacient: string;
	medicines: Array<string>;
	status: number;
}
const autocompleteop = ["Dipirona", "Chá de pea"];

const rows: Data[] = [
	{
		id: 0,
		date: "2020-02-03",
		pacient: "Joao da 12",
		medicines: ["Parecetamal 40mg de manha"],
		status: 1,
	},
	{
		id: 1,
		date: "2020-02-03",
		pacient: "DJ AZEITONA",
		medicines: ["Parecetamal 40mg de manha"],
		status: 1,
	},
	{
		id: 2,
		date: "2020-02-03",
		pacient: "MC POZE DO RODOO",
		medicines: ["Pitbuflol 20mg de noite"],
		status: 1,
	},
];

function Medicines() {
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
				<Grid item xs={12} md={7}>
					<Autocomplete
						freeSolo
						id="free-solo-2-demo"
						disableClearable
						options={autocompleteop.map((option) => option)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Pesquise por uma receita"
								margin="normal"
								variant="outlined"
								size="small"
								InputProps={{ ...params.InputProps, type: "search" }}
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12} md={2}>
					<Button
						variant="contained"
						color="primary"
						size="medium"
						endIcon={<Search />}
						fullWidth
					>
						Pesquisar
					</Button>
				</Grid>

				<Grid xs={12} md={3} item>
					<Button
						variant="contained"
						color="secondary"
						size="medium"
						endIcon={<Add />}
						fullWidth
					>
						Nova receita
					</Button>
				</Grid>
			</Grid>
			<Paper>
				<TableContainer>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell align="center">
									<b>Data</b>
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
							{rows.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										<TableCell align="center">{row.date}</TableCell>
										<TableCell align="center">{row.pacient}</TableCell>
										<TableCell align="center">
											{row.medicines.map((medicine) => {
												return <>{medicine}</>;
											})}
										</TableCell>
										<TableCell align="center">
											{row.status === 1
												? "Status 01"
												: row.status === 2
												? "Status 02"
												: "Status 03"}
										</TableCell>
										<TableCell align="center">
											<Search />
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
}

export default Medicines;
