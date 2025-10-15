import { useState } from "react";
import axios from "axios";

export default function App() {
  const [method, setMethod] = useState("GET");
  const [baseUrl, setBaseUrl] = useState("https://productsapi-vt92.onrender.com/api/product");
  const [id, setId] = useState("");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const url = ["PUT", "DELETE"].includes(method) && id ? `${baseUrl}/${id}` : baseUrl;
      const data = ["POST", "PUT"].includes(method) ? JSON.parse(body) : undefined;
      const res = await axios({ method, url, data });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse(err.response?.data ? JSON.stringify(err.response.data, null, 2) : err.message);
    }
  };

  const methodColors = {
    GET: "bg-green-800 hover:bg-green-700",
    POST: "bg-blue-800 hover:bg-blue-600",
    PUT: "bg-orange-800 hover:bg-orange-600",
    DELETE: "bg-red-800 hover:bg-red-600",
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-lg"> Product API </h1>

      <div className="bg-gray-300 shadow-2xl rounded-xl w-full max-w-3xl p-6">
        {/* Method Buttons */}
        <div className="flex gap-3 mb-4 justify-center">
          {["GET", "POST", "PUT", "DELETE"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-5 py-2 rounded-lg font-semibold text-white transition-all transform
                ${method === m
                  ? `scale-105 shadow-lg ring-4 ring-white/30 ${methodColors[m]}`
                  : `opacity-80 ${methodColors[m]}`
                }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* URL Input */}
        <input
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="Enter API base URL"
          className="w-full border-2 border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 font-medium text-white"
        />

        {/* ID Input for PUT/DELETE */}
        {["PUT", "DELETE"].includes(method) && (
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Product ID"
            className="w-full border-2 border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-white bg-gray-700"
          />
        )}

        {/* Body Input for POST/PUT */}
        {["POST", "PUT"].includes(method) && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full border-2 border-gray-300 p-3 rounded-lg font-mono text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 font-medium text-white"
            placeholder='{"name": "Example Product", "price": 100}'
          />
        )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-full bg-indigo-800 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
        >
          Send Request
        </button>

        {/* URL Display */}
        <p className="text-sm font-medium text-gray-800 mt-3">
          Endpoint:{" "}
          <span className="font-medium text-indigo-700">
            {["PUT", "DELETE"].includes(method) && id ? `${baseUrl}/${id}` : baseUrl}
          </span>
        </p>

        {/* Response Box */}
        <pre className="bg-gray-900 text-green-400 mt-4 p-4 rounded-xl text-sm overflow-auto max-h-96 font-mono">
          {response || "// Response will appear here"}
        </pre>
      </div>
    </div>
  );
}
