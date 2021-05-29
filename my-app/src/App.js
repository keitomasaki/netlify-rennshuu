import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResult } from "./reducks/products/selector";
import * as Actions from "./reducks/products/actions";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";

const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [money, setMoney] = useState("");
  const result = getResult(selector);
  let keyCode = null;

  const determineMoney = () => {
    dispatch(Actions.moneyToCharAction(money));
  };

  const keyPress = (e) => {
    keyCode = e.keyCode;
  };

  const handleChangeMoney = (e) => {
    //金額の限界値
    const MAX_STR_LENGTH = 13;

    //正規表現パターン（半角英数のみに一致）
    var regex = new RegExp(/^[0-9]*$/);

    //判定
    if (keyCode === 32) {
      alert("半角英数が使われていません。スペースキーが使われています");
    } else if (!regex.test(e.target.value)) {
      alert("半角英数が使われていません。");
    } else if (e.target.value.length > MAX_STR_LENGTH) {
      alert(`制限文字数を超えています。制限文字数は${MAX_STR_LENGTH}数です。`);
    } else {
      setMoney(e.target.value);
    }
  };

  return (
    <div className="App">
      <p>正木のサイトです。ツールを開発しています</p>
      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <MonetizationOnOutlinedIcon fontSize="large" />
          </Grid>
          <Grid item>
            <TextField
              required
              label="金額　(半角英数のみ)"
              variant="outlined"
              onChange={(e) => handleChangeMoney(e)}
              onKeyDown={(e) => keyPress(e)}
              value={money}
            />
          </Grid>
        </Grid>
      </div>
      <button onClick={() => determineMoney()}>button</button>
      <h3>{result}</h3>
    </div>
  );
};

export default App;
