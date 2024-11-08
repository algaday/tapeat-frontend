import { SideNavigation } from '@/widgets/side-navigation/side-navigation';
import { Grid } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={'auto'}>
          <SideNavigation />
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
