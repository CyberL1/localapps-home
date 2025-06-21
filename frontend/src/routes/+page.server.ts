import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("/api/apps/", {
    headers: { Authorization: env.LOCALAPPS_API_KEY },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const apps = await response.json();
  return { apps };
};
