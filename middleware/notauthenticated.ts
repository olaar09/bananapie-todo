import { CookieRef } from "nuxt/app";

export default defineNuxtRouteMiddleware(() => {
  const auth: CookieRef<UserObj | undefined> = usePersistentAuth();
  if (auth && !auth?.value?.token) {
    return navigateTo("/login");
  }
});
