import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./routes/NotFound";
import Root from "./routes/root";
import Players from "./routes/players";
import Teams from "./routes/teams";
import NewTeam from "./routes/NewTeam";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/players",
    element: <Players />,
  },
  {
    path: "/teams",
    element: <Teams />,
  },
  {
    path: "/teams/new",
    element: <NewTeam />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} />;
}