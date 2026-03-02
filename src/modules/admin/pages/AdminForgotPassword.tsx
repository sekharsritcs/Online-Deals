import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    // Demo only – in real app call forgot password API
    console.log("Admin forgot password", { email });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reset admin password</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter the email you use for Woah Admin and we&apos;ll send reset instructions.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {submitted ? (
            <div className="space-y-4 text-sm text-slate-700">
              <p>
                If an account exists for <span className="font-medium">{email}</span>, you&apos;ll
                receive an email with a link to reset your password.
              </p>
              <p className="text-xs text-slate-500">
                For security reasons, we don&apos;t indicate whether an email is registered.
              </p>
              <div className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-700"
                >
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Admin email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="admin@woahdeals.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
              >
                Send reset link
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <Link to="/admin/login" className="font-medium text-orange-600 hover:text-orange-700">
                  Back to login
                </Link>
                <Link to="/" className="hover:text-slate-700">
                  Back to Woah Deals
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;

