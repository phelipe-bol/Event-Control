import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from './pages/Main';
import Entry from './pages/Entry';
import CheckIn from './pages/CheckIn';

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Main,
      Entry,
      CheckIn,
    },
    {
      initialRouteName: 'Main',
      backBehavior: 'history',
    },
  ),
);

export default Routes;
