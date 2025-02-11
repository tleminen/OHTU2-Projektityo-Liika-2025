import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { changeLanguage } from '../store/languageSlice';

const FlagSelection = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.language.language);

  const options = [
    { value: 'fi', label: 'Suomi' },
    { value: 'en', label: 'Englanti' },
    //Lisätään muita kieliä tarvittaessa
  ];

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    console.log("value "+selectedOption.value);
    dispatch(changeLanguage(selectedOption.value));
  };

  const selectedOption = options.find(option => option.value === selectedLanguage);

  return (
    <div>
      <Select
        menuPlacement="top"
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default FlagSelection;