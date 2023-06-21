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
// Calculate the date 18 years ago

export function verifyIfHas18yo(age) {
    const today = new Date();
    const birthdate = new Date(age);
    const diffTime = today - birthdate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays >= 6570) return true
    return false;
}