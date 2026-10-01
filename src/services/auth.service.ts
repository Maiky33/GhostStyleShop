import { AuthError, hashPassword, toAuthUser, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { LoginInput, RegisterInput } from "@/lib/validations/auth";
import type { AuthUser } from "@/types/auth";

const CUSTOMER_ROLE_NAME = "USER";

export async function registerUser(input: RegisterInput): Promise<AuthUser> {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existingUser) {
    throw new AuthError("Este correo ya está registrado", 409);
  }

  const role = await prisma.role.findUnique({
    where: { name: CUSTOMER_ROLE_NAME },
    select: { id: true },
  });

  if (!role) {
    throw new AuthError(
      "No se encontró el rol de usuario. Ejecuta el seed de la base de datos.",
      500,
    );
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: passwordHash,
      roleId: role.id,
      cart: {
        create: {},
      },
    },
    include: {
      role: true,
    },
  });

  return toAuthUser(user);
}

export async function loginUser(input: LoginInput): Promise<AuthUser> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: {
      role: true,
    },
  });

  if (!user || !user.isActive) {
    throw new AuthError("Correo o contraseña incorrectos", 401);
  }

  const passwordMatches = await verifyPassword(input.password, user.password);

  if (!passwordMatches) {
    throw new AuthError("Correo o contraseña incorrectos", 401);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  return toAuthUser(user);
}

export async function getUserById(id: string): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  return toAuthUser(user);
}
