    import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";
    import { DateTimePicker } from '@mui/x-date-pickers';
     
    type Props<T extends FieldValues> = UseControllerProps<T> & {
      label?: string;
    };
     
    export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
      const { field, fieldState } = useController({ ...props });
     
      return (
        <DateTimePicker
          value={field.value ?? null}
          onChange={(value) => {
            field.onChange(value);
          }}
          sx={{ width: '100%' }}
          slotProps={{
            textField: {
              label: props.label,
              onBlur: field.onBlur,
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
            }
          }}
        />
      );
    }