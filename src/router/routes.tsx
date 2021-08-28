import { Redirect, Route, Switch } from "react-router-dom";

import { HomeScreen } from "../screens/home";

const PublicOnly = ["PUBLIC"];
const All = ["PUBLIC", "USER"];
const onlyLoggedUser = ["USER"];

export const routes: any[] = [
  {
    id: "HomeScreen",
    path: "/home",
    component: HomeScreen,
    roles: PublicOnly,
  },
];

export function PrivateRoute(props: any) {
  const { children, redirect, roles, role, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const hasRole = !!roles.find((x: string) => x === role);
        return hasRole ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export function PageRoute(props: any) {
  const { redirectPath, role } = props;
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={redirectPath} />
      </Route>
      {routes.map((route) => {
        const { component: Component, path, id, roles } = route;
        return (
          <PrivateRoute
            key={id}
            path={path}
            roles={roles}
            redirect={redirectPath}
            role={role}
          >
            <Component />
          </PrivateRoute>
        );
      })}
      <Route path="*">
        <Redirect to={redirectPath} />
      </Route>
    </Switch>
  );
}
