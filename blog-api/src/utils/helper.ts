import { ZodError } from "zod";

export const formatError = (err: ZodError): any => {
    let errors: any = {};
    err.errors?.forEach((issues) => {
        errors[issues.path[0]] = issues.message;
    });

    return errors
}
