import React, { useState } from "react";
import { Palette, Check } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#22c55e" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#000000" },
  ];

  return (
    <div className="position-relative d-inline-block">
      
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-light d-flex align-items-center gap-2 shadow-sm"
        style={{ cursor: "pointer" }}
      >
        <Palette size={18} />
        Accent
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="position-absolute mt-3 p-3 bg-white border rounded shadow"
          style={{
            width: "260px",
            zIndex: 1000,
          }}
        >
          <div className="row g-3">
            {colors.map((color) => (
              <div
                key={color.value}
                className="col-3 text-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
              >
                {/* Circle */}
                <div
                  className="mx-auto d-flex align-items-center justify-content-center rounded-circle border"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: color.value,
                    borderWidth:
                      selectedColor === color.value ? "3px" : "1px",
                    borderColor:
                      selectedColor === color.value
                        ? "#000"
                        : "#dee2e6",
                    transition: "all 0.2s ease",
                  }}
                >
                  {selectedColor === color.value && (
                    <Check color="white" size={18} />
                  )}
                </div>

                {/* Name */}
                <div className="small mt-2 text-muted">
                  {color.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
