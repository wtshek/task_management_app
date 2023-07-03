import { useState } from 'react';

import {
  Box,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        flexDirection="column"
        width="20vw"
        margin="auto"
        minWidth="300px"
      >
        <Typography marginBottom={2} variant="h2">
          Sign In
        </Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput id="username" label="Username"></OutlinedInput>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginY: 3 }} fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
        <Button sx={{ justifySelf: 'start' }} variant="contained">
          Login
        </Button>
      </Box>
    </>
  );
}

export default Page;
