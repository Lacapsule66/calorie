"use client";

import { useState } from "react";

import { CheckCircle } from "../custom/icons";

export function AuthorizePayment({
  intent = { reservationId: "sample-uuid" },
}: {
  intent?: { reservationId: string };
}) {
  const [input, setInput] = useState("");

  return (
    <div className="bg-emerald-500 p-4 rounded-lg gap-4 flex flex-row justify-between items-center">
      <div className="dark:text-emerald-950 text-emerald-50 font-medium">
        Payment Verified
      </div>
      <div className="dark:text-emerald-950 text-emerald-50">
        <CheckCircle size={20} />
      </div>
    </div>
  );
}
