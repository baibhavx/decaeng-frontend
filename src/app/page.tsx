"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/incidents`)
      .then((res) => res.json())
      .then((data) => setIncidents(data))
      .catch((err) => console.error("Error fetching incidents:", err));
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Incident Management</h1>

      <Link href="/new" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        ➕ Add Incident
      </Link>
      <Link href="/triage" className="bg-green-500 text-white px-4 py-2 rounded">
        🔍 Start Triage
      </Link>

      <ul className="mt-6">
        {incidents.map((incident: {id: string; title: string; description: string}) => (
          <li key={incident.id} className="border p-4 my-2 rounded">
            <strong>{incident.title}</strong>
            <p>{incident.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

