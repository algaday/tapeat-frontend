import { InventoryCountStatus } from '@shared/constants';

import { AlertStyle } from './style';

import { findAlertLabel } from '../utils/find-alert-label';
import { findAlertSeverity } from '../utils/find-alert-severity';

interface Props {
  status?: InventoryCountStatus;
}

export const CompletionStatus = ({ status = InventoryCountStatus.PENDING }: Props) => {
  return <AlertStyle severity={findAlertSeverity(status)}>{findAlertLabel(status)}</AlertStyle>;
};
