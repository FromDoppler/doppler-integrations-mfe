export const Dropdown = () => {
  return (
    <fieldset className="filter">
      <label htmlFor="label">Label</label>
      <span className="dropdown-arrow" />
      <select id="id" value="">
        <option key="1" value="option1">
          option1
        </option>
        <option key="2" value="option2">
          option2
        </option>
      </select>
    </fieldset>
  );
};
