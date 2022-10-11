interface HelperInputsProps {
  values: number[];
}
export function HelperInputs(props: HelperInputsProps) {
  const helperInputs = [];
  for (let index = 1; index <= 9; index++) {
    if (props.values.includes(index)) {
      helperInputs.push(
        <div className="helper-input" key={`key-${index}`}>
          {index}
        </div>
      );
    } else {
      helperInputs.push(
        <div className="helper-input" key={`key-${index}`}>
          {"\u00A0"}
        </div>
      );
    }
  }

  return <div className="helper-inputs">{helperInputs}</div>;
}
