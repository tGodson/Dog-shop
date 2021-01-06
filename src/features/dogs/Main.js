import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dogs from './Dogs';
import Dog from './Dog';
import Contact from '../../components/Contact';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Dogs} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/:id" component={Dog} />
    </Switch>
  </main>
);
export default Main;
