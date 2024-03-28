export const conditions ={
    email:{
        pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorText:"Email введен неверно"
    },
    login:{
        pattern:"^(?=.*[a-zA-Z])(?=.*\\d?)[a-zA-Z\\d_\\-]{3,20}$",
        errorText:"Логин введен неверно"
    },
    password: {
        pattern: "^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,40}$",
        errorText:"Пароль введен неверно"
    },
    name: {
        pattern: "^([А-ЯЁA-Z][а-яёa-z]*-?[А-ЯЁA-Z]?[а-яёa-z]*)$",
        errorText:"Поле введено неверно"
    },
    phone: {
        pattern: "^\\+?\\d{10,15}$",
        errorText: "Телефон введен неверно"
    },
    message: {
        pattern: ".+",
        errorText:"Поле сообщения не должно быть пустым"
    }
};
