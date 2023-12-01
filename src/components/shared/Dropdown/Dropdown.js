export const Dropdown = () => {
  return (
    <fieldset className="filter">
      <label for="list-selection" class="labelcontrol" aria-disabled="false" data-required="false">Select list
            <div class="dp-select">
              <span class="dropdown-arrow"></span>
              <select id="list-selection" class="" name="list-selection" aria-invalid="false">
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
