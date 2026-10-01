export function requireDatabaseUrl() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  return url;
}

function withSessionPort(url: string) {
  const parsed = new URL(url);

  if (parsed.port === "6543") {
    parsed.port = "5432";
  }

  return parsed.toString();
}

export function resolveMigrateDatabaseUrl() {
  return withSessionPort(
    process.env.DIRECT_URL ?? requireDatabaseUrl(),
  );
}

export function resolveRuntimeDatabaseUrl() {
  return withSessionPort(requireDatabaseUrl());
}
