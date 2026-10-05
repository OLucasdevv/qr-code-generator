import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function App() {
  const [url, setUrl] = useState("");
  const [white, setWhite] = useState(false);
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const link = document.createElement("a");
    link.download = white ? "qrcode-branco.png" : "qrcode-preto.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        background: "#f1f1f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          boxSizing: "border-box",
          background: "#fff",
          padding: "clamp(20px, 5vw, 32px)",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "clamp(22px, 6vw, 28px)",
            textAlign: "center"
          }}
        >
          Gerador de QR Code
        </h1>

        <p
          style={{
            margin: "0 0 24px",
            color: "#666",
            textAlign: "center",
            fontSize: "clamp(14px, 4vw, 15px)"
          }}
        >
          Cole uma URL e gere seu QR Code
        </p>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 16px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            fontSize: "16px",
            outline: "none",
            marginBottom: "16px"
          }}
        />

        {url.trim() && (
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "24px"
              }}
            >
              <button
                onClick={() => setWhite(false)}
                style={{
                  flex: 1,
                  padding: "12px 8px",
                  borderRadius: "10px",
                  border: white ? "1px solid #ddd" : "2px solid #111",
                  background: "#fff",
                  color: "#111",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                QR Preto
              </button>

              <button
                onClick={() => setWhite(true)}
                style={{
                  flex: 1,
                  padding: "12px 8px",
                  borderRadius: "10px",
                  border: white ? "2px solid #111" : "1px solid #ddd",
                  background: "#111",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                QR Branco
              </button>
            </div>

            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "24px",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundImage:
                  "linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0"
              }}
            >
              <div
                ref={qrRef}
                style={{
                  width: "82%",
                  maxWidth: "320px",
                  aspectRatio: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <QRCodeCanvas
                  value={url}
                  size={320}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  level="H"
                  includeMargin
                  fgColor={white ? "#FFFFFF" : "#000000"}
                  bgColor="transparent"
                />
              </div>
            </div>

            <button
              onClick={downloadQRCode}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "#111",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Baixar PNG transparente
            </button>
          </>
        )}
      </div>
    </div>
  );
}