'use client'
import React from "react"
import { icons } from "./icons"

export const ContactInfoBlock = () => {
  return (
    <div className="ContactInfoBlock text-black">
      <i>
        Department of AI and Data Science
        <br />
        Faculty of Information Technology
        <br />
        Monash University.
      </i>
      <div className="flex info-svg">
        {icons['Email']}
        <span>julian dot garcia at monash dot edu</span>
        <a href="mailto:julian.garcia@monash.edu" />
      </div>

      <div className="flex info-svg">
        <span className="text-black">
          {icons['Github']}
        </span>
        <span>/juliangarcia</span>
        <a
          href="https://github.com/juliangarcia"
          rel="noreferrer"
          target="_blank"
          title="Github"
        >
          https://github.com/garcia_juliang
        </a>
      </div>

      <div className="flex info-svg">
        <span className="text-red-500">
          {icons['LocationDot']}
        </span>
        29 Ancora Imparo Way, Clayton
        <br />
        VIC 3800, Australia
      </div>
    </div>
  )
}