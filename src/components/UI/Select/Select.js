const Select = () => {
  const date = new Date().getFullYear();
  const dates = [];
  for (let i = date; i >= 1940; i--) {
    dates.push(i);
  }
  return dates.map((date, index) => {
    return (
      <option value={date} key={`${index}+${date}`}>
        {date}
      </option>
    );
  });
};
export default Select;
