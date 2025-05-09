import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';

import { StyledFileInput } from '@/shared/ui/image-upload/image-upload.styles';
import { Image, useCreateImageMutation } from '@shared/api';

type Props = {
  onChange(image: Image): void;
};

export default function InputFileUpload(props: Props) {
  const [createImage] = useCreateImageMutation();

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const image = await createImage(e.target.files[0]).unwrap();
      props.onChange(image);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{ margin: '20px 0' }}
    >
      Загрузить изображения
      <StyledFileInput type="file" onChange={onUploadImage} accept="image/png, image/jpeg" />
    </Button>
  );
}
