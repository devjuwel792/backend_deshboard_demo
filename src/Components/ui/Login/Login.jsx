'use client'
import { Box, Checkbox, FormControlLabel, IconButton, Paper, TextField } from '@mui/material';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Grid } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async () => {

    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm px-6 py-8 shadow-md dark:shadow-lg bg-white dark:bg-gray-800">
                <Box>
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/logoL.png"
                            alt="logo"
                            width={100}
                            height={40}
                        />
                    </div>
                    <h2 className="text-xl font-medium mb-1 text-center dark:text-white">
                        Welcome <span className="font-bold">Vetkimach</span>
                    </h2>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
                        Please sign-in to your account and start the adventure
                    </p>

                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="text"
                                size='small'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                InputProps={{
                                    sx: { borderRadius: 0 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                size='small'
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                InputProps={{
                                    sx: { borderRadius: 0 },
                                    endAdornment: (
                                        <IconButton onClick={togglePasswordVisibility}>
                                            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                        </IconButton>
                                    ),
                                    readOnly: false,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex items-center justify-between">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            // sx={{
                                            //     color: '#ffffff',
                                            //     '&.Mui-checked': {
                                            //         color: '#3b82f6',
                                            //     },
                                            // }}
                                        />
                                    }
                                    label={
                                        <span className="text-sm dark:text-white">
                                            Remember me
                                        </span>
                                    }
                                />
                                <Link
                                    href="/auth/resetpassword"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-bold uppercase tracking-wide"
                            >
                                Login
                            </button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default Login;