'use client';

import { useEffect, useState } from 'react';

// August 2026 deadline for EU AI Act Art. 50(4)
const DEADLINE = new Date('2026-08-01T00:00:00Z');

function calcDaysLeft(): number {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function DeadlineCountdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(calcDaysLeft());
    const id = setInterval(() => setDays(calcDaysLeft()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (days === null) return null;

  const urgency = days <= 14 ? 'red' : days <= 42 ? 'amber' : 'slate';
  const colorMap = {
    red: 'bg-red-50 border-red-200 text-red-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    slate: 'bg-slate-100 border-slate-200 text-slate-700',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 border text-sm font-semibold px-4 py-2 rounded-full ${colorMap[urgency]}`}
      role="timer"
      aria-label={`Noch ${days} Tage bis zur EU AI Act Deadline`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            urgency === 'red' ? 'bg-red-500' : urgency === 'amber' ? 'bg-amber-500' : 'bg-slate-400'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            urgency === 'red' ? 'bg-red-600' : urgency === 'amber' ? 'bg-amber-500' : 'bg-slate-500'
          }`}
        />
      </span>
      Noch {days} Tage — EU AI Act Art. 50(4) gilt ab August 2026
    </div>
  );
}
