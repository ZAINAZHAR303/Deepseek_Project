import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";

export default function ConsentGenerator() {
  const [language, setLanguage] = useState("English");
  const [compliance, setCompliance] = useState("GDPR");
  const [template, setTemplate] = useState("Medical Research");
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedAgreement, setGeneratedAgreement] = useState("");
  const [auditTrail, setAuditTrail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://generateagrementbackend-production.up.railway.app/audit-trail")
      .then((res) => res.json())
      .then((data) => setAuditTrail(data.audit_trail));
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch("https://generateagrementbackend-production.up.railway.app/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json",
         "Connection": "keep-alive"
       },
      body: JSON.stringify({ language, compliance, template, user_prompt: userPrompt }),
    });
    const data = await response.json();
    setGeneratedAgreement(data.agreement);
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("generated-agreement");
    html2pdf()
      .from(element)
      .save("agreement.pdf");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">AI-Powered Smart Consent System</h1>
      <div className="space-y-2">
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-2 border rounded">
          {["English", "Spanish", "French", "German", "Chinese"].map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <label>Compliance:</label>
        <select value={compliance} onChange={(e) => setCompliance(e.target.value)} className="w-full p-2 border rounded">
          {["GDPR", "HIPAA", "CCPA", "None"].map((comp) => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>

        <label>Template:</label>
        <select value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full p-2 border rounded">
          {["Medical Research", "Data Sharing", "Legal Agreement", "Custom"].map((temp) => (
            <option key={temp} value={temp}>{temp}</option>
          ))}
        </select>

        <label>Request:</label>
        <textarea value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} className="w-full p-2 border rounded" rows="4" />
      </div>
      
      <button onClick={handleGenerate} className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
        {loading ? "Generating..." : "Generate Consent Agreement"}
      </button>

      {generatedAgreement && (
        <div className="p-4 mt-4 border rounded bg-gray-100">
          <h2 className="font-semibold">Generated Agreement:</h2>
          <div id="generated-agreement">
            <ReactMarkdown className="prose" style={{ textAlign: 'left' }}>{generatedAgreement}</ReactMarkdown>
          </div>
          <button onClick={handleDownloadPDF} className="mt-4 bg-green-500 text-white p-2 rounded">
            Download as PDF
          </button>
        </div>
      )}

      {/* <h2 className="font-semibold mt-6">Audit Trail:</h2>
      <ul className="space-y-2">
        {auditTrail.map((entry, index) => (
          <li key={index} className="p-2 border rounded">
            <strong>{entry.timestamp}</strong> - {entry.language}, {entry.compliance}, {entry.template}
            <p>{entry.generated_agreement}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}