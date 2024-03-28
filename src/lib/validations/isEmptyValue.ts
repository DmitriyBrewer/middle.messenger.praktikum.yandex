export function isEmptyValue(value:string, message = "Введите корректно значение"){
    if (value.trim() === "") {
        console.log(message);
    }
}
