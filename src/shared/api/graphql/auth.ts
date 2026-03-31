import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($data: CreateUserDto!) {
    addUser(data: $data) {
      id
      email
      name
      role
      avatar
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      access_token
      refresh_token
    }
  }
`;
