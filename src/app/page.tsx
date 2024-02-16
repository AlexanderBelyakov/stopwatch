'use client'
import "./index.css"
import { useState } from "react";
import Stopwatch from "./components/stopwatch/Stopwatch";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  return (
    <main className="main">
      <Stopwatch />
    </main>
  );
}
