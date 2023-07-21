export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';

    // Xóa tất cả các ký tự không phải là số từ số điện thoại
    const number = phoneNumber.replace(/\D/g, '');

    // Định dạng số điện thoại theo mẫu xxxx-xxx-xxx hoặc xxxx-xxx-xxxx
    const firstPart = number.substring(0, 4);
    const secondPart = number.substring(4, 7);
    const thirdPart = number.substring(7);

    return `${firstPart}${number.length > 4 ? '-':''}${secondPart}${number.length > 7 ? '-':''}${thirdPart}`;
};

export function formatMoney(value) {
    const price = value === null ? 0 : value;
    const formattedValue = price.toLocaleString();
    return formattedValue;
};