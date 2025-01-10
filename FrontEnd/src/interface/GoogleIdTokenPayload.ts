export interface GoogleIdTokenPayload {
    iss: string;           // Token issuer
    azp: string;           // Authorized party - the Client ID of the application that the ID token is intended for
    aud: string;           // Audience - the Client ID of the application that the ID token is intended for
    sub: string;           // Subject - identifier for the end user
    email: string;         // End user's email
    email_verified: boolean; // Boolean value to indicate the email verification status
    nbf?: number;          // Not before - the start time before which the JWT must not be accepted for processing
    name: string;          // Full name of the end user
    picture: string;       // URL of user's profile picture
    given_name: string;    // Given name (first name) of the user
    family_name: string;   // Family name (last name) of the user
    iat: number;           // Issued at - timestamp of when the JWT was issued
    exp: number;           // Expiration - timestamp of when the JWT expires
    jti?: string;          // JWT ID - unique identifier for the token
  }