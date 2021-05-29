import { kanjiNums, kanjiNames, exponents } from "../../data/data";

export const moneyToChar = (str) => {
  const changedStr = numbersToKanji(str);

  function numbersToKanji(num) {
    if (num === 0) {
      return "零";
    }
    let ret = "";
    const exponentsLen = exponents.length;
    for (let i = exponentsLen; i >= 0; --i) {
      const bias = Math.pow(10, exponents[i]);
      console.log(
        "i",
        i,
        "bias",
        bias,
        "exponents[i]",
        exponents[i],
        "num",
        num
      );
      if (num >= bias) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        const top = Math.floor(num / bias);
        // console.log(num / bias);
        console.log("top", top, "bias", bias, "num", num);
        if (top >= 10) {
          console.log("top >= 10");
          ret += numbersToKanji(top);
        } else {
          if (top == 1 && exponents[i] <= 3) {
            // ※先頭の数字が1、かつ指数が3 (千の位) 以下の場合のみ『一』をつけない
          } else {
            ret += kanjiNums[top];
            console.log(ret);
          }
        }
        ret += kanjiNames[i];
        console.log(ret);
        num -= top * bias;
        console.log("num", num, "top * bias", top * bias);
        console.log("================================");
      }
    }
    ret += kanjiNums[num];
    console.log();
    return ret;
  }
  return changedStr;
};
