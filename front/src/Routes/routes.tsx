import { Route, Switch } from 'react-router-dom'
import Tasks from '../Pages/HomePage'

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Tasks} exact>


            </Route>
        </Switch>
    );
}

export default Routes;