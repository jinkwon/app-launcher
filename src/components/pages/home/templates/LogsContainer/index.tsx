import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'

const LogsContainer = () => {
  const [logs, setLogs] = useState<any[]>([])

  // run once!
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs: any[]) => [...currLogs, log]),
      false
    )
    return () => {
      Unhook(window?.['console'] as any)
    }
  }, [])

  return <div>
    <Console logs={logs} variant="light" />
  </div>
}

export default LogsContainer;
