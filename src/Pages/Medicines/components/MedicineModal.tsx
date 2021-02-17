import React from "react";
import {
	Paper,
	Box,
	Typography,
	Divider,
	Button,
	Grid,
	IconButton,
} from "@material-ui/core";

import { Delete, AddCircle, RemoveCircle } from "@material-ui/icons";
interface MedicineModalProps {
	medicine: string;
	amount: number;
}

const MedicineModal: React.FC<MedicineModalProps> = ({ medicine, amount }) => {
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
				<Typography variant="h6">{medicine}</Typography>
				<Box mb={4} width="200px">
					<Divider style={{ height: "2px" }} />
				</Box>
				<Box>
					<Grid container alignItems="center" direction="row" spacing={1}>
						<Grid item>
							<IconButton arial-label="Remover uma unidade">
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
							<IconButton arial-label="Adicionar uma unidade">
								<AddCircle />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
				<Box mt={6}>
					<Button variant="contained" color="primary">
						Remover medicação &#160;
						<Delete style={{ fontSize: 20 }} />
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};

export default MedicineModal;
