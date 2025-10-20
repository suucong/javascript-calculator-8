import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const input = (
      await Console.readLineAsync("덧셈할 문자열을 입력해 주세요. \n")
    ).trim();

    const result = calculate(input);
    Console.print(`결과 : ${result}`);
  }
}

function calculate(inputString) {
  if (inputString === "") return 0;

  const { delimiters, numberString } = parseDelimiters(inputString);
  if (!numberString || numberString.trim() === "") return 0;

  const numbers = parseNumbers(numberString, delimiters);
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);

  return sum;
}

function parseDelimiters(inputString) {
  const delimiters = [",", ":"];
  let numberString = inputString;

  if (inputString.startsWith("//")) {
    const parts = inputString.split(/\n|\\n/);
    const customDelimiter = parts[0].substring(2);

    delimiters.push(customDelimiter);
    numberString = parts[1];
  }

  return { delimiters, numberString };
}

function parseNumbers(numberString, delimiters) {
  // 정규식 세팅(특수문자 escape 처리)
  const escapedDelimiters = delimiters.map((d) =>
    d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(escapedDelimiters.join("|"));

  const tokens = numberString.split(regex);
  const numbers = tokens.map((token) => {
    if (token.trim() === "") {
      throw new Error("[ERROR] 잘못된 입력 형식입니다.");
    }

    const number = Number(token);
    if (isNaN(number)) {
      throw new Error("[ERROR] 숫자가 아닌 값이 포함되어 있습니다.");
    }

    if (number < 0) {
      throw new Error("[ERROR] 음수는 허용되지 않습니다.");
    }

    return number;
  });

  return numbers;
}

export default App;
