import { useCallback, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IClass, translateBiweeklyType, translateWeekday } from "../../../../interfaces/class";
import api from "../../../../services/api";
import { IconButton } from "../../../IconButton";

import styles from './ClassItem.module.scss';

interface Props {
  klass: IClass;
  onDelete: () => void;
}

const ClassItem = ({ klass, onDelete }: Props) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteClass = useCallback(async () => {
    setDeleteLoading(true);

    await api
      .delete(`/classes/delete/${klass.id}`)
      .then(() => onDelete())
      .catch(error => alert(error))
      .finally(() => setDeleteLoading(false));
  }, [klass.id, onDelete]);

  return (
    <div className={styles.item_container}>
      <div className={styles.info_container}>
        <b>{translateWeekday[klass.weekday]}{klass.biweeklyType && ` - ${translateBiweeklyType[klass.biweeklyType]}`}, das {klass.startTime} às {klass.endTime}</b>

        {(klass.bulding || klass.campus || klass.room) &&
          <div>{klass.campus && ` | ${klass.campus} | `}{klass.bulding && ` | ${klass.bulding} | `}{klass.room && ` | ${klass.room} | `}</div>
        }

        {klass.professor && <div>{klass.professor}</div>}
      </div>

      <IconButton btnType="error" icon={FiTrash2} onClick={() => handleDeleteClass()} loading={deleteLoading}/>
    </div>
  )
}

export default ClassItem;
