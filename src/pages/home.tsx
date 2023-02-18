import React from 'react';
import { useList } from '@pankod/refine-core';

/* Components */
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { PieChart, TopAgent, PropertyReferrals, PropertyCard, TotalRevenue } from '../components';

function Home() {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={['#4753e8', '#e4e5ef']}
        />
        <PieChart
          title="Total Customers"
          value={5684}
          series={[75, 25]}
          colors={['#435ae8', '#eeedef']}
        />
        <PieChart
          title="Properties for Cities"
          value={212}
          series={[75, 25]}
          colors={['#452be8', '#e4efef']}
        />
        <Stack mt="25px" width="100%" direction={{ sm: 'column', lg: 'row' }}>
          <TotalRevenue />
          <PropertyReferrals />
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
