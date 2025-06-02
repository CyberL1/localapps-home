import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("/api/apps/");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const apps = await response.json();
  return { apps };
};
