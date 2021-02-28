import React, { useState } from "react";
import {
	Paper,
	Box,
	Typography,
	Divider,
	TextField,
	Button,
} from "@material-ui/core";

interface Medicine {
	id: number;
	name: string;
	amount: number;
	dosage: string;
}

interface DosageModalProps {
	medicine: Medicine;
	medicines: { list: Array<Medicine> };
	setMedicines: (value: { list: Array<Medicine> }) => void;
	setOpen: (value: boolean) => void;
}

function DosageModal({
	medicine,
	medicines,
	setMedicines,
	setOpen,
}: DosageModalProps) {
	const [dosage, setDosage] = useState("");
	function addMedicine() {
		setMedicines({
			list: medicines.list.concat({ ...medicine, dosage: dosage }),
		});
		setOpen(false);
	}
	return (
		<Paper>
			<Box
				p={3}
				width="400px"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Typography variant="h6" gutterBottom>
					{medicine.name}
				</Typography>
				<Box mb={2} width="200px">
					<Divider style={{ height: "2px" }} />
				</Box>
				{medicine.amount > 300 ? (
					<Box
						component="span"
						p={1}
						borderRadius="2px"
						style={{
							backgroundColor: "#11871D",
							color: "white",
						}}
					>
						{medicine.amount} unidades disponíveis
					</Box>
				) : medicine.amount > 100 ? (
					<Box
						component="span"
						p={1}
						borderRadius="2px"
						style={{
							backgroundColor: "#FF9F1C",
							color: "white",
						}}
					>
						{medicine.amount} unidades disponíveis
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
						{medicine.amount} unidades disponíveis
					</Box>
				)}
				<Box my={2} width="100%">
					<TextField
						id="outlined-multiline-static"
						label="Posologia"
						multiline
						rows={4}
						variant="outlined"
						fullWidth
						onChange={(e) => setDosage(e.currentTarget.value)}
					/>
				</Box>
				<Button
					variant="contained"
					color="primary"
					style={{ backgroundColor: "#130F73" }}
					onClick={addMedicine}
				>
					Adicionar a receita
				</Button>
			</Box>
		</Paper>
	);
}

export default DosageModal;
