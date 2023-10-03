import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import ContactIndex from "./Components/ContactPages/ContactIndex";

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ContactIndex />
      </ErrorBoundary>
    </div>
  );
}

export default App;
