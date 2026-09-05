import { useForm } from "react-hook-form"
import { playlistsApi } from "../../api/playlists.api"
import { getAuthErrorMessage } from "../../utils/authError"
import { FormField } from "../ui/FormField"

export function PlaylistForm({ playlist, onSaved, onCancel }) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: playlist?.name || "", description: playlist?.description || "" } })
  const submit = async (values) => { try { const saved = playlist ? await playlistsApi.update(playlist._id, values) : await playlistsApi.create(values); onSaved(saved) } catch (error) { setError("root.server", { message: getAuthErrorMessage(error, "Unable to save playlist.") }) } }
  return <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4"><FormField label="Name" {...register("name", { required: "Enter a playlist name", maxLength: { value: 100, message: "Keep the name under 100 characters" } })} error={errors.name?.message} /><label className="block space-y-2 text-sm font-medium"><span>Description</span><textarea rows="4" {...register("description", { required: "Enter a description", maxLength: { value: 500, message: "Keep the description under 500 characters" } })} className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-white outline-none focus:border-accent" />{errors.description && <span className="text-xs text-accent">{errors.description.message}</span>}</label>{errors.root?.server && <p className="text-sm text-accent">{errors.root.server.message}</p>}<div className="flex justify-end gap-3"><button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-muted hover:bg-line hover:text-white">Cancel</button><button disabled={isSubmitting} className="rounded-lg bg-accent px-4 py-2 text-sm font-bold hover:bg-accent-hover disabled:opacity-50">{isSubmitting ? "Saving..." : playlist ? "Save changes" : "Create playlist"}</button></div></form>
}
