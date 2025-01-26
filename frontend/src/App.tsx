import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/books/");
  }, []);

  return (
    <>
      <div className="flex m-autos flex-col p-10 gap-4">
        <Button
          variant="secondary"
          onClick={() => setCount((count) => count + 1)}
        >
          Upgrade
        </Button>
        <Button onClick={() => setCount((count) => count - 1)}>
          Downgrade
        </Button>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
