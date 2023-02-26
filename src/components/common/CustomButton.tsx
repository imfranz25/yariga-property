import { Button } from '@pankod/refine-mui';
import { CustomButtonProps } from 'interfaces/common';

function CustomButton({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  handleClick,
  disabled = false,
}: CustomButtonProps) {
  return (
    <Button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      sx={{
        flex: fullWidth ? 1 : 'unset',
        width: fullWidth ? '100%' : 'content-fit',
        padding: '10px 15px',
        minWidth: 30,
        fontSize: 16,
        fontWeight: 600,
        gap: '10px',
        textTransform: 'capitalize',
        backgroundColor,
        color,
        '&:hover': {
          opacity: 0.9,
          backgroundColor,
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
}

export default CustomButton;
