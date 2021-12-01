import React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        { path: "messages", element: <DashboardMessages /> },
        { path: "tasks", element: <DashboardTasks /> }
      ]
    },
    { path: "team", element: <AboutPage /> }
  ]);

  return element;
}