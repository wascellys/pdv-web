import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
	"label + &": {
	  marginTop: theme.spacing(1),
	  fontSize: 12,	  
	},
	"& .MuiInputBase-input": {
	  borderRadius: 4,
	  border: "1px solid #ced4da",
	  fontSize: 20,	 
	},
 }));