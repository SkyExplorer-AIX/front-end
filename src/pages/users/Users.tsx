import {Box, Button, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90},
    {field: 'firstName', headerName: 'Prenom', width: 150},
    {field: 'lastName', headerName: 'Nom', width: 150},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'role', headerName: 'Role', width: 150},
    {field: 'phoneNumber', headerName: 'Telephone', width: 150},
    {field: 'address', headerName: 'Adresse', width: 150},
];

export default function Users() {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                width={'95%'}
                marginBottom={2}
            >
                <Typography variant="h5" color="primary">
                    Gestion des utilisateurs
                </Typography>
                <Button variant="contained" color="secondary">
                    Créer un utilisateur
                </Button>
            </Box>
            <Box
                width={"95%"}
                height={"100%"}
            >
                <DataGrid columns={columns} rows={[]} pageSize={5} checkboxSelection={true}/>
            </Box>
        </Box>
    );
}