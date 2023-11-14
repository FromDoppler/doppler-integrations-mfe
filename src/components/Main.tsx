import { Link, Outlet } from "react-router-dom";
import "./Main.css";

export const mainTestId = "outlet-test-id";

export function Main() {
  return (
    <div className="App" data-testid={mainTestId}>
      <h1>Hello!</h1>
      <main>
        <Outlet />
      </main>
      <br />
      <hr />
      <br />
      <h2>Example Pages:</h2>
      <ul>
        <li>
          <Link to="/campaigns/123">Campaign 123</Link>
        </li>
        <li>
          <Link to="/campaigns/678">Campaign 678</Link>
        </li>
        <li>
          <Link to="/configuration-demo">Configuration Demo</Link>
        </li>
        <li>
          <Link to="/session-demo">Session Demo</Link>
        </li>
      </ul>
    </div>
  );
}
