"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M10 2L18 10L10 18L2 10Z" fill="white" opacity="0.85"/>
              <path d="M10 6L14 10L10 14L6 10Z" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-bold text-sm">quickmanage<span className="text-emerald-400 text-[10px] align-super">.com</span></span>
        </div>
        <div>
          <blockquote className="text-white text-xl font-medium leading-relaxed">
            &ldquo;QuickManage has completely transformed how we handle our daily operations. Everything is in one place and the team loves it.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="text-white font-medium">Sarah Johnson</p>
            <p className="text-slate-400 text-sm">CEO, TechFlow Inc.</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
                <path d="M10 2L18 10L10 18L2 10Z" fill="white" opacity="0.85"/>
                <path d="M10 6L14 10L10 14L6 10Z" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-sm">quickmanage<span className="text-emerald-500 text-[10px] align-super">.com</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 mt-1 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Error message */}
          {state?.error && (
            <div role="alert" className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-3 py-2.5 rounded-lg mb-4">
              <AlertCircle size={15} className="shrink-0" />
              {state.error}
            </div>
          )}

          <form action={action} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={pending}>
              {pending ? <><Loader2 size={15} className="animate-spin" /> Signing in…</> : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>

          {/* Dev hint */}
          <p className="text-center text-[11px] text-gray-300 mt-4">
            Demo: admin@quickmanage.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}
