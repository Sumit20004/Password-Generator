import React, { useState, useCallback, useEffect } from "react";

export default function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(true);
  const [vault, setVault] = useState([]);

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let pass = "";
    for (let i = 0; i < length; i++) pass += str[Math.floor(Math.random() * str.length)];
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(generatePassword, [length, numberAllowed, charAllowed, generatePassword]);

  const strength =
    password.length > 14 ? "Strong" : password.length > 10 ? "Medium" : "Weak";

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 transition-all
      ${dark ? "bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white" : "bg-slate-100 text-black"}`}
    >
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 space-y-5">

        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Password Generator</h1>
          <button
            onClick={() => setDark(!dark)}
            className="border px-3 py-1 rounded-lg text-sm"
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex rounded-xl overflow-hidden border bg-black/30">
          <input
            type={show ? "text" : "password"}
            value={password}
            readOnly
            className="w-full bg-transparent px-3 py-2 outline-none"
          />
          <button
            onClick={() => setShow(!show)}
            className="px-3 bg-emerald-500 text-black"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <div className="text-sm">
          Strength: <span className="font-bold">{strength}</span>
        </div>

        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full accent-emerald-500"
        />

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
              className="accent-emerald-500"
            />
            Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="accent-emerald-500"
            />
            Symbols
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-orange-500 hover:bg-orange-400 py-2 rounded-xl text-black font-semibold transition"
        >
          Generate New Password
        </button>

        <button
          onClick={() => setVault([...vault, password])}
          className="w-full bg-blue-500 hover:bg-blue-400 py-2 rounded-xl text-black font-semibold transition"
        >
          Save to Vault
        </button>

        <div className="max-h-32 overflow-y-auto space-y-1 text-sm">
          {vault.map((p, i) => (
            <div key={i} className="bg-black/30 rounded-lg px-3 py-1">
              {p}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
