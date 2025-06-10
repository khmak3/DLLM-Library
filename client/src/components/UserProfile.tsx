import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Grid
} from "@mui/material";
import { CreateUserMutation, CreateUserMutationVariables } from "../generated/graphql";

export const CREATE_USER_MUTATION = gql`
mutation CreateUser($email: String!, $address: String, $nickname: String) {
  createUser(email: $email, address: $address, nickname: $nickname) {
    id
    email
    address
    nickname
    createdAt
    isActive
    isVerified
    role
  }
}
`;

interface UserProps {
  onUserCreated?: (data: CreateUserMutation) => void;
}

const UserProfile: React.FC<UserProps> = ({ onUserCreated }) => {
  const [createNewsPost, { data, loading, error: mutationError }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER_MUTATION);

  return (
    <></>
  );
};

export default UserProfile;