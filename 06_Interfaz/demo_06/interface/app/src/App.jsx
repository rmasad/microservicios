import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./routes/NotFound";
import Root from "./routes/root";
import Players from "./routes/players";
import Teams from "./routes/teams";
import NewTeam from "./routes/NewTeam";
import TeamDetail from "./routes/TeamDetail";
import PlayerDetail from "./routes/PlayerDetail";

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
    path: "/players/:id",
    element: <PlayerDetail />,
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
    path: "/teams/:id",
    element: <TeamDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
