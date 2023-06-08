export function phoneValidation(phoneNumber) {
    var regularExpression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regularExpression.test(phoneNumber)
};

export function emailValidation(mail) {
    var regularExpression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
    return regularExpression.test(mail);
};

export function passwordValidation(password) {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regularExpression.test(password);
};

export function licensePlateValidation(licensePlate) {
    console.log(licensePlate)
    var regularExpression = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
    return regularExpression.test(licensePlate)
};