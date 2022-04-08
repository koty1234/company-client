import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';

export const TopSection = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 6
      }}
      {...props}>
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          align="center"
          variant="h3"
        >
          Add your company details
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          We will use this information to display to companies when they are filling out credit applications. 
        </Typography>
       
        </Container>
      </Box>
  );
};
