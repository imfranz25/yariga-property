import {
  Box,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
} from '@pankod/refine-mui';
import { FormProps } from 'interfaces/common';
import { propertyTypes } from '../../constants';
import CustomButton from './CustomButton';

function Form({
  type,
  register,
  onFinish,
  formLoading,
  handleSubmit,
  handleImageChange,
  onFinishHandler,
  propertyImage,
}: FormProps) {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}
            >
              Enter a property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              autoComplete="off"
              {...register('title', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}
            >
              Property Description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write a description"
              color="info"
              style={{
                width: '100%',
                background: 'transparent',
                fontSize: '16px',
                borderColor: 'rgb(0,0,0,0.23)',
                borderRadius: 6,
                padding: 10,
                color: '#919191',
              }}
              {...register('description', { required: true })}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                displayEmpty
                required
                variant="outlined"
                color="info"
                defaultValue="apartment"
                inputProps={{
                  'aria-label': 'Without label',
                }}
                {...register('propertyType', { required: true })}
              >
                {propertyTypes.map((type, index) => (
                  <MenuItem key={type.value + index} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}
              >
                Enter a property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                type="number"
                {...register('price', { required: true })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              autoComplete="off"
              {...register('location', { required: true })}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px">
                Property Photo
              </Typography>
              <Button component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    /* @ts-ignore */
                    handleImageChange(e.target.files[0]);
                  }}
                />
                Upload *
              </Button>
            </Stack>
            <Typography fontSize={14} color="#808191" sx={{ wordBreak: 'break-all' }}>
              {propertyImage?.name}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor="#475be8"
            color="#FCFCFC"
          />
        </form>
      </Box>
    </Box>
  );
}

export default Form;
