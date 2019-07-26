import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// Components
import KlassDashboard from '../Admin/KlassDashboard';
import TeacherDashboard from '../Admin/TeacherDashboard';
import Dashboard from '../Dashboard';
import LoginPage from '../LoginPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route
          path={'/admin/classes'}
          render={props => <KlassDashboard {...props} />}
        />
        <Route
          path={'/admin/teachers'}
          render={props => <TeacherDashboard {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
