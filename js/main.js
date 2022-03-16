function getRandomIntFromRange(minNumber, maxNumber) {
    if (minNumber > maxNumber) {
        return 'Ошибка. Минимальное значение больше максимального';
    }
    return Math.min(Math.max(Math.round(Math.random() * maxNumber), minNumber), maxNumber);
}

const checkStringLength = (stringToCheck, maxStringLength) => stringToCheck.length <= maxStringLength;

