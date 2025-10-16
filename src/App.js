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
  if (inputString === "") {
    return 0;
  }

  const { delimiters, numberString } = parseDelimiters(inputString);

  return inputString; // 임시 반환
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

export default App;
