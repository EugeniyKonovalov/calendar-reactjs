import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import Input from "./Input";

type ExtendedInputProps = {
  control: Control<FieldValues> | undefined;
  input: React.InputHTMLAttributes<HTMLInputElement>;
};

const ExtendedFormInput = ({ control, input }: ExtendedInputProps) => {
  return (
    <Controller
      control={control}
      {...{
        name: "title",

        render: ({ field }) => (
          <Input {...{ input: { id: "title", ...field } }} />
        ),
      }}
    />
  );
};

export default ExtendedFormInput;
