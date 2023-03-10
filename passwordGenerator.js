export const generatePassword = (length) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (var i = 0; i < length; i++)
        password += possible.charAt(Math.floor(Math.random() * possible.length));

    return password;
}