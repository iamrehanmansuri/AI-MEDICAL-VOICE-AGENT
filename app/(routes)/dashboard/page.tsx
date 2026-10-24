import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorsAgentList from './_components/DoctorsAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog';

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-neutral-100">
            My Consultations Dashboard
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Start a new voice session or review your past clinical summaries
          </p>
        </div>
        <AddNewSessionDialog />
      </div>
      <HistoryList />

      <DoctorsAgentList />
    </div>
  );
}

export default Dashboard