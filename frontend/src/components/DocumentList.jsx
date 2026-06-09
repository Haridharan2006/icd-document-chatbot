import { useEffect, useState } from "react";
import axios from "axios";

function DocumentList({ refreshDocs }) {

  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/documents"
      );

      setDocuments(response.data.documents);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshDocs]);

  return (
    <div className="bg-slate-800 text-white rounded-3xl shadow-xl border border-white/40 p-6">

      <h2 className="text-xl font-semibold mb-4">
        Uploaded Documents
      </h2>

      {documents.length === 0 ? (

        <p className="text-slate-300">
          No documents uploaded
        </p>

      ) : (

        <div className="space-y-3">

          {documents.map((doc, index) => (

            <div
              key={index}
              className="
              bg-slate-700
              rounded-xl
              p-3
              border
              border-slate-600
              shadow-sm
              "
            >

              <div className="flex items-center justify-between">

                <span className="font-medium">
                  📄 {doc.filename}
                </span>

                <span className="text-xs text-slate-300">
                  {doc.chunks} chunks
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default DocumentList;