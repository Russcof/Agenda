import React from 'react';
import './DashboardCalendar.css'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';


const appointments = [
    {
        title: 'Website Re-Design Plan',
        startDate: new Date(2018, 6, 23, 9, 30),
        endDate: new Date(2018, 6, 23, 11, 30),
      }
]

const DashboardCalendar = () => {

    const currentDate = '2018-07-17';

    return (
        <div id="container3">
            <div id="calendar">
            <Paper>
                <Scheduler
                data={appointments}
                >
                <ViewState
                    defaultCurrentDate="2018-07-27"
                />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                </Scheduler>
            </Paper>
            </div>
        </div>
    )
}

export default DashboardCalendar;