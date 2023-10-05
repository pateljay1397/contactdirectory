import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import ContactIndex from "./Components/ContactPages/ContactIndex";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <ContactIndex />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
