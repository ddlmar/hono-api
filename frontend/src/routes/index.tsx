import { Button } from "@components/ui/button";
import { api } from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const getBooks = async () => {
  const response = await api.books.authors.$get();

  if (!response.ok) {
    throw new Error("Server error");
  }

  return response.json();
};

function Index() {
  const [count, setCount] = useState(0);

  const query = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

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
        <code>{JSON.stringify(query.data, null, 2)}</code>
      </div>
    </>
  );
}
