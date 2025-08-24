export default function Loading() {
  return (
    <div
      className="my-12 w-full animate-pulse place-items-center"
      role="status"
    >
      <div className="flex justify-between">
        <div className="p-4 h-96 w-full rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-slate-200 basis-full pl-4"></div>
      </div>
      <div className="mt-4">
        <div className="space-y-2 whitespace-pre-line">
          <div className="h-2 w-3/4 rounded bg-slate-200"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-3">
          <div className="p-4 h-56 w-56 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-slate-200"></div>
          <div className="p-4 h-56 w-56 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-slate-200"></div>
          <div className="p-4 h-56 w-56 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-slate-200"></div>
          <div className="p-4 h-56 w-56 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-slate-200"></div>
          <div className="p-4 h-56 w-56 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
