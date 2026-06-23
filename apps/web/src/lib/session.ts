import { redirect } from "next/navigation";
import { auth } from "@/auth";

export type CurrentHost = {
  id: string;
  name: string;
  email: string;
  role: string;
};

/**
 * Returns the signed-in host, or redirects to /login.
 * Every dashboard query must scope by this id so hosts only ever see their own data.
 */
export async function getCurrentHost(): Promise<CurrentHost> {
  const session = await auth();
  const user = session?.user as
    | { id?: string; name?: string; email?: string; role?: string }
    | undefined;

  if (!user?.id) redirect("/login");

  return {
    id: user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role ?? "HOST",
  };
}
