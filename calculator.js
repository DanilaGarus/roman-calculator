const RomanNumsRegex = new RegExp('^M{0,3}(CM|CD|D?C{0,3})?(XC|XL|L?X{0,3})?(IX|IV|V?I{0,3})?$')
const separators = ['+', '-', '/', '*', '%'];

function calculator(string) {
    let intRes;

    //Проверка на одиночные символы, пустые строки и выражение в котором кол-во операндов > 1
    if (string.length < 5 || string.match(/\s{2}/) || string.match(/\w [+*/-] \w [+*/-]/)) throw Error('Invalid input')

    for (let separator of separators) {
        if (string.includes(separator)) {
            let number = string.split(` ${separator} `);

            // Проверка на range чисел ( по условию от 1-10 включительно) и наличие невалидных операндов
            for (let i = 0; i < number.length; i++) {
                if (number[i] >= 11 || number[i] <= 0 || separator.match(/[:;#@!_=%'"><&]/))
                    throw Error('Invalid input')
            }

            if (number[0].match(RomanNumsRegex) && number[1].match(RomanNumsRegex)) return romanNumberCalculations(string)
            else {
                try {
                    intRes = eval(string);
                    if (intRes % 1 !== 1) return Math.floor(intRes).toString();
                    else return intRes.toString();
                } catch {
                    throw Error('Invalid input')
                }
            }
        }
    }
}

const RomanToDecimal = (romanNumber) => {
    const RomanToInt = (s) => {
        const legend = "IVXLCDM";
        const l = [1, 5, 10, 50, 100, 500, 1000];
        let sum = 0;
        while (s) {
            if (s[1] && legend.indexOf(s[0]) < legend.indexOf(s[1])) {
                sum += l[legend.indexOf(s[1])] - l[legend.indexOf(s[0])];
                s = s.substring(2, s.length);
            } else {
                sum += l[legend.indexOf(s[0])];
                s = s.substring(1, s.length);
            }
        }
        return sum;
    };
    return RomanToInt(romanNumber.toUpperCase()).toString();
}

function DecimalToRoman(number) {
    let roman = {
        "C": 100, "XC": 90, "L": 50, "XL": 40, "X": 10, "IX": 9, "V": 5, "IV": 4, "I": 1
    };

    let result = "";

    for (let i of Object.keys(roman)) {
        let repeat = Math.floor(number / roman[i]);
        number -= repeat * roman[i];
        result += i.repeat(repeat);
    }
    return result;
}

function romanNumberCalculations(string) {
    for (let separator of separators) {
        if (string.includes(separator)) {
            let values = string.split(` ${separator} `);

            let firstNumber = RomanToDecimal(values[0]);
            let secondNumber = RomanToDecimal(values[1]);

            if (firstNumber > 10 || secondNumber > 10) throw Error('Invalid input')

            let res = (eval(`${firstNumber} ${separator} ${secondNumber}`))

            if (res % 1 !== 0) res = Math.floor(res);

            if (res <= 0) return "";

            return DecimalToRoman(res.toString());
        }
    }
}

module.exports = calculator;
