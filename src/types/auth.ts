export type UserRole = "ADMIN" | "USER";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  emailVerified: boolean;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};
