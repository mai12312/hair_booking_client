"use client"
import { ValidatorErrorContext } from "@/slice/errors/error-validate.slice";
import { useContext } from "react";

export function useValidatorErrors<T>() {
    const context =  useContext(ValidatorErrorContext);
    const errors = context.errors as T;
    return {...context, errors};
}