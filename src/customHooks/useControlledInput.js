import { useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (init) => {
  const [value, setValue] = useState(init);
  return {
    value: value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };
};
