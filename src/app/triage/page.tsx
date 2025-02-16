"use client";
import { useState } from "react";

export default function Triage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [resolution, setResolution] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (res.ok) {
      const data = await res.json();
      setResults(data.results);
      setResolution(data.resolution);
    } else {
      alert("Error fetching results!");
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Triage Incident</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <textarea
          className="border p-2 rounded"
          placeholder="Describe the new incident..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Search & Get AI Insights
        </button>
      </form>

      {results.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6">🔍 Related Incidents</h2>
          <ul>
            {results.map((incident: {id: string; title: string; description: string; similarity: number}) => (
              <li key={incident.id} className="border p-4 my-2 rounded">
                <strong>{incident.title}</strong>
                <p>{incident.description}</p>
                <p className="text-sm text-gray-600">Similarity: {incident.similarity.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {resolution && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold">💡 Suggested Resolution</h2>
          <p>{resolution}</p>
        </div>
      )}
    </main>
  );
}

