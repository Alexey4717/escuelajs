import { gql } from '@apollo/client';

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      name
      email
      role
      avatar
      creationAt
      updatedAt
    }
  }
`;
