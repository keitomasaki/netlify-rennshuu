import { kanjiNums, kanjiNames, exponents } from "../../data/data";

export const moneyToChar = (str) => {
  const changedStr = numbersToKanji(str);

  function numbersToKanji(num) {
    let ret = "";
    const exponentsLen = exponents.length;
    for (let i = exponentsLen; i >= 0; --i) {
      const bias = Math.pow(10, exponents[i]);
      if (num >= bias) {
        const top = Math.floor(num / bias);
        if (top >= 10) {
          ret += numbersToKanji(top);
        } else {
          if (top === 1 && exponents[i] <= 3) {
            // ※先頭の数字が1、かつ指数が3 (千の位) 以下の場合のみ『一』をつけない
          } else {
            ret += kanjiNums[top];
          }
        }
        ret += kanjiNames[i];
        num -= top * bias;
      }
    }
    ret += kanjiNums[num];
    return ret;
  }

  return changedStr;
};
