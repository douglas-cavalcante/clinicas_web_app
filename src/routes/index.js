import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Company from '~/pages/Company';
import OpeningHours from '~/pages/OpeningHours';

import PartnershipsList from '~/pages/Partneserships/List';
import PartnershipsForm from '~/pages/Partneserships/Form';
import ProceduresList from '~/pages/Procedures/List';
import ProceduresForm from '~/pages/Procedures/Form';

export default function Routes() {
  return (
    <Switch>
      <Route exat path="/" exact component={SignIn} />

      <Route exact path="/empresa" component={Company} isPrivate />
      <Route exact path="/horarios" component={OpeningHours} isPrivate />

      <Route exact path="/convenios" component={PartnershipsList} isPrivate />
      <Route
        exact
        path="/convenios/novo"
        component={PartnershipsForm}
        isPrivate
      />
      <Route
        path="/convenios/:id"
        exact
        component={PartnershipsForm}
        isPrivate
      />

      <Route
        exact
        path="/:id/procedimentos"
        component={ProceduresList}
        isPrivate
      />
      <Route
        exact
        path="/:partnership_id/procedimentos/novo"
        component={ProceduresForm}
        isPrivate
      />
      <Route
        exact
        path="/procedimentos/:id"
        component={ProceduresForm}
        isPrivate
      />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
