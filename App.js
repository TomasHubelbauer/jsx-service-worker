export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
      <div>{count}</div>
      <button
        title="Bump the counter"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}
