import { host } from "../../constants/host";
import { convertData } from "../../lib/convertData";
import { METHODS, http } from "../../lib/http";
import store from "../../lib/store";

// export function getAllChats() {
//     const getUserOptions = {
//         method: METHODS.GET,
//     };

//     return http.get(`${host}/api/v2/chats`, getUserOptions)
//         .then((response) => {
//             if (response.readyState === 4 && response.status >= 200 && response.status < 300) {
//                 const data = JSON.parse(response.responseText);
//                 console.log(data); // Просмотр полученных данных
//                 if (Array.isArray(data)) {
//                     store.set("chats", data); // Установка данных в store как массив с объектами
//                 } else {
//                     throw new Error("Response data is not in the expected format");
//                 }
//                 return data; // Возможно, вам нужно вернуть данные для дальнейшей обработки
//             } else {
//                 throw new Error("Request failed with status: " + response.status);
//             }
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// }

export function getAllChats() {
    const getUserOptions = {
        method: METHODS.GET,
    };

    return http.get(`${host}/api/v2/chats`, getUserOptions)
        .then((response) => {
            if (response.readyState === 4 && response.status >= 200 && response.status < 300) {
                const data = JSON.parse(response.responseText);
                if (Array.isArray(data)) {
                    return data; // Возвращаем массив с объектами чатов
                } else {
                    throw new Error("Response data is not in the expected format");
                }
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            throw error; // Пробрасываем ошибку дальше для обработки в вызывающем коде
        });
}

export function deleteChat(data:Record<string,string>) {
    const signUpOptions = {
        method: METHODS.DELETE,
        headers: ["Content-Type", "application/json"],
        data: convertData(data),
    };

    return http.delete(`${host}/api/v2/chats`, signUpOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                // return response.json();
                const data = JSON.parse(response.responseText);
                return data;
                // router.go("/messenger");
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

export function addChats(data:Record<string,string>) {
    const signUpOptions = {
        method: METHODS.POST,
        headers: ["Content-Type", "application/json"],
        data: convertData(data),
    };

    return http.post(`${host}/api/v2/chats`, signUpOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
                // router.go("/messenger");
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
