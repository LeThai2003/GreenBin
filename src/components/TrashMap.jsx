import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { trashBins } from "../data/trashBins";
import { useState } from "react";
import Confirm from "./Confirm";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function TrashMap() {
  const [selectedType, setSelectedType] = useState("organic");
  const [selectedBin, setSelectedBin] = useState(null);

  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  // Fake vị trí sinh viên
  const userLocation = {
    lat: 10.806727,
    lng: 106.713183,
  };

  const filteredBins = trashBins.filter((bin) => bin.type === selectedType);

  return (
    <div className="relative h-full flex flex-col px-[20px]">
      {/* Bộ chọn loại rác */}
      <div className="flex items-start gap-3 py-3 backdrop-blur-md flex-col md:flex-row md:items-center md:py-4 ">
        <h2 className="whitespace-nowrap text-sm font-semibold text-gray-700">
          🗑️ Chọn loại rác:
        </h2>

        <div className="flex gap-3 bg-white/90 backdrop-blur-md">
          <button
            onClick={() => {
              (setSelectedType("organic"), setSelectedBin(null));
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              selectedType === "organic"
                ? "bg-green-500 text-white shadow scale-110"
                : "bg-green-50 text-green-400 hover:bg-green-200"
            }`}
          >
            🟩 Hữu cơ
          </button>

          <button
            onClick={() => {
              (setSelectedType("recycle"), setSelectedBin(null));
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              selectedType === "recycle"
                ? "bg-blue-500 text-white shadow scale-110"
                : "bg-blue-50 text-blue-400 hover:bg-blue-200"
            }`}
          >
            🟦 Tái chế
          </button>

          <button
            onClick={() => {
              (setSelectedType("hazard"), setSelectedBin(null));
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              selectedType === "hazard"
                ? "bg-red-500 text-white shadow scale-110"
                : "bg-red-50 text-red-400 hover:bg-red-200"
            }`}
          >
            🟥 Nguy hại
          </button>

          <button
            onClick={() => {
              (setSelectedType("normal"), setSelectedBin(null));
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              selectedType === "normal"
                ? "bg-gray-700 text-white shadow scale-110"
                : "bg-gray-50 text-gray-400 hover:bg-gray-200"
            }`}
          >
            ⬛ Khác
          </button>
        </div>
      </div>

      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          zoom: 16,
        }}
        style={{ width: "100%", height: "80%", borderRadius: "10px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* Marker vị trí sinh viên */}
        <Marker latitude={userLocation.lat} longitude={userLocation.lng}>
          <div className="relative flex items-center justify-center">
            {/* Radar */}
            <span className="absolute inline-flex h-10 w-10 rounded-full bg-pink-400 opacity-75 animate-ping"></span>

            {/* Vòng tròn cố định */}
            {/* <span className="absolute inline-flex h-6 w-6 rounded-full bg-blue-500 opacity-80"></span> */}

            {/* Icon */}
            <span className="relative text-xl">📍</span>
          </div>
        </Marker>

        {/* Marker thùng rác */}
        {filteredBins.map((bin) => (
          <Marker key={bin.id} latitude={bin.lat} longitude={bin.lng}>
            <div
              className="relative flex items-center justify-center cursor-pointer group"
              onClick={() => setSelectedBin(bin)}
            >
              {/* Radar */}
              <span
                className={`absolute h-8 w-8 rounded-full ${bin.type == "recycle" || bin.type == "organic" ? "bg-green-400" : bin.type == "hazard" ? "bg-orange-400" : "bg-blue-400"} opacity-70 group-hover:opacity-90 animate-ping`}
              ></span>

              {/* Icon */}
              <img
                src={
                  bin.type === "recycle"
                    ? "/recycle-bin.png"
                    : bin.type === "hazard"
                      ? "/trash-danger.png"
                      : bin.type === "normal"
                        ? "/normal.png"
                        : "/trash-bin.png"
                }
                alt="bin"
                className="relative size-6"
              />
            </div>
          </Marker>
        ))}
      </Map>

      {/* ===== Info thùng rác ===== */}
      {/* {selectedBin && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-md max-h-[50vh] bg-white rounded-xl shadow-lg p-4 overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
            <p className="font-semibold">Thùng rác: {selectedBin.id}</p>
            <p className="text-sm text-gray-700">
              Loại:{" "}
              {selectedBin.type == "organic"
                ? "Hữu cơ"
                : selectedBin.type == "normal"
                  ? "Khác"
                  : selectedBin.type == "hazard"
                    ? "Nguy hiểm"
                    : "Tái chế"}
            </p>

            <div className="flex gap-3 mt-3">
              <Confirm
                selectedBin={selectedBin}
                setSelectedBin={setSelectedBin}
                selectedType={selectedType}
                successCount={successCount}
                setSuccessCount={setSuccessCount}
                failCount={failCount}
                setFailCount={setFailCount}
              />
            </div>
          </div>
        </div>
      )} */}

      {selectedBin && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[86%] max-w-md bg-white rounded-xl shadow-lg flex flex-col max-h-[70vh]">
          {/* HEADER – cố định */}
          <div className="p-4 border-b border-gray-300">
            <p className="font-semibold">Thùng rác: {selectedBin.id}</p>
            <p className="text-sm text-gray-700">
              Loại:{" "}
              {selectedBin.type === "organic"
                ? "Hữu cơ"
                : selectedBin.type === "normal"
                  ? "Khác"
                  : selectedBin.type === "hazard"
                    ? "Nguy hiểm"
                    : "Tái chế"}
            </p>
          </div>

          {/* CONTENT – scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <Confirm
              selectedBin={selectedBin}
              setSelectedBin={setSelectedBin}
              selectedType={selectedType}
              successCount={successCount}
              setSuccessCount={setSuccessCount}
              failCount={failCount}
              setFailCount={setFailCount}
            />
          </div>

          {/* ACTION – cố định đáy */}
          <div className="p-3 border-t border-gray-300 bg-white">
            <button
              onClick={() => setSelectedBin(null)}
              className="w-full rounded-lg bg-gray-200 py-2 text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
