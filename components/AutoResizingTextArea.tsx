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
  ...props
},forwardedRef) => {
  const textAreaRef = useRef<HTMLTextAreaElement|null>(null);
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  useImperativeHandle(forwardedRef, () => textAreaRef.current!, [textAreaRef]);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${min([
        max([textAreaRef.current.scrollHeight, minHeight]),
        maxHeight,
      ])}px`;
    }
  }, [message, maxHeight, minHeight]);
  return (
    <>
      <div className={classNameLabel}>{label}</div>
      <textarea
        {...props}
        ref={textAreaRef}
        value={message}
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
