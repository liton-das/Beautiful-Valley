import React from 'react'

const Loading = () => {
  return (
    <>
      {/* loading page design with animation */}
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-black px-4">
          {/* spinner or loading indicator */}
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-base text-blue-500">Loading...</h1>
          
        </div>
    </>
  )
}

export default Loading
