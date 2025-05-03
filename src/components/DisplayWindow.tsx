interface DisplayWindowProps {
  expression: string;
  result: string;
}

function DisplayWindow({ expression, result }: DisplayWindowProps) {
  return (
    <div className="displayWindow">
      <p className="expression">{expression}</p>
      <p className="result">{result}</p>
    </div>
  );
}

export default DisplayWindow;
