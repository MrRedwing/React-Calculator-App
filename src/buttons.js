export function Button(props) {
  return (
    <div className="button">
      <button onClick={() => props.onClick()}>{props.value}</button>
    </div>
  );
}
