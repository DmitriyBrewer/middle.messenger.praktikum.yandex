export const validationField = (login:string, regexString: string) => {
    const regex = new RegExp(regexString);
    return regex.test(login);
};
