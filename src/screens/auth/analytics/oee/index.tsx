import { memo } from "react";
import { useFunctions } from "./useFunctions";

export const AnalyticsOeeScreen = memo(() => {
  const { loading, onAction } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">OEE Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Management and monitoring dashboard for oee analytics.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 max-w-4xl">
        <h2 className="text-lg font-bold mb-4 text-slate-200">OEE Analytics Overview</h2>
        <p className="text-sm text-slate-400 mb-6">
          This is a placeholder component for the oee analytics control center. Expand this interface with actual manufacturing data and interactions.
        </p>
        <button
          onClick={onAction}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer"
        >
          {loading ? "Processing..." : "Run Test Action"}
        </button>
      </div>
    </div>
  );
});
