import React from "react"
import { ContactInfoBlock } from "./contact-info-block"
import { bgColor } from "./constants"

export const Footer = ({ isHome }: any) => {
  return (
    <footer className="lg:absolute md:relative sm:relative" style={{background: bgColor}}>
      {isHome && (
        <div className="lg:hidden md:inline-block text-center m-2 w-full">
          <ContactInfoBlock />
        </div>
      )}
      <div className="text-center">
        <span className="py-3">
          Copyright © {new Date().getFullYear()} - Julián García
        </span>
      </div>
    </footer>
  )
}