import { useState } from "react";

export default function MainBox() {
  const [files, setFiles] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles(selectedFile);
    }
    setResults(null);
  };

  const onDiagnose = async () => {
    if (!files) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append("file", files);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl p-8 flex flex-1 justify-center text-amber-100 items-center md:items-center">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 w-full max-w-6xl">
        <div className="w-full max-w-2xl h-full border-dashed flex">
          <div className="">
            <h1 className="text-3xl md:text-4xl font-bold">
              Malaria Quick Diagnosis Tool
            </h1>
            <p className="text-2xl md:text-3xl font-thin mt-10">
              Upload a giemsa-stained <br />
              blood smear image to <br />
              quickly screen for malaria.
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-0 p-4 rounded w-full max-w-2xl flex flex-col gap-2 items-center border border-dashed">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileChange(e);
            }}
            className="block hover:underline w-full text-sm text-amber-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
          />
          <button
            className="mt-4 px-6 py-2 rounded-full bg-amber-700 text-white font-semibold hover:bg-amber-600 transition disabled:opacity-50 hover:cursor-pointer"
            disabled={!files || isLoading}
            hidden={!files}
            onClick={() => {
              onDiagnose();
            }}
          >
            Diagnose
          </button>

          {results && (
            <div
              className={`mt-4 p-2 rounded-lg text-center text-white ${
                results.class === "Uninfected" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <h2 className="text-lg font-bold">
                {results.class}
              </h2>
              <p className="mt-2">
                Confidence: around 90%
            </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
