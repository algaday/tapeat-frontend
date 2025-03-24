import { revertLastHistory } from '@entities/fry-station-items-monitoring/model/slice';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';

export const useRevertLastHistory = () => {
  const completionHistory = useAppSelector((state) => state.fryStationMonitoring.completionHistory);
  const dispatch = useAppDispatch()

  const isRevertPossible = completionHistory.length > 0;

  return {
    isRevertPossible,
    revertLastHistory: ()=>dispatch(revertLastHistory()),
  };
};
