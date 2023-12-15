export const Dropdown = ({ title, options }) => {
  return (
    <fieldset className="filter">
      <label
        htmlFor="list-selection"
        className="labelcontrol"
        aria-disabled="false"
        data-required="false"
      >
        {title}
        <div className="dp-select">
          <span className="dropdown-arrow"></span>
          <select
            id="list-selection"
            name="list-selection"
            aria-invalid="false"
          >
            {options.length > 0 &&
              options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>
      </label>
    </fieldset>
  );
};
