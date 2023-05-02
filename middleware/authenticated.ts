export default function (props: any) {
    const auth = usePersistentAuth();
    if (auth?.value?.token) {
      return navigateTo('/')
    }
}