import React from 'react'

function ResponsePg({ generatedContent }) {
  return (
    <div className="max-w-lg mx-auto">
    <h2>Generated Content:</h2>
    <pre>
        {generatedContent}
    </pre>
  </div>
  )
}

export default ResponsePg