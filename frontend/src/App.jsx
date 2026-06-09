import { useState, useEffect } from "react";
import axios from "axios";

import UploadCard from "./components/UploadCard";
import ChatBox from "./components/ChatBox";
import DocumentList from "./components/DocumentList";

function App() {

  const [refreshDocs, setRefreshDocs] = useState(0);

  useEffect(() => {
    axios.delete("http://localhost:5000/documents");
  }, []);

  const handleUploadSuccess = () => {
    setRefreshDocs(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">

      <div className="text-center mb-8">

        <h1 className="text-6xl font-extrabold text-emerald-400">
          MediCode AI
        </h1>

        <p className="text-slate-400 mt-2 text-lg">
          AI-Powered ICD-10 / ICD-11 Knowledge Assistant
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="space-y-6">

          <UploadCard
            onUploadSuccess={handleUploadSuccess}
          />

          <DocumentList
            refreshDocs={refreshDocs}
          />

        </div>

        <div className="md:col-span-3">

          <ChatBox />

        </div>

      </div>

    </div>
  );
}

export default App;