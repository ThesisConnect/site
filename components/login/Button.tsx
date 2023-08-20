import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'bg-green-800' | 'bg-white';
  className?: string;
}
const Button =forwardRef<HTMLButtonElement, ButtonProps>(({className,color="bg-green-800",...props},ref) => {
  return (
    
    <button ref={ref}  className={twMerge(`${color} w-10/12 mt-2 h-10 rounded-full `,`${className}`)} {...props}/>
  )
})
Button.displayName = "Button";

export default Button