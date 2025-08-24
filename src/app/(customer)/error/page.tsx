export default function Error() {

  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Not Found
        </p>

        <p className="mt-4 text-gray-500">
          You must be logged in to access the page
        </p>
      </div>
    </div>
  )
}