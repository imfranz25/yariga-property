import { Add } from '@mui/icons-material';
import { useList } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

/* Components */
import { PropertyCard, CustomButton } from 'components';

function AllProperties() {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignContent="center">
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          All Properties
        </Typography>
        <CustomButton
          title="Add Property"
          handleClick={() => {}}
          backgroundColor="#475be8"
          color="#FCFCFC"
          icon={<Add />}
        />
      </Stack>
    </Box>
  );
}

export default AllProperties;
