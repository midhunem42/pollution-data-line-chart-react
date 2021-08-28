import { allLoadingSelector, roleSelector } from "./store/globalSelector";

import { Loader } from "./components/Loader";
import { PageRoute } from "./router";
import { useSelector } from "react-redux";

function App() {
  const role = useSelector(roleSelector);
  const loading: boolean = useSelector(allLoadingSelector);
  const redirectPath = role === "PUBLIC" ? "/home" : "/home";
  return (
    <>
      <PageRoute redirectPath={redirectPath} role={role} />
      {loading && <Loader />}
    </>
  );
}

export default App;
