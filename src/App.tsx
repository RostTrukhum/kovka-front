import { Router } from './containers/router';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <>
      <ReactNotifications className="custom-notification-container" />
      <Router />
    </>
  );
}

export default App;
