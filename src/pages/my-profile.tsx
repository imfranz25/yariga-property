import { useGetIdentity, useOne } from '@pankod/refine-core';
import { Typography } from '@pankod/refine-mui';
import { Profile } from 'components';

function MyProfile() {
  const { data: user } = useGetIdentity();
  console.log(user);
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.email,
  });
  const myProfile = data?.data ?? [];
  console.log(myProfile);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Profile
      type="my"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
}

export default MyProfile;
