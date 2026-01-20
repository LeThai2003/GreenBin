import "./App.css";
import Header from "./components/Header";
import TrashMap from "./components/TrashMap";
import { Toaster, toast } from "sonner";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toaster richColors position="top-right" />

      {/* Header cao cố định */}
      <Header />

      {/* Nội dung chiếm phần còn lại */}
      <div className="flex-1 overflow-hidden">
        <TrashMap />
      </div>
    </div>
  );
}

export default App;
