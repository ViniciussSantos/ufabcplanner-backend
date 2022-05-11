import { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import styles from './SelectInput.module.scss';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string
}

const SelectInput: React.FC<Props> = ({ children, name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField } = useField(name);
  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={styles.input_label}>{label}</label>

      <select className={styles.basic_input} defaultValue={defaultValue} name={name} ref={inputRef} {...rest}>
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
