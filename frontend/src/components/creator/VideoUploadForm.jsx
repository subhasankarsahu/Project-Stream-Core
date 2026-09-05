import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { videoApi } from "../../api/video.api"
import { queryClient } from "../../app/queryClient"
import { getAuthErrorMessage } from "../../utils/authError"
import { FormField } from "../ui/FormField"
import { ThumbnailUploader } from "./ThumbnailUploader"
import { VideoUploader } from "./VideoUploader"
import { useToast } from "../app/ToastProvider"

const fileRule = (maxBytes, label) => (files) => !files?.[0] || files[0].size <= maxBytes || `${label} must be smaller than ${maxBytes / (1024 * 1024)} MB`

export function VideoUploadForm({ video, onComplete }) {
  const editing = Boolean(video)
  const [serverError, setServerError] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { title: video?.title || "", description: video?.description || "" }, mode: "onBlur" })
  useEffect(() => { reset({ title: video?.title || "", description: video?.description || "" }) }, [video, reset])
  const submit = async (values) => {
    setServerError(""); setMessage("")
    try {
      const formData = new FormData()
      formData.append("title", values.title.trim())
      formData.append("description", values.description.trim())
      if (editing) {
        if (values.thumbnail?.[0]) formData.append("thumbnail", values.thumbnail[0])
        await videoApi.update(video._id, formData)
      } else {
        formData.append("videoFile", values.videoFile[0])
        formData.append("thumbnail", values.thumbnail[0])
        await videoApi.create(formData)
      }
      await queryClient.invalidateQueries({ queryKey: ["videos"] })
      await queryClient.invalidateQueries({ queryKey: ["channel-videos"] })
      await queryClient.invalidateQueries({ queryKey: ["dashboard-videos"] })
      const successMessage = editing ? "Video updated successfully." : "Video published successfully."
      setMessage(successMessage); toast(successMessage)
      if (!editing) reset()
      onComplete?.()
    } catch (error) { const errorMessage = getAuthErrorMessage(error, editing ? "Unable to update video." : "Unable to publish video."); setServerError(errorMessage); toast(errorMessage, "error") }
  }
  return <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5"><FormField label="Title" {...register("title", { required: "Enter a title", maxLength: { value: 120, message: "Keep the title under 120 characters" } })} error={errors.title?.message} /><label className="block space-y-2 text-sm font-medium"><span>Description</span><textarea rows="7" {...register("description", { required: "Enter a description", maxLength: { value: 5000, message: "Keep the description under 5000 characters" } })} className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-white outline-none focus:border-accent" />{errors.description && <span className="block text-xs text-accent">{errors.description.message}</span>}</label><div className="grid gap-5 md:grid-cols-2">{!editing && <VideoUploader register={register} error={errors.videoFile} /> }<ThumbnailUploader register={register} error={errors.thumbnail} preview={video?.thumbnail} /></div>{serverError && <p role="alert" className="text-sm text-accent">{serverError}</p>}{message && <p className="text-sm text-accent">{message}</p>}<button disabled={isSubmitting} className="rounded-lg bg-accent px-5 py-3 font-bold hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? (editing ? "Saving..." : "Uploading...") : (editing ? "Save changes" : "Publish video")}</button></form>
}
