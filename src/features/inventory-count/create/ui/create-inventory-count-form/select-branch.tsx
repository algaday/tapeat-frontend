import { MenuItem } from '@mui/material';

import { RHFSelect } from '@shared/ui/rhf/RHFSelect';

interface Branch {
  id: string;
  address: string;
}
interface Props {
  branches?: Branch[];
  isLoading: boolean;
}

export const BranchSelect = ({ branches, isLoading }: Props) => (
  <RHFSelect name="branchName" label="Филиал">
    {isLoading ? (
      <MenuItem disabled>загрузка...</MenuItem>
    ) : (
      branches?.map((branch) => (
        <MenuItem key={branch.id} value={branch.address}>
          {branch.address}
        </MenuItem>
      ))
    )}
  </RHFSelect>
);
