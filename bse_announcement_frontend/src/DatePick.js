// import React, { useState,forwardRef } from "react";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// const DatePick = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
//     <button className="example-custom-input" onClick={onClick} ref={ref}>
//       {value}
//     </button>
//   ));
//   return (
//     <div style={{ display: "flex", alignItems: "center" }}>
//   <label style={{ marginRight: "10px" }}>Pick a Date:</label>
//   <DatePicker
//     selected={startDate}
//     onChange={(date) => setStartDate(date)}
//     customInput={<ExampleCustomInput />}
//   />
// </div>
//   );
// };

// export default DatePick;
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePick = ({ onDateSelect }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setStartDate(date);
    onDateSelect(date);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ marginRight: "10px" }}>Pick a Date:</label>
      <DatePicker
        selected={startDate}
        onChange={handleDateSelect}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
};

export default DatePick;
