export async function fetchWithAuth(url: string, options = {}) {
    const res = await fetch(url, { ...options, credentials: "include" });
    if (res.status === 401) {
        window.location.href = "/";
    }
    return res;
}