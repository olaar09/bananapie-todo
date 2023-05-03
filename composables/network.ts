export const useFetchTodos = async (
  token: String,
  limit: number,
  skip: number
) => {
  return await useAsyncData<TodoResponseObj>("todos_key", () =>
    $fetch(
      `${useRuntimeConfig().public.apiBase}/todos?limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  );
};

export const useAppGet = async <T>(path: String) => {
  const auth = usePersistentAuth();

  return await $fetch<T>(`${useRuntimeConfig().public.apiBase}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${auth.value?.token}` },
  });
};

export const useAppPost = async <T>(path: String, data: Object) => {
  const auth = usePersistentAuth();

  return await $fetch<T>(`${useRuntimeConfig().public.apiBase}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.value?.token}`,
    },
    method: "POST",
    body: data,
  });
};
