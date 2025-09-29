import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSec?.title}</p>
        </div>
        <div>
          <p>
            {(() => {
              const sec = Math.floor(subSec?.timeDuration || 0)
              const h = Math.floor(sec / 3600)
              const m = Math.floor((sec % 3600) / 60)
              const s = sec % 60

              if (h > 0) return `${h}h ${m}m ${s}s`
              if (m > 0) return `${m}m ${s}s`
              return `${s}s`
            })()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion