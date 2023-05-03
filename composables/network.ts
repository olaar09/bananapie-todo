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

export const useAppPut = async <T>(path: String, data: Object) => {
  const auth = usePersistentAuth();

  return await $fetch<T>(`${useRuntimeConfig().public.apiBase}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: data,
  });
};

export const useAppDelete = async <T>(path: String, data: Object) => {
  const auth = usePersistentAuth();

  return await $fetch<T>(`${useRuntimeConfig().public.apiBase}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.value?.token}`,
    },
    method: "DELETE",
    body: data,
  });
};
