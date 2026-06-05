import { memo } from "react";

import { Button } from "@components";

import { useFunctions } from "./useFunctions";

export const LoginScreen = memo(() => {
  const {
    email,
    password,
    loading,
    onSubmit,
    handleChangeEmail,
    handleChangePassword,
  } = useFunctions();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-manrope text-on-background p-4 transition-colors duration-250">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-10 md:p-10 shadow-2xl transition-colors duration-250">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-background mb-2">
            Mini MES
          </h1>
          <p className="text-sm text-on-surface-variant">
            Sign in to manage your manufacturing execution
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={handleChangeEmail}
              required
              className="w-full rounded-xl border border-border bg-surface-variant px-4 py-3 text-sm text-on-surface placeholder-placeholder focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={handleChangePassword}
              className="w-full rounded-xl border border-border bg-surface-variant px-4 py-3 text-sm text-on-surface placeholder-placeholder focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <Button.Primary
            type="submit"
            label="Sign In"
            loading={loading}
            fullWidth
            size="lg"
          />
        </form>
      </div>
    </div>
  );
});
