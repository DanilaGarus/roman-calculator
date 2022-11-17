const rom = ['I', 'V', 'X']
const validInput = /^[0-9]{1,2}\s[+*/-]\s+[0-9]{1,2}$|^[IVX]{1,4}\s[+*/-]\s+[IVX]{1,4}$/

function calculator(string) {
    if (!string.match(validInput)) throw Error('Invalid input');

    const isRomanNumber = string.split('').some(x => rom.includes(x));

    const numbers = string.split(' ');

    const firstNumber = isRomanNumber ? RomanToDecimal(numbers[0]) : parseInt(numbers[0]);
    const secondNumber = isRomanNumber ? RomanToDecimal(numbers[2]) : parseInt(numbers[2]);
    const separator = numbers[1];

    if (firstNumber <= 0 || firstNumber >= 11 || secondNumber <= 0 || secondNumber >= 11) throw Error('Invalid input');

    try {
        let result = eval(`${firstNumber} ${separator} ${secondNumber}`);
        if(result < 1 && isRomanNumber) return '';
        if (result % 1 !== 1) {
            result = Math.floor(result).toString();
        }

        return isRomanNumber ? DecimalToRoman(result) : result;
    } catch {
        throw Error('Invalid input');
    }
}

//Работает путём помещения цифр перед или после основных чисел. 6 = V + I и т.д.
function RomanToDecimal(romanNumber) {
    const RomanToInt = (rom) => {
        const legend = "IVXLCDM";
        const l = [1, 5, 10, 50, 100];
        let sum = 0;
        while (rom) {
            if (rom[1] && legend.indexOf(rom[0]) < legend.indexOf(rom[1])) {
                sum += l[legend.indexOf(rom[1])] - l[legend.indexOf(rom[0])];
                rom = rom.substring(2, rom.length);
            } else {
                sum += l[legend.indexOf(rom[0])];
                rom = rom.substring(1, rom.length);
            }
        }
        return sum;
    };
    return RomanToInt(romanNumber.toUpperCase()).toString();
}

/*Работает на основе хешированных данных. Проверяет соответствует ли парснутое число значению римского числа
 если нет - сооздаёт римское число*/
function DecimalToRoman(number) {
    let romans = {
        "C": 100, "XC": 90, "L": 50, "XL": 40, "X": 10, "IX": 9, "V": 5, "IV": 4, "I": 1
    };

    let result = "";

    for (let romanKey of Object.keys(romans)) {
        let repeat = Math.floor(number / romans[romanKey]);
        number -= repeat * romans[romanKey];
        result += romanKey.repeat(repeat);
    }
    return result;
}

module.exports = calculator;
