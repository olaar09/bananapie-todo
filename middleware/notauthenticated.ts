export default defineNuxtRouteMiddleware((to, from) => {
  const auth = usePersistentAuth();
  console.log(auth.value, "mioddle ware");
  
  if (!auth?.value?.token) {
    return navigateTo('/login')
  }
})