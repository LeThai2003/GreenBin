import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QRScanner = ({ onSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false,
    );

    scanner.render(
      (decodedText) => {
        onSuccess(decodedText);
        scanner.clear();
      },
      (error) => {
        // bỏ qua lỗi quét
      },
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return <div id="qr-reader" />;
};

export default QRScanner;
