import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import tabs from "./data/tabs.json";

function App() {
  return (
    <Router>
      <div>
        <nav>
          {tabs
            .sort((a, b) => a.order - b.order)
            .map((tab) => (
              <Link key={tab.id} to={`/${tab.id}`}>
                {tab.title}
              </Link>
            ))}
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {tabs.map((tab) => {
              const Component = lazy(() => {
                return import(`./components/${tab.path.split("/").pop()}`);
              });
              return (
                <Route
                  key={tab.id}
                  path={`/${tab.id}`}
                  element={<Component />}
                />
              );
            })}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
