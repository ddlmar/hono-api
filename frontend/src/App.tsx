import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center flex-col p-10 gap-2">
        <button
          className="px-2 py-1 bg-blue-500 min-w-32 text-white rounded-lg font-semibold"
          onClick={() => setCount((count) => count + 1)}
        >
          Upgrade
        </button>
        <button
          className="px-2 py-1 bg-red-500 min-w-32 text-white rounded-lg font-semibold"
          onClick={() => setCount((count) => count - 1)}
        >
          Downgrade
        </button>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
