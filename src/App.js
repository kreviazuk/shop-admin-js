import React from "react";
import './App.css';
import {ErrorBoundary} from 'react-error-boundary'
import { FullPageErrorFallback, FullPageLoading } from "./components/lib.jsx";
const AppProviders = React.lazy(()=> import('./context/index.jsx'))
function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={FullPageErrorFallback} onReset={()=>{}}>
        <React.Suspense fallback={<FullPageLoading />}>
          <AppProviders />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
