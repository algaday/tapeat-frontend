import { Stack } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stack height="100%">{children}</Stack>
    </>
  );
}
