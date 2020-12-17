const backendDomain = 'http://localhost:8000/api/'


export const ApiClient = async (url: string, init: RequestInit | undefined = {headers: {}}) => {

    const access_token = window.localStorage.getItem("auth_access")
    const refresh_token = window.localStorage.getItem("auth_refresh")

    let {headers} = init || {headers: {}}
    if (access_token) {
        (headers as any)['Authorization'] = `Bearer ${access_token}`
    }
    let response = await fetch(`${backendDomain}${url}`, {...init, headers: headers})

    if (response.status !== 401 || !access_token) {
        return response
    }

    const refresh_response = await fetch(`${backendDomain}token/refresh/`, {
        method: "POST",
        headers: {
            'Content-Type' : "Application/json",
        },
        body: JSON.stringify({"refresh": refresh_token})
    })
    const {access} = await refresh_response.json()
    if (access) {
        window.localStorage.setItem("auth_access", access);
        (headers as any)['Authorization'] = `Bearer ${access}`
    }
    response = await fetch(`${backendDomain}${url}`, {...init, headers: headers})

    if (response.status === 401) {
        window.localStorage.removeItem("auth_access")
        window.localStorage.removeItem("auth_refresh")
        window.localStorage.removeItem("username")
    }

    return response
}