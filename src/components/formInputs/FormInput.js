import { FormInputLabel, Group, Input } from "./formInputStyles.js";

const FormInput = ({label, ...otherProps}) => {
  return (
    <Group>
      <Input
        {...otherProps}
      />
      {
        label && (
        <FormInputLabel
          shrink={otherProps.value.length}
        >
            {label}
        </FormInputLabel>
        )
      }
    </Group>
  )
}

export default FormInput
