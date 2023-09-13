"use client"
import { AnimatePresence } from "framer-motion"
const Provider = ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <AnimatePresence>{
      children
      
    }</AnimatePresence>
    
  )
}

export default Provider