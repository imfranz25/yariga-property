import { useState } from 'react';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { useGetIdentity } from '@pankod/refine-core/dist/hooks';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Form from 'components/common/Form';

function CreateProperty() {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = () => {};
  const onFinishHandler = () => {};

  return (
    <Form
      title="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      propertyImage={propertyImage}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
    />
  );
}

export default CreateProperty;
