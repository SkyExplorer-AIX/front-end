import {Box, Button, Modal, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {MenuItem} from "@mui/material";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phoneNumber: string;
    address: string;
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px #000',
    boxShadow: 24,
    p: 4,
};

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
            field: 'delete',
            headerName: '',
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

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };
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

    const generatePassword = () => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = "";
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(password);
    }

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

    const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            phoneNumber: formData.get('phoneNumber'),
            role: role
        }
        const config = {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }
        const response = axios.post('http://localhost:4000/v1/user/', data, config);
        response.then(() => {
            handleClose();
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                handleClose();
            }, 5000);
            fetchUsers();
        }).catch((error) => {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
            console.log(error);
            fetchUsers();
        });

    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={(_, reason) => reason === 'backdropClick' && handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Nouvelle utilisateur
                    </Typography>
                    {success &&
                        <Typography variant="h6" color="success">Utilisateur créé avec succès</Typography>}
                    {error &&
                        <Typography variant="h6" color="error">Erreur lors de la création de l'utilisateur</Typography>}
                    <Box component={"form"}
                         onSubmit={(e) => {
                             createUser(e);
                             e.preventDefault();
                         }}
                         noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoFocus
                            color={"secondary"}
                        />
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                        >
                            <TextField
                                margin="normal"
                                required
                                sx={{width: "75%"}}
                                name="password"
                                label="Mot de pass"
                                id="password"
                                color={"secondary"}
                                value={password}
                            />
                            <Button
                                variant="contained"
                                color="success"
                                sx={{mt: 3, mb: 2}}
                                onClick={generatePassword}
                            >
                                Generer
                            </Button>
                        </Box>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="Prenom"
                            name="firstName"
                            autoFocus
                            color={"secondary"}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Nom de famille"
                            name="lastName"
                            autoFocus
                            color={"secondary"}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Addresse"
                            name="address"
                            autoFocus
                            color={"secondary"}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Numero de telephone"
                            name="phoneNumber"
                            autoFocus
                            color={"secondary"}
                        />

                        <Select
                            labelId="role"
                            id="role"
                            value={role}
                            label="Role"
                            onChange={handleChangeRole}
                        >
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"instructor"}>Instructeur</MenuItem>
                            <MenuItem value={"student"}>Etudiant</MenuItem>
                        </Select>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{mt: 3, mb: 2}}
                        >
                            Créer
                        </Button>
                    </Box>
                </Box>
            </Modal>
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
                    <Button variant="contained" color="secondary" onClick={handleOpen}>
                        Créer un utilisateur
                    </Button>
                </Box>
                <Box
                    width={"95%"}
                    height={"100%"}
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
                        // Change the color of the grid
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