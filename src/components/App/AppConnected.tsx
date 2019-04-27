import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { App } from '.';
import awsConfig from '../../aws-exports';

Amplify.configure(
  awsConfig
);

export default withAuthenticator(
  App,
  {
    signUpConfig: {
      header: 'Sign Up',
      hideAllDefaults: true,
      signUpFields: [
        {
          displayOrder: 1,
          key: 'given_name',
          label: 'First Name',
          required: true,
          type: 'string'
        },
        {
          displayOrder: 2,
          key: 'family_name',
          label: 'Last Name',
          required: true,
          type: 'string'
        },
        {
          displayOrder: 3,
          key: 'username', // using email as username
          label: 'Email',
          required: true,
          type: 'email'
        },
        {
          displayOrder: 4,
          key: 'phone_number',
          label: 'Phone',
          required: true,
          type: 'string'
        },
        {
          displayOrder: 5,
          key: 'password',
          label: 'Password',
          required: true,
          type: 'password'
        }
      ]
    }
  }
);