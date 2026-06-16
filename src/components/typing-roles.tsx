"use client";

import { useEffect, useMemo, useState } from "react";

type TypingRolesProps = {
  roles: string[];
};

export function TypingRoles({ roles }: TypingRolesProps) {
  const safeRoles = useMemo(() => roles.filter(Boolean), [roles]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (safeRoles.length === 0) {
      return;
    }

    const currentRole = safeRoles[roleIndex];
    const isComplete = letterCount === currentRole.length;
    const isEmpty = letterCount === 0;
    const delay = deleting ? 42 : isComplete ? 1200 : 72;

    const timer = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % safeRoles.length);
        return;
      }

      setLetterCount((count) => count + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letterCount, roleIndex, safeRoles]);

  const current = safeRoles[roleIndex] ?? "";

  return (
    <span className="inline-flex min-h-[1.3em] items-center text-cyan-200">
      {current.slice(0, letterCount)}
      <span className="ml-1 h-[1em] w-[2px] animate-pulse bg-cyan-300" />
    </span>
  );
}
