import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { Button, Box, Typography, TextField, Container } from "@mui/material";
import {
  User as fireUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import App from "./App";
// Adds messages only in a dev environment
loadDevMessages();
loadErrorMessages();

const BaseApp: React.FC = () => {
  const [user, setUser] = useState<fireUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  const signInSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed in successfully");
        setShowSignInForm(false);
      } catch (error) {
        alert("Error signing in:" + error);
      }
    }
  };

  const signUpSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Account created successfully");
        setShowSignUpForm(false);
      } catch (error) {
        alert("Error creating account:" + error);
      }
    }
  };

  const handleResetPassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (resetEmail) {
      try {
        await sendPasswordResetEmail(auth, resetEmail);
        alert("Password reset email sent!");
        setShowResetForm(false);
      } catch (error) {
        alert("Error sending reset email: " + error);
      }
    }
  };

  const handleShowForm = (form: "signIn" | "signUp" | "reset") => {
    setShowSignInForm(form === "signIn");
    setShowSignUpForm(form === "signUp");
    setShowResetForm(form === "reset");
    if (form === "signIn" || form === "signUp") {
      setEmail('');
      setPassword('');
    }
    if (form === "reset") {
      setResetEmail('');
    }
  };

  const handleShowSignIn = () => handleShowForm("signIn");
  const handleShowSignUp = () => handleShowForm("signUp");
  const handleShowReset = () => handleShowForm("reset");

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>無大台香港典藏館</Typography>
      {!user && (
        <>
          <Box mb={2}>
            <Button 
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={handleShowSignUp}
            >
              Sign up
            </Button>
            <Button 
              variant="outlined"
              onClick={handleShowSignIn}
            >
              Confirm
            </Button>
          </Box>
          {showSignInForm && (
            <Container maxWidth="xs">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={4}
                p={4}
                boxShadow={3}
                borderRadius={2}
              >
                <Typography variant="h5" mb={2}>
                  Sign In
                </Typography>
                <form onSubmit={signInSubmit} style={{ width: '100%' }}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    value={email}
                    onChange={handleInputChange(setEmail)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    value={password}
                    onChange={handleInputChange(setPassword)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Sign In
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ mt: 2 }}
                    onClick={handleShowReset}
                  >
                    Forgot Password?
                  </Button>
                </form>
              </Box>
            </Container>
          )}
          {showSignUpForm && (
            <Container maxWidth="xs">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={4}
                p={4}
                boxShadow={3}
                borderRadius={2}
              >
                <Typography variant="h5" mb={2}>
                  Sign Up
                </Typography>
                <form onSubmit={signUpSubmit} style={{ width: '100%' }}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    value={email}
                    onChange={handleInputChange(setEmail)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    value={password}
                    onChange={handleInputChange(setPassword)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Container>
          )}
          {showResetForm && (
            <Container maxWidth="xs">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={4}
                p={4}
                boxShadow={3}
                borderRadius={2}
              >
                <Typography variant="h5" mb={2}>
                  Reset Password
                </Typography>
                <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    value={resetEmail}
                    onChange={handleInputChange(setResetEmail)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Send
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ mt: 2 }}
                    onClick={() => setShowResetForm(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </Box>
            </Container>
          )}
        </>
      )}
      <ApolloProvider client={client}>
        <App user={user} />
      </ApolloProvider>
    </Box>
  );
};

export default BaseApp;