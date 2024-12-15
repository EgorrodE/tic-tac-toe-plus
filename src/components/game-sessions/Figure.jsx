import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import { crossValue, circleValue, initValue } from '../../data/constants';

const iconByValue = (value) => {
  switch (value) {
    case crossValue:
      return faXmark;
    case circleValue:
      return faCircle;
    default:
      return;
  }
}

export default function Figure({ value }) {
  const icon = iconByValue(value);

  if (value === initValue || !icon) return '';

  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <FontAwesomeIcon icon={icon} className={`${value === circleValue ? 'h-75' : 'h-100'}`} />
    </div>
  );
}
