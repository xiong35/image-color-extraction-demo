import { RouteProps } from "react-router-dom";

import loadable from "@loadable/component";

export const routes: RouteProps[] = [
  {
    path: "/home",
    component: loadable(() => import("../pages/Home")),
    exact: true,
  },
];
