export function VideoUploader({ register, error }) {
  return <label className="block space-y-2 text-sm font-medium"><span>Video file</span><input type="file" accept="video/mp4,video/webm,video/quicktime" {...register("videoFile")} className="block w-full text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-line file:px-3 file:py-2 file:text-white" />{error && <span className="block text-xs text-accent">{error.message}</span>}<span className="block text-xs font-normal text-muted">MP4, WebM, or MOV. Maximum 500 MB.</span></label>
}
