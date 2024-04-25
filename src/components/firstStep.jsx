import { useState } from "react";
import Resizing from "./resizing";

function FirstStep({
  num,
  csv1,
  setCsv1,
  fetchGemini,
  data1,
  setData1,
  resize,
  setResize,
}) {
  async function handleClick() {
    // const data = document.getElementById(`ingredients_data${num}`).value;
    // if (!data || !/\d/.test(data)) {
    // console.log(data1);
    if (!data1) {
      alert("データを貼り付けてください");
      const textarea = document.getElementById(`ingredients_data${num}`);
      textarea.focus();
      return;
    }
    const systemInstruction =
      "下記のデータをcsv形式に変換してください。\nただし、一行目はIngredient, Quantityとしてください。\nまた、このデータは材料名と量が交互に書かれていますが、途中で材料と関係のない単語が含まれている場合があります。必要のないと思われる単語は適切に削除しながら出力してください。\nまた、以下の条件を満たすようにデータを整形してください。\n・ドライイーストとインスタントドライイーストは同じものであるため、ドライイーストという名前で一つの項目にして下さい。\n・同じ名称の項目が複数存在する場合は、それは量を合計して一つの項目にしてください。\n・溶き卵等、卵という文字が含まれるものがある場合は、すべて卵として一つの項目にして下さい。存在しない場合は卵という項目を作る必要はありません。\n・”水”、”お湯”は材料から削除して項目に入れないでください。\n※単位はつけたままにすること\n\n\n";

    const csvData = await fetchGemini(data1, systemInstruction);
    console.log(csvData);
    setCsv1(csvData);
  }

  return (
    <div className="basis-1/2 ">
      <label
        htmlFor={`ingredients_data${num}`}
        className="block font-bold mb-2"
      >
        {num}つ目のデータ
      </label>
      <textarea
        name="データを貼り付けて下さい"
        placeholder="データを貼り付けて下さい"
        id={`ingredients_data${num}`}
        value={data1}
        onChange={(e) => setData1(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-0 h-28 px-2"
      ></textarea>
      <br />
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        送信
      </button>
      <div className="text-center mt-1 mb-1">
        <span className="text-2xl">↓</span>
      </div>
      <Resizing
        csv1={csv1}
        setCsv1={setCsv1}
        resize={resize}
        setResize={setResize}
      />
    </div>
  );
}

export default FirstStep;
