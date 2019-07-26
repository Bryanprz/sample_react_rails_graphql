import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

const SelectField = ({ value, options, name, onChange }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      isMulti
      name={name}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )
};

export default SelectField;
