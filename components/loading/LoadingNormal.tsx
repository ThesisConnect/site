const LoadingNormal = () => {
  return (
    <div className="h-[calc(100vh-62px)] flex items-center justify-center bg-gray-100">
      <div className="flex space-x-4">
        <div className="w-16 h-16 border-t-4 border-teal-300 border-solid rounded-full animate-spin"></div>
        <div className="self-center text-xl font-semibold text-gray-700">
          Loading...
        </div>
      </div>
    </div>
  )
}

export default LoadingNormal