import { useState } from "react";
import "./App.css";
import FirstStep from "./components/firstStep";
import Integration from "./components/integration";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Const from "./Const";

function App() {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [csv1, setCsv1] = useState("");
  const [csv2, setCsv2] = useState("");
  const [resize1, setResize1] = useState(1);
  const [resize2, setResize2] = useState(1);
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(Const.GEMINI_API_KEY);

  async function fetchGemini(data, systemInstruction) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // const systemInstruction =
    //   "下記のデータをcsv形式に変換してください。\nただし、一行目はIngredient, Quantityとしてください。\nまた、このデータは材料名と量が交互に書かれていますが、途中で材料と関係のない単語が含まれている場合があります。必要のないと思われる単語は適切に削除しながら出力してください。\nまた、以下の条件を満たすようにデータを整形してください。\n・ドライイーストとインスタントドライイーストは同じものであるため、ドライイーストという名前で一つの項目にして下さい。\n・同じ名称の項目が複数存在する場合は、それは量を合計して一つの項目にしてください。\n・溶き卵等、卵という文字が含まれるものはすべて卵として一つの項目にして下さい。\n・”水”、”お湯”は材料から削除して項目に入れないでください。\n※単位はつけたままにすること\n\n\n";

    const prompt = systemInstruction + data;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="container text-2xl font-bold mb-2">
        レシピデータ整形ツール
      </h1>
      <h2 htmlFor="ingredients_data1" className="font-bold mb-2">
        レシピサイトからコピーした材料のデータを貼り付けて送信する
      </h2>
      <div id="foreach-recipe" className="mb-4 md:flex">
        <FirstStep
          num={1}
          data1={data1}
          setData1={setData1}
          csv1={csv1}
          setCsv1={setCsv1}
          fetchGemini={fetchGemini}
          resize={resize1}
          setResize={setResize1}
        />
        <FirstStep
          num={2}
          data1={data2}
          setData1={setData2}
          csv1={csv2}
          setCsv1={setCsv2}
          fetchGemini={fetchGemini}
          resize={resize2}
          setResize={setResize2}
        />
      </div>
      <br />
      <div id="integration" className="mb-4 bg-center">
        {/* <h2 className="block font-bold mb-2">レシピデータを統合する</h2> */}
        <Integration
          csv1={csv1}
          csv2={csv2}
          fetchGemini={fetchGemini}
          resize1={resize1}
          resize2={resize2}
        />
      </div>
    </div>
  );
}

export default App;
