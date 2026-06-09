import { useState } from "react";
import axios from "axios";

function UploadCard({ onUploadSuccess }) {

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {

    if (files.length === 0) {
      alert("Select at least one PDF");
      return;
    }

    try {

      for (const file of files) {

        const formData = new FormData();

        formData.append("pdf", file);

        await axios.post(
          "http://localhost:5000/upload",
          formData
        );

      }

      setMessage(
        `${files.length} file(s) uploaded successfully`
      );

      onUploadSuccess();

      setFiles([]);

    } catch (error) {

      console.error(error);

      setMessage("Upload failed");

    }

  };

  return (
    <div className="bg-slate-800 text-white rounded-3xl shadow-xl border border-white/40 p-6">

      <h2 className="text-xl font-semibold mb-4">
        Upload Documents
      </h2>

      <div className="mb-4">

        <label
          htmlFor="pdf-upload"
          className="
          cursor-pointer
          bg-emerald-600
          hover:bg-emerald-700
          text-white
          px-5
          py-3
          rounded-xl
          transition
          font-medium
          inline-block
          "
        >
          📄 Choose PDF Files
        </label>

        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={(e) =>
            setFiles(Array.from(e.target.files))
          }
        />

      </div>

      {files.length > 0 && (

        <div className="mb-4 text-sm text-gray-700">

          {files.map((file, index) => (

            <div key={index}>
              📄 {file.name}
            </div>

          ))}

        </div>

      )}

      <button
        onClick={uploadFile}
        className="
        w-full
        bg-emerald-600
        hover:bg-emerald-700
        text-white
        py-3
        rounded-xl
        transition
        font-medium
        "
      >
        Upload
      </button>

      {message && (

        <p className="mt-4 text-green-600 font-medium">
          {message}
        </p>

      )}

    </div>
  );
}

export default UploadCard;