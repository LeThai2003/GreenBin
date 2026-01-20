import React, { useState } from "react";
import { toast } from "sonner";
import { fakeUser } from "../data/fakeUser";
import { useUserStore } from "../stores/useUserStore";
import QRScanner from "./QRScanner";

const fakeQRData = {
  organic: "QR_ORGANIC",
  recycle: "QR_RECYCLE",
  hazard: "QR_HAZARD",
  normal: "QR_NORMAL",
};

const Confirm = ({
  selectedBin,
  setSelectedBin,
  selectedType,
  successCount,
  setSuccessCount,
  failCount,
  setFailCount,
}) => {
  const addGreenPoint = useUserStore((s) => s.addGreenPoint);
  const minusTrainingPoint = useUserStore((s) => s.minusTrainingPoint);

  const [photoTaken, setPhotoTaken] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleConfirmDispose = () => {
    if (!photoTaken || !qrScanned || !selectedBin) {
      toast.warning("Vui lòng chụp ảnh và quét QR");
      return;
    }

    // const isCorrect = selectedType === selectedBin.type;

    const isCorrect =
      qrData?.includes(`TYPE=${selectedType}`) &&
      qrData?.includes(`BIN_ID=${selectedBin.id}`);

    if (isCorrect) {
      const nextSuccess = successCount + 1;
      setSuccessCount(nextSuccess);
      setFailCount(0);

      if (nextSuccess === 3) {
        addGreenPoint(10);
        toast.success("🌱 Bạn đã được +10 điểm xanh!");
        setSuccessCount(0);
      } else {
        toast.success("Bạn đã bỏ rác đúng nơi quy định!");
      }
    } else {
      const nextFail = failCount + 1;
      setFailCount(nextFail);
      setSuccessCount(0);

      if (nextFail >= 3) {
        minusTrainingPoint(5);
        toast.error("Sai 3 lần! Bị trừ 5 điểm rèn luyện");
        setFailCount(0);
      } else {
        toast.error("Bạn đã bỏ rác không đúng nơi quy định!");
      }
    }

    // reset cho lần tiếp theo
    // setPhotoTaken(false);
    // setQrScanned(false);
    // setSelectedBin(null);

    setPhoto(null);
    setQrData(null);
    setPhotoTaken(false);
    setQrScanned(false);
    setSelectedBin(null);
  };

  return (
    <div className="w-full ">
      <div className="flex gap-3 mt-1 mb-3">
        <div className="flex-1">
          {/* <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={() => setPhotoTaken(true)}
            className="hidden"
            id="camera"
          /> */}

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setPhoto(file);
              setPhotoTaken(true);
            }}
            className="hidden"
            id="camera"
          />

          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              className="mt-3 rounded-lg w-full max-w-xs"
              alt="Ảnh rác"
            />
          )}

          <button
            onClick={() => document.getElementById("camera").click()}
            className={`w-full px-4 py-2 rounded-lg ${
              photoTaken ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            📷 {photoTaken ? "Đã chụp" : "Chụp hình"}
          </button>
        </div>

        <div className="flex-1 ">
          {/* <button
            onClick={() => {
              if (selectedBin) {
                setQrScanned(true);
              }
            }}
            className={`w-full px-4 py-2 rounded-lg ${
              qrScanned ? "bg-green-500 text-white" : "bg-gray-200"
            } flex items-center justify-center gap-2`}
          >
            <img src="/qr-code-2.png" alt="qr code" className="size-5" />{" "}
            {qrScanned ? "Đã quét QR" : "Quét QR"}
          </button> */}

          <button
            onClick={() => setShowScanner(true)}
            className={`w-full px-4 py-2 rounded-lg ${
              qrScanned ? "bg-green-500 text-white" : "bg-gray-200"
            } flex items-center justify-center gap-2`}
          >
            <img src="/qr-code-2.png" alt="qr code" className="size-5" />
            {qrScanned ? "Đã quét QR" : "Quét QR"}
          </button>
        </div>
      </div>

      {showScanner && (
        <QRScanner
          onSuccess={(data) => {
            setQrData(data);
            setQrScanned(true);
            setShowScanner(false);
            toast.success("Quét QR thành công!");
          }}
        />
      )}

      <div>
        <button
          onClick={handleConfirmDispose}
          className="w-full bg-black/90 text-white py-2 rounded-lg"
        >
          Xác nhận bỏ rác
        </button>
      </div>
    </div>
  );
};

export default Confirm;
