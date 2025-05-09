import { Box } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box padding={2} component={'section'}>
      {children}
    </Box>
  );
}
