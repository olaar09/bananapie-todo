import { CookieRef } from "nuxt/app";

export default function (props: any) {
  const auth: CookieRef<UserObj | undefined> = usePersistentAuth();
  if (auth?.value?.token) {
    return navigateTo("/");
  }
}
