import { cn } from '@/lib/utils';
import { min, max } from 'lodash';
import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
  ChangeEvent,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';

interface AutoResizingTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  classNameLabel?: string;
  label?: string;
  maxHeight?: number;
  minHeight?: number;
}

const AutoResizingTextArea: ForwardRefRenderFunction<HTMLTextAreaElement | null,AutoResizingTextAreaProps> = ({
  label,
  className,
  classNameLabel,
  maxHeight = 9999999,
  minHeight = 70,
  value,
  onChange,
  defaultValue,
  ...props
},forwardedRef) => {
  const [baseValue, setBaseValue] = useState<string>(defaultValue as string||'');
  const textAreaRef = useRef<HTMLTextAreaElement|null>(null);
  useImperativeHandle(forwardedRef, () => textAreaRef.current!, [textAreaRef]);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${min([
        max([textAreaRef.current.scrollHeight, minHeight]),
        maxHeight,
      ])}px`;
    }
  }, [value,baseValue, maxHeight, minHeight]);
  const handleChange =(e:ChangeEvent<HTMLTextAreaElement>)=>{
    setBaseValue(e.target.value)
    onChange?.(e)
  }
  return (
    <>
      <div className={classNameLabel}>{label}</div>
      <textarea
        {...props}
        ref={textAreaRef}
        value={value !== undefined ? value : baseValue}
        rows={1}
        style={{
          maxHeight,
          minHeight,
        }}
        onChange={handleChange}
        className={cn('resize-none p-1 mb-0', className)}
        
      />
    </>
  );
};

export default React.forwardRef(AutoResizingTextArea);
