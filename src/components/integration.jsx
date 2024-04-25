import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Integration({ csv1, csv2, fetchGemini, resize1, resize2 }) {
  const [resultText, setResultText] = useState("");
  async function handleClick() {
    if (!csv1 || !csv2) {
      alert("データを貼り付けてください");
      return;
    }
    const systemInstruction1 = `全体量を${resize1}倍にしてください。`;
    fetchGemini(csv1, systemInstruction1).then((result1) => {
      console.log(result1);
      const systemInstruction2 = `全体量を${resize2}倍にしてください。`;
      fetchGemini(csv2, systemInstruction2).then((result2) => {
        console.log(result2);
        const combinedData = result1 + "\n\n" + result2;
        const systemInstruction3 =
          "2つのデータをもとに、一つのcsvにまとめてください。\n一行目はIngredient, Quantityというヘッダー情報とし、同様の材料はまとめて、一つの行にし、quantityは足し算をして表示してください。\n※ドライイーストとインスタントドライイーストは同じものなのでドライイーストという名前で一つのものとして考えてください。";
        fetchGemini(combinedData, systemInstruction3).then((result3) => {
          // document.getElementById("integration-area").value = result3;
          setResultText(result3);
        });
      });
    });
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(resultText);
    alert("コピーしました");
  };

  return (
    <div className="basis-1/2 bg-slate-500">
      <h2 className="block font-bold mb-2">レシピデータを統合する</h2>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="block px-4 py-2 mt-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          統合
        </button>
      </div>

      <div className="bg-center">
        <label className="block">統合結果</label>
        <textarea
          name="レシピ統合"
          id="integration-area"
          cols="30"
          rows="10"
          value={resultText}
          onChange={(e) => setResultText(e.target.value)}
        ></textarea>
        <div>
          <label>
            結果をコピー
            <Tooltip title="結果をコピー" placement="top" arrow>
              <IconButton
                color="primary"
                size="medium"
                onClick={copyToClipboard}
              >
                <ContentCopyIcon fontSize="medium"></ContentCopyIcon>
              </IconButton>
            </Tooltip>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Integration;
