import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/helper.css";
import messages from "./config/messages";
import { getResult } from "./container/products/selector";
import * as Actions from "./container/products/actions";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import CancelIcon from "@material-ui/icons/Cancel";
import PanoramaFishEyeIcon from "@material-ui/icons/PanoramaFishEye";
import moji from "moji";

const MAX_STR_LENGTH = 13; //入力できる文字数の限界値
//正規表現パターン
const IS_ONLY_NUMBER_AND_HALF_WIDTH = new RegExp(/^[0-9]*$/);
const IS_ONLY_NUMBER_AND_FULL_WIDTH = new RegExp(/^[０-９]*$/);
const IS_ONLY_NUMBER_AND_FULL_WIDTH_AND_HALF_WIDTH = new RegExp(
  /^[０-９0-9]*$/
);
const IS_ZERO = new RegExp(/^[0０]*$/);

const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const result = getResult(selector); //config/products/operationのmoneyToChar関数の処理結果
  const [money, setMoney] = useState("");
  const [isResultShow, setIsResultShow] = useState(false);

  const handleChangeMoney = (e) => {
    const LAST_STR = e.target.value.slice(-1);
    const FIRST_STR = e.target.value.slice(0, 1);
    const { value } = e.target;

    if (value.length > MAX_STR_LENGTH) {
      alert(messages.OVER_MAX_LENGTH(MAX_STR_LENGTH));
      return null;
    }
    if (IS_ZERO.test(FIRST_STR) && value[0] !== undefined) {
      alert("先頭に０を指定することはできません");
      return null;
    }
    if (!IS_ONLY_NUMBER_AND_FULL_WIDTH_AND_HALF_WIDTH.test(LAST_STR)) {
      alert("数字が使われていません");
      return null;
    }

    if (IS_ONLY_NUMBER_AND_HALF_WIDTH.test(FIRST_STR)) {
      if (value.length > 1 && IS_ONLY_NUMBER_AND_FULL_WIDTH.test(LAST_STR)) {
        alert("半角と全角を混同しないでください。最初の文字は半角です");
      } else {
        setMoney(value);
      }
    } else if (IS_ONLY_NUMBER_AND_FULL_WIDTH.test(FIRST_STR)) {
      if (value.length > 1 && IS_ONLY_NUMBER_AND_HALF_WIDTH.test(LAST_STR)) {
        alert("半角と全角を混同しないでください。最初の文字は全角です");
      } else {
        setMoney(value);
      }
    }
  };

  const determineMoney = () => {
    let passedValue = "";
    if (IS_ONLY_NUMBER_AND_HALF_WIDTH.test(money)) {
      passedValue = money;
    } else if (IS_ONLY_NUMBER_AND_FULL_WIDTH.test(money)) {
      passedValue = moji(money).convert("ZE", "HE").toString();
    }
    dispatch(Actions.moneyToCharAction(passedValue));
    setIsResultShow(true);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="header__title">金額を漢数字に変換できるサイト</h1>
          <p className="header__text">
            このサイトは金額を漢数字に変換することができるサイトです。<br></br>
            請求書などを作成する時に使用すると便利です。
          </p>
        </div>
      </header>
      <div className="container">
        <div className="container-info">
          <div className="container-info__inner">
            <div className="container-info__inner__item">
              <CancelIcon className="info-Icon " />
              <p className="container-info__text">
                数字のみ変換することができます。アルファベット、カタカナ、ひらがな等は変換できません
              </p>
            </div>
            <div className="container-info__inner__item">
              <PanoramaFishEyeIcon className="info-Icon " />
              <p className="container-info__text">
                数字は全角・半角、どちらでも変換することができます
              </p>
            </div>
          </div>
        </div>
        <div className="hp_mt20">
          <Grid container spacing={1} alignItems="center" justify="center">
            <Grid item>
              <MonetizationOnOutlinedIcon className="MonetizationOnOutlinedIcon" />
            </Grid>
            <Grid item>
              <TextField
                required
                label="金額　(数字のみ)"
                variant="outlined"
                onChange={(e) => handleChangeMoney(e)}
                value={money}
                inputProps={{
                  style: { fontSize: 20 },
                }}
              />
            </Grid>
            <Grid item>
              <button className="button" onClick={determineMoney}>
                変換
              </button>
            </Grid>
          </Grid>
        </div>
        {isResultShow && <p className="container_result-text">{result} 円</p>}
      </div>
    </div>
  );
};

export default App;
