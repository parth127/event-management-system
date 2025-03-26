import React, { useState, useEffect } from "react";

const CustomDateInput = ({ placeholder, value, onChange }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(!value);

  useEffect(() => {
    setShowPlaceholder(!value);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="date"
        value={value || ""}
        onChange={(e) => {
          onChange?.(e.target.value);
          setShowPlaceholder(!e.target.value);
        }}
        onFocus={() => {
          setShowPlaceholder(false);
        }}
        onBlur={() => {
          setShowPlaceholder(!value);
        }}
        style={{
          color: value ? "inherit" : "transparent",
        }}
        className="w-full border border-[#E5E7EB] rounded-md px-2 py-1.5"
      />
      {showPlaceholder && (
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none">
          {placeholder}
        </span>
      )}
    </div>
  );
};

export default CustomDateInput;
