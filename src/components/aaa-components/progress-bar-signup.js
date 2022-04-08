import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from '../../icons/check-circle-outlined';

export const SignupBarProgress = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 6
      }}
      {...props}>
      <Container
        maxWidth={8}
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            alignItems: {
              sm: 'center',
              xs: 'flex-start'
            },
            display: 'flex',
            flexDirection: {
              sm: 'row',
              xs: 'column'
            },
            py: 3,
            m: -1,
            '& > *': {
              m: 1
            }
          }}
        >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                mr: 10
              }}
            >
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle2">
                User Account
              </Typography>
            </Box>

            
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                m: 10
              }}
            >
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle2">
                Create
              </Typography>
            </Box>

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                m: 10
              }}
            >
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle2">
                Create
              </Typography>
            </Box>

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                m: 10
              }}
            >
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle2">
                Create
              </Typography>
            </Box>
        </Box>
        
        </Container>
    </Box>
  );
};

export default SignupBarProgress;