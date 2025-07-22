import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default DashboardLayout
