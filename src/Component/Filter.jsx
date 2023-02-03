import React,{useState} from "react";

const Filter = ({ onFilterChange }) => {
  const [Année, setAnnée] = useState("");
  const [age, setAge] = useState("");

  const handleAnnéeChange = event => {
    setAnnée(event.target.value);
    onFilterChange(age, event.target.value);
  };

  const handleAgeChange = event => {
    setAge(event.target.value);
    onFilterChange(event.target.value, Année);
  };

  return(
    <div className="filter">
      <input type="text" placeholder=" &#x1F50D; Rechercher" name="search" id="search" />
      
      <div class="select">
        <select name="Année" value={Année} id="format" onChange={handleAnnéeChange}>
          <option selected disabled>Année</option>
          <option value="pdf">PDF</option>
          <option value="txt">txt</option>
          <option value="epub">ePub</option>
          <option value="fb2">fb2</option>
          <option value="mobi">mobi</option>
        </select>
      </div>

      <div class="select">
        <select name="age" value={age} id="format" onChange={handleAgeChange}>
          <option selected disabled>Âge recommandé</option>
          <option value="pdf">PDF</option>
          <option value="txt">txt</option>
          <option value="epub">ePub</option>
          <option value="fb2">fb2</option>
          <option value="mobi">mobi</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
