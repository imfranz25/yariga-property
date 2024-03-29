import { useMemo } from 'react';
import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, MenuItem, Select, Stack, TextField, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { propertyTypeNames } from '../constants';

/* Components */
import { PropertyCard, CustomButton } from 'components';

function AllProperties() {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();
  const allProperties = data?.data ?? [];
  const currentPrice = sorter.find((item) => item.field === 'price')?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
    };
  }, [filters]);

  /* Loading Screen */
  if (isLoading) return <Typography>Loading...</Typography>;

  /* Error data fetched */
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length ? 'There are no properties.' : ' All Properties'}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: '20px', sm: 0 }}>
              <CustomButton
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor="#475be8"
                color="#FCFCFC"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                required
                displayEmpty
                defaultValue=""
                inputProps={{ 'aria-label': 'Without Label' }}
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: 'propertyType',
                        operator: 'eq',
                        value: e.target.value ? e.target.value : undefined,
                      },
                    ],
                    'replace'
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {propertyTypeNames.map((typeName, index) => (
                  <MenuItem key={index} value={typeName.toLowerCase()}>
                    {typeName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignContent="center">
        <CustomButton
          title="Add Property"
          handleClick={() => navigate('/properties/create')}
          backgroundColor="#475be8"
          color="#FCFCFC"
          icon={<Add />}
        />
      </Stack>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>
      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            backgroundColor="#475be8"
            color="#FCFCFC"
            handleClick={() => setCurrent((prev) => prev - 1)}
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems="center" gap="5px">
            Page <strong>{current}</strong> of {pageCount}
          </Box>
          <CustomButton
            title="Next"
            backgroundColor="#475be8"
            color="#FCFCFC"
            handleClick={() => setCurrent((prev) => prev + 1)}
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            required
            displayEmpty
            defaultValue="10"
            inputProps={{ 'aria-label': 'Without Label' }}
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
}

export default AllProperties;
