interface AuthenticateUserDTO {
  email: string;
  password: string;
}

interface AuthenticateUserResponseDTO {
  token: string;
}

export { AuthenticateUserDTO, AuthenticateUserResponseDTO };
