import { twMerge } from "tailwind-merge"
interface props {
    children : React.ReactNode,
    className?: string
}

function Container({children, className}:props) {
  return (
    <div className={twMerge("w-11/12 mx-auto", className)}>
        {children}
    </div>
  )
}

export default Container