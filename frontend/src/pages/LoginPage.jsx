import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FormField } from "../components/ui/FormField"
import { useAuthStore } from "../stores/authStore"
import { getAuthErrorMessage } from "../utils/authError"

export function LoginPage() {
  const navigate = useNavigate(); const location = useLocation(); const login = useAuthStore((state) => state.login); const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ mode: "onBlur" })
  const submit = async ({ identifier, password }) => { try { const key = identifier.includes("@") ? "email" : "username"; await login({ [key]: identifier.trim(), password }); navigate(location.state?.from?.pathname || "/", { replace: true }) } catch (error) { setError("root.server", { message: getAuthErrorMessage(error, "Unable to sign in.") }) } }
  return <AuthFrame title="Welcome back" subtitle="Sign in to continue watching."><form onSubmit={handleSubmit(submit)} noValidate className="space-y-5"><FormField label="Email or username" autoComplete="username" {...register("identifier", { required: "Enter your email or username" })} error={errors.identifier?.message} /><FormField label="Password" type="password" autoComplete="current-password" {...register("password", { required: "Enter your password" })} error={errors.password?.message} />{errors.root?.server && <p role="alert" className="text-sm text-accent">{errors.root.server.message}</p>}<button disabled={isSubmitting} className="w-full rounded-lg bg-accent px-4 py-3 font-bold hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Signing in..." : "Sign in"}</button></form><p className="mt-6 text-center text-sm text-muted">New to StreamCore? <Link to="/register" className="font-semibold text-white hover:text-accent">Create account</Link></p></AuthFrame>
}
function AuthFrame({ title, subtitle, children }) { return <main className="grid min-h-screen place-items-center bg-ink p-5"><div className="w-full max-w-md rounded-xl border border-line bg-surface p-7 shadow-2xl"><div className="mb-8 text-center"><div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-lg bg-accent text-xl font-black">S</div><h1 className="text-2xl font-bold">{title}</h1><p className="mt-2 text-sm text-muted">{subtitle}</p></div>{children}</div></main> }
