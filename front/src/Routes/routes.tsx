import { Route, Switch } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import TasksPage from '../Pages/TasksPage'

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/tasks/:id" component={TasksPage} />
        </Switch>
    );
}

export default Routes;