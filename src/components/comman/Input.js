import React from "react";

export const Input = function ({
  value = "",
  type = "text",
  onChange,
  name,
  placeholder = "Please Enter",
}) {
  return (
    <div className="form-group">
      <input
        name={name}
        type={type}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export const Button = function ({ className, onClick, text = "Submit" }) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {text}
    </button>
  );
};
