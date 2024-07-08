import {Box, Button, Modal, Select, SelectChangeEvent, TextField, Typography, MenuItem} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";

interface CreateUserModalProps {
    open: boolean;
    onClose: () => void;
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
    success: boolean;
    error: boolean;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    fetchUsers: () => void;
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

export default function CreateUserModal(props: CreateUserModalProps) {
    const {open, onClose, role, setRole, success, error, password, setPassword, fetchUsers} = props;
    const generatePassword = () => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = "";
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(password);
    }

    const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            onClose();
            fetchUsers();
        }).catch((error) => {
            console.log(error);
            fetchUsers();
        });

    }

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    return (
        <Modal
            open={open}
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
    );
}