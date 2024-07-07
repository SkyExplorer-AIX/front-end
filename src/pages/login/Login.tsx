import {Box, Button, TextField, Typography} from '@mui/material';
import React from "react";

function Login() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            height="100%"
        >
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="row"
                alignItems="center"
                height="60%"
                width={"50%"}
                box-shadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
                borderRadius="10px"
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    height="60%"
                    box-shadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
                >
                    <img alt={"Logo"} src="/GroupLogo-sky_bleu.svg" width="100px"/>
                    <Typography variant="h3" color={"primary"} marginTop={"20px"}>
                        Connectez-vous
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            color={"secondary"}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de pass"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            color={"secondary"}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"

                            sx={{mt: 3, mb: 2}}
                        >
                            Connexion
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;