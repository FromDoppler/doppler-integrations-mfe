export const Dropdown = () => {
  return (
    <fieldset className="filter">
      <label
        htmlFor="list-selection"
        className="labelcontrol"
        aria-disabled="false"
        data-required="false"
      >
        Select list
        <div className="dp-select">
          <span className="dropdown-arrow"></span>
          <select
            id="list-selection"
            className=""
            name="list-selection"
            aria-invalid="false"
          >
            <option value="">
              Lorem Ipsum has been the industry's standard dummy
            </option>
            <option value="">item list</option>
            <option value="">item list</option>
            <option value="">item list</option>
          </select>
        </div>
      </label>
    </fieldset>
  );
};
