import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { IconBaseProps } from 'react-icons';

import { IconBtnType, IconButton } from '../IconButton';
import { Loader } from '../Loader';

import styles from './List.module.scss';

interface ListData {
  loading: boolean;
  items: any[];
  selectors: {
    id: string;
    title?: string;
    description?: string;
    descriptionGenerator?: (item: any) => string;
  }
}

interface Action {
  type: IconBtnType;
  icon: React.ComponentType<IconBaseProps>;
  method: (item?: any) => void;
}

interface OverlapMessage {
  show: boolean;
  message: string;
}

interface Props {
  data: ListData;
  actions?: Action[];
  overlapMessages?: OverlapMessage[];
  onSelect?: (item?: any) => void;
}

const List = ({ data, actions, overlapMessages, onSelect }: Props) => {
  const [selectedId, setSelectedId] = useState('');

  const handleClickItem = useCallback((item: any) => {
    setSelectedId(item[data.selectors.id]);

    if (onSelect) onSelect(item);
  }, [data.selectors.id, onSelect]);

  return (
    <div className={styles.list_container}>
      {data.loading && <Loader />}

      {overlapMessages?.map(({ show, message }) => show && <div className={styles.no_message}>{message}</div>)}

      {!data.loading && data.items.map((item: any, index) =>
        <div key={item[data.selectors.id]} className={clsx(styles.list_item, { [styles.selected]: item[data.selectors.id] === selectedId })}>
          <div className={styles.list_item_info} onClick={() => handleClickItem(item)}>
            {!!data.selectors.title
              ? <b>{item[data.selectors.title]}</b>
              : <b>#{index + 1}</b>
            }

            {!!data.selectors.descriptionGenerator
              ? <div>{data.selectors.descriptionGenerator(item)}</div>
              : <div>{data.selectors.description ? item[data.selectors.description] : ''}</div>
            }
          </div>

          <div className={styles.actions_container}>
            {actions?.map(({ icon, method, type }) =>
              <IconButton btnType={type} icon={icon} onClick={() => method(item)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
