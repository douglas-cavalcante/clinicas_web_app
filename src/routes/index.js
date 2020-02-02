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

import ProfessionalForm from '~/pages/Professional/Form';
import ProfessionalList from '~/pages/Professional/List';

import RoomForm from '~/pages/Rooms/Form';
import RoomList from '~/pages/Rooms/List';

import ProfessionalScheduleList from '~/pages/ProfessionalSchedule/List';
import ProfessionalScheduleForm from '~/pages/ProfessionalSchedule/Form';
import ProceduresProfessionals from '~/pages/ProceduresProfessionals';
import Dashboard from '~/pages/Dashboard';
import SchedulesList from '~/pages/Schedule/List';

import IndicationForm from '~/pages/Indications/Form';
import IndicationList from '~/pages/Indications/List';

import PatientForm from '~/pages/Patients/Form';
import PatientList from '~/pages/Patients/List';
import SchedulesForm from '~/pages/Schedule/Form';
import AccountList from '~/pages/Financial/Accounts/List';
import AccountForm from '~/pages/Financial/Accounts/Form';
import FinancialsForm from '~/pages/Financial/Financials/Form';
import FinancialsList from '~/pages/Financial/Financials/List';
import UsersForm from '~/pages/Users';
import AuthorizationForm from '~/pages/Schedule/autorization/Form';
import MySchedules from '~/pages/MySchedules/List';
import SchedulesManuallyForm from '~/pages/Schedule/manually';
import ScheduleReport from '~/pages/Report/Schedules';
import MarketingReport from '~/pages/Report/Marketing';

import HistoryList from '~/pages/History/List';
import ProcedureReport from '~/pages/Report/Procedures';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} permissions={[1]} />

      <Route
        exact
        path="/relatorios/procedimentos"
        component={ProcedureReport}
        isPrivate
        permissions={[1, 4, 5]}
      />

      <Route
        exact
        path="/home"
        component={Dashboard}
        isPrivate
        permissions={[1, 2, 3, 4, 5]}
      />

      <Route
        exact
        path="/empresa"
        component={Company}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/horarios"
        component={OpeningHours}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/convenios"
        component={PartnershipsList}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/convenios/novo"
        component={PartnershipsForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        path="/convenios/:id"
        exact
        component={PartnershipsForm}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/:id/procedimentos"
        component={ProceduresList}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/:partnership_id/procedimentos/novo"
        component={ProceduresForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/procedimentos/:id"
        component={ProceduresForm}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/profissionais"
        component={ProfessionalList}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/profissionais/novo"
        component={ProfessionalForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/profissionais/:id"
        component={ProfessionalForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/profissionais/:id/usuario"
        component={UsersForm}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/:id/agenda"
        component={ProfessionalScheduleList}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/:id/agenda/nova"
        component={ProfessionalScheduleForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/:id/agenda/:agenda_id"
        component={ProfessionalScheduleForm}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/salas"
        component={RoomList}
        isPrivate
        isAdmin="1"
        permissions={[1]}
      />
      <Route
        exact
        path="/salas/nova"
        component={RoomForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/salas/:id"
        component={RoomForm}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/:id/procedimentos/alocar"
        component={ProceduresProfessionals}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/agendamentos/encaixe"
        component={SchedulesManuallyForm}
        isPrivate
        permissions={[1, 2, 3]}
      />

      <Route
        exact
        path="/agendamentos"
        component={SchedulesList}
        isPrivate
        permissions={[1, 2, 3]}
      />
      <Route
        exact
        path="/agendamentos/novo"
        component={SchedulesForm}
        isPrivate
        permissions={[1, 2, 3]}
      />

      <Route
        exact
        path="/agendamentos/:id"
        component={SchedulesForm}
        isPrivate
        permissions={[1, 2, 3]}
      />

      <Route
        exact
        path="/agendamentos/:id/autorizacao"
        component={AuthorizationForm}
        isPrivate
        permissions={[1, 2, 3]}
      />

      <Route
        exact
        path="/meus_agendamentos"
        component={MySchedules}
        isPrivate
        permissions={[1, 4, 5]}
      />

      <Route
        exact
        path="/indicacoes"
        component={IndicationList}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/indicacoes/nova"
        component={IndicationForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/indicacoes/:id"
        component={IndicationForm}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/pacientes/"
        component={PatientList}
        isPrivate
        permissions={[1, 2, 3]}
      />
      <Route
        exact
        path="/pacientes/novo"
        component={PatientForm}
        isPrivate
        permissions={[1, 2, 3]}
      />
      <Route
        exact
        path="/pacientes/:id"
        component={PatientForm}
        isPrivate
        permissions={[1, 2, 3]}
      />

      <Route
        exact
        path="/contas/"
        component={AccountList}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/contas/nova"
        component={AccountForm}
        isPrivate
        permissions={[1]}
      />
      <Route
        exact
        path="/contas/:id"
        component={AccountForm}
        isPrivate
        permissions={[1]}
      />

      <Route
        exact
        path="/movimentacoes/"
        component={FinancialsList}
        isPrivate
        permissions={[1, 3]}
      />
      <Route
        exact
        path="/movimentacoes/nova"
        component={FinancialsForm}
        isPrivate
        permissions={[1, 3]}
      />
      <Route
        exact
        path="/movimentacoes/:id"
        component={FinancialsForm}
        isPrivate
        permissions={[1, 3]}
      />

      <Route
        exact
        path="/relatorios/producao"
        component={ScheduleReport}
        isPrivate
        permissions={[1, 4, 5]}
      />

      <Route
        exact
        path="/relatorios/marketing"
        component={MarketingReport}
        isPrivate
        permissions={[1, 4, 5]}
      />

      <Route
        exact
        path="/historico/:id"
        component={HistoryList}
        isPrivate
        permissions={[1, 2, 3, 4, 5]}
      />
    </Switch>
  );
}
