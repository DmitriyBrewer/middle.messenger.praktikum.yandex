const host = "https://ya-praktikum.tech";

export function signUpUser(data) {
    return fetch(`${host}/api/v2/auth/signup`, {
        method: "POST",
        credentials: "include", // Нужно подставлять куки
        mode: "cors", // Работаем с CORS
        headers: {
            "content-type": "application/json", // Данные отправляем в формате JSON
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}

export function getUserInfo() {
    return fetch(`${host}/api/v2/auth/user`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
        .then(response => response.json());
}


export const registrationHandleTest = (data) => {
    signUpUser(data)
        .then(data => {
            console.log(data);
            return getUserInfo();
        })
        .then(data => {
            console.log("user", data);
        });
};
