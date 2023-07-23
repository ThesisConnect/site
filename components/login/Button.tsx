import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' ;
  color?: 'bg-green-800' | 'bg-white';
  className?: string;
}
const Button:React.FC<ButtonProps> = ({className,color="bg-green-800",type,...props}) => {
  return (
    <button className={twMerge(`${color} w-10/12 mt-2 h-10 rounded-full `,`${className}`)} {...props}/>
  )
}

export default Button