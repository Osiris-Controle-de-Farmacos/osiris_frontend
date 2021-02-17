import React from "react";
import {
	Paper,
	Box,
	Typography,
	Divider,
	TextField,
	Button,
} from "@material-ui/core";
interface DosageModalProps {
	medicine: string;
	amount: number;
}
const DosageModal: React.FC<DosageModalProps> = ({ medicine, amount }) => {
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
					{medicine}
				</Typography>
				<Box mb={2} width="200px">
					<Divider style={{ height: "2px" }} />
				</Box>
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
				<Box my={2} width="100%">
					<TextField
						id="outlined-multiline-static"
						label="Posologia"
						multiline
						rows={4}
						variant="outlined"
						fullWidth
					/>
				</Box>
				<Button
					variant="contained"
					color="primary"
					style={{ backgroundColor: "#130F73" }}
				>
					Adicionar a receita
				</Button>
			</Box>
		</Paper>
	);
};

export default DosageModal;
