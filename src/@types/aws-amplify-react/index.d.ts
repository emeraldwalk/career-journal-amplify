declare module 'aws-amplify-react' {
  import React from 'react';

  type DefaultSignupField =
    | 'username'
    | 'password'
    | 'phone_number'
    | 'email';

  interface SignUpField {
    label?: string,
    key?: string,
    required?: boolean,
    displayOrder?: number,
    type?: 'email' | 'number' | 'password' | 'string',
    custom?: boolean
  }

  interface SignUpConfig {
    defaultCountryCode?: string,
    header?: string,
    hideAllDefaults?: boolean,
    hiddenDefaults?: DefaultSignupField[],
    signUpFields?: SignUpField[]
  }

  interface AuthenticatorConfig {
    signUpConfig: SignUpConfig
  }

  /**
   * Docs for configuration here:
   * https://aws-amplify.github.io/docs/js/react#signup-configuration
   */
  function withAuthenticator(
    component: React.ComponentType,
    showLogout: boolean
  );
  function withAuthenticator(
    component: React.ComponentType,
    config: AuthenticatorConfig
  );
}