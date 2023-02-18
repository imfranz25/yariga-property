import { Box, Stack, Typography } from '@pankod/refine-mui';

import { propertyReferralsInfo } from 'constants/index';
import { ProgressBarProps } from '../../interfaces/progress-bar';

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {percentage}%
      </Typography>
    </Stack>
    <Box mt={2} position="relative" width="100%" height="8px" borderRadius={1} bgcolor="#e4e8ef">
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
);

function PropertyReferrals() {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#FCFCFC"
      id="chart"
      display="chart"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Property Referrals
      </Typography>
      <Stack my="20px" direction="column" gap={4}>
        {propertyReferralsInfo.map((bar, index) => (
          <ProgressBar
            key={bar.title + index}
            title={bar.title}
            percentage={bar.percentage}
            color={bar.color}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default PropertyReferrals;
