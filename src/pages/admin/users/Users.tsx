import {Box, Button, SelectChangeEvent, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CreateUserModal from "../../../components/modals/CreateUserModal.tsx";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phoneNumber: string;
    address: string;
}

export default function Users() {

    const columns: GridColDef[] = [
        {field: 'firstName', headerName: 'Prenom', width: 150},
        {field: 'lastName', headerName: 'Nom', width: 150},
        {field: 'email', headerName: 'Email', width: 150},
        {field: 'role', headerName: 'Role', width: 150},
        {field: 'phoneNumber', headerName: 'Telephone', width: 150, sortable: false, filterable: false},
        {field: 'address', headerName: 'Adresse', width: 300, sortable: false, filterable: false},
        {field: 'createdAt', headerName: 'Crée le', width: 150, sortable: true},
        {
            field: 'modify',
            headerName: 'Modifier',
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleDelete(params.row.email)}
                >
                    Modifier
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Supprimer',
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(params.row.email)}
                >
                    Supprimer
                </Button>
            ),
        },
    ] as GridColDef[];

    const [row, setRow] = useState<User[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [role, setRole] = useState<string>("student");

    const [success] = useState<boolean>(false);
    const [error] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const fetchUsers = async () => {
        const data = {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }
        const response = axios.get('http://localhost:4000/v1/user/all', data);
        response.then((response) => {
            const users = response.data;
            setRow(users);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDelete = (email: string) => {
        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }
        const response = axios.delete(`http://localhost:4000/v1/user/delete/${email}`, config);
        response.then(() => {
            fetchUsers();
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <CreateUserModal
                open={modalOpen}
                onClose={handleClose}
                role={role}
                setRole={setRole}
                success={success}
                error={error}
                password={password}
                setPassword={setPassword}
                fetchUsers={fetchUsers}
            />
            <Box
                display={"flex"}
                flexDirection={"column"}
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
                    <Button variant="contained" color="secondary" onClick={handleOpen}>
                        Créer un utilisateur
                    </Button>
                </Box>
                <Box
                    height={"80%"}
                    width={"95%"}
                >
                    <DataGrid
                        columns={columns}
                        rows={row ? row : []}
                        pageSize={5}
                        getRowId={(row) => row.email}
                        checkboxSelection={true}
                        loading={loading}
                        disableColumnSelector={true}
                        rowsPerPageOptions={[5, 10, 20]}
                        sx={
                            {
                                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                                    display: "none"
                                }
                            }
                        }
                    />
                </Box>
            </Box>
        </>
    );
}