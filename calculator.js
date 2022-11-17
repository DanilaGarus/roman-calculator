const operands = ['+', '-', '/', '*'];
const rom = ['I','V','X']

function calculator(string) {
    let intRes;
    const matchingOperands = string.split('').filter(x => operands.includes(x))
    const matchingRomanNumbers = string.split('').filter(x => rom.includes(x))

    let firstNumber = parseInt(string);
    let secondNumber = parseInt(string.split("").reverse().join(""))

    if(matchingOperands.length === 0) throw Error('Invalid input')

    if(firstNumber <= 0 || firstNumber >= 11 || secondNumber <= 0 || secondNumber >= 11) throw Error('Invalid input')

    if (string.length < 5 || string.match(/\s{2}/) || string.match(/\w [+*/-] \w [+*/-]/)) throw Error('Invalid input')

    if (matchingRomanNumbers && matchingRomanNumbers.length > 1) return romanNumbersCalculations(string)

    try {
        intRes = eval(string);
        if (intRes % 1 !== 1) return Math.floor(intRes).toString();
        else return intRes.toString();
    } catch {
        throw Error('Invalid input')
    }
}

//Выполнение операций над римскими числами
function romanNumbersCalculations(string) {
    for (let operand of operands) {
        if (string.includes(operand)) {
            let nums = string.split(` ${operand} `);

            let firstNumber = RomanToDecimal(nums[0]);
            let secondNumber = RomanToDecimal(nums[1]);

            if (firstNumber > 10 || secondNumber > 10) throw Error('Invalid input')

            let res = (eval(`${firstNumber}
            ${operand}
            ${secondNumber}`))

            if (res % 1 !== 0) res = Math.floor(res);

            if (res <= 0) return "";

            return DecimalToRoman(res.toString());
        }
    }
}

//Работает путём помещения цифр перед или после основных чисел. 6 = V + I и т.д.
function RomanToDecimal(romanNumber) {
    const RomanToInt = (rom) => {
        const legend = "IVXLCDM";
        const l = [1, 5, 10, 50, 100, 500, 1000];
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
