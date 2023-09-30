const LoadingPlan = () => {
  return (
    <div className="flex items-center justify-center h-[500px] gap-4">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-teal-800 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
      <div className="self-center text-xl font-semibold text-gray-700">
        Loading...
      </div>
    </div>
  )
}

export default LoadingPlan