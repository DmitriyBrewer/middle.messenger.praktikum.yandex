export const conditions ={
    login:{
        pattern:"^(?=.*[a-zA-Z])(?=.*\\d?)[a-zA-Z\\d_\\-]{3,20}$",
        errorText:"Логин введен неверно"
    },
    password: {
        pattern: "^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,40}$",
        errorText:"Пароль введен неверно"
    },
    message: {
        pattern: ".+",
        errorText:"Поле сообщения не должно быть пустым"
    }
};
