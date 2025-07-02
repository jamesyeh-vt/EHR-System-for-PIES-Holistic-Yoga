import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export function SignaturePadField({ label, onEnd }) {
  const sigRef = useRef();
  return (
    <div className="mb-6">
      <p className="font-medium mb-2">{label}</p>
      <div className="border border-gray-300 rounded-md">
        <SignatureCanvas
          penColor="#000"
          canvasProps={{ width: 500, height: 150, className: "block" }}
          ref={sigRef}
          onEnd={() => onEnd(sigRef.current.getTrimmedCanvas().toDataURL())}
        />
      </div>
      <button
        type="button"
        onClick={() => sigRef.current.clear()}
        className="mt-2 text-sm text-brandLavender underline"
      >
        Clear
      </button>
    </div>
  );
}