
export function SkeletonBannerLoading() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    )
}