import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormField } from "../components/ui/FormField"
import { useAuthStore } from "../stores/authStore"
import { getAuthErrorMessage } from "../utils/authError"
import { BrandMark } from "../components/ui/BrandMark"

export function LoginPage() {
  const navigate = useNavigate(); const location = useLocation(); const login = useAuthStore((state) => state.login); const [submitError, setSubmitError] = useState(""); const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: "onBlur" })
  const submit = async ({ identifier, password }) => { setSubmitError(""); try { const key = identifier.includes("@") ? "email" : "username"; await login({ [key]: identifier.trim(), password }); navigate(location.state?.from?.pathname || "/", { replace: true }) } catch (error) { setSubmitError(getAuthErrorMessage(error, "Unable to sign in. Check that the backend is running.")) } }
  return <AuthFrame title="Welcome back" subtitle="Sign in to continue watching."><form onSubmit={handleSubmit(submit)} noValidate className="space-y-5"><FormField label="Email or username" autoComplete="username" {...register("identifier", { required: "Enter your email or username" })} error={errors.identifier?.message} /><FormField label="Password" type="password" autoComplete="current-password" {...register("password", { required: "Enter your password" })} error={errors.password?.message} />{submitError && <p role="alert" className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm text-accent">{submitError}</p>}<button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-accent px-4 py-3 font-bold hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Signing in..." : "Sign in"}</button></form><p className="mt-6 text-center text-sm text-muted">New to StreamCore? <Link to="/register" className="font-semibold text-white hover:text-accent">Create account</Link></p></AuthFrame>
}
function AuthFrame({ title, subtitle, children }) { return <main className="grid min-h-screen place-items-center bg-ink p-5"><div className="w-full max-w-md rounded-xl border border-line bg-surface p-7 shadow-2xl"><div className="mb-8 text-center"><BrandMark className="mx-auto mb-5 h-14 w-14" /><h1 className="text-2xl font-bold">{title}</h1><p className="mt-2 text-sm text-muted">{subtitle}</p></div>{children}</div></main> }
