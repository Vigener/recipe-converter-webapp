import React from "react";

function Resizing({ csv1, setCsv1, resize, setResize }) {
  return (
    <div>
      <label htmlFor="csv1" className="block font-bold mb-2">
        CSVデータ
      </label>
      <textarea
        name="csvデータ"
        id="csv1"
        cols="30"
        rows="10"
        value={csv1}
        onChange={(e) => setCsv1(e.target.value)}
        className="border border-gray-300 rounded p-2"
      ></textarea>
      <div className="mt-1 mb-1 flex items-center justify-center">
        <span className="mt-">全体量を</span>
        <input
          type="number"
          id="resize"
          value={resize}
          onChange={(e) => setResize(e.target.value)}
          step="0.5"
          className="[appearance:textfield] [&::-webkit-outer-spin-button] [&::-webkit-inner-spin-button] border border-gray-300 rounded p-2 w-10 ml-2"
        />
        <span className="ml-2">倍にする</span>
      </div>
    </div>
  );
}

export default Resizing;
