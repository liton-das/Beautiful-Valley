import React from "react";

const Inputs = ({type, placeholder, value, name, onChange }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full bg-transparent px-3 py-2 outline-none text-sm"
      />
    </>
  );
};

export default Inputs;
