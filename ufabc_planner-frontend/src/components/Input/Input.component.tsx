import { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core'

import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string
}

const Input = ({ label, name, ...rest }: Props) => {
  const inputRef = useRef(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={styles.input_label}>{label}</label>

      <input ref={inputRef} {...rest} name={name} className={styles.basic_input} />
    </div>
  )
};

export default Input;
