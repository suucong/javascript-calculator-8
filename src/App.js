import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const input = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요. \n"
    );

    const result = calculate(input);

    Console.print(`결과 : ${result}`);
  }
}

function calculate(inputString) {
  if (inputString === "") {
    return 0;
  }

  return inputString;
}

export default App;
