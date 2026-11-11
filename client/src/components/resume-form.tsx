import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import {
  DEFAULT_RESUME_VALUES,
  resumeSchema,
  type Resume,
} from "@/types/resume";
import { Button } from "./ui/button";

interface ResumeFormProps {
  onSubmit: (data: Resume) => void;
}

export const ResumeForm = ({ onSubmit }: ResumeFormProps) => {
  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: DEFAULT_RESUME_VALUES,
  });

  function handleSubmit(data: Resume) {
    console.log("Form submitted with data:", data);
    onSubmit(data);
  }

  return (
    <form
      id="resume-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-2"
    >
      <FieldSet className="mt-6">
        <FieldLegend>General info</FieldLegend>
        <FieldDescription>Add your general information.</FieldDescription>
        <FieldGroup className="gap-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="headline"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-headline">Headline</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-headline"
                  aria-invalid={fieldState.invalid}
                  placeholder="Software Engineer"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="location"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-location">Location</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-location"
                  aria-invalid={fieldState.invalid}
                  placeholder="San Francisco, CA"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="john.doe@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-phone">Phone</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="555-555-5555"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet className="mt-6">
        <FieldLegend>Social networks</FieldLegend>
        <FieldDescription>Preffered social network links</FieldDescription>
        <FieldGroup className="gap-2">
          <Controller
            name="socialNetworks.linkedin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-linkedin">LinkedIn</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-linkedin"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://www.linkedin.com/in/johndoe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="socialNetworks.linkedin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-linkedin">GitHub</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-github"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://github.com/johndoe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="socialNetworks.telegram"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resume-form-linkedin">Telegram</FieldLabel>
                <Input
                  {...field}
                  id="resume-form-telegram"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://t.me/johndoe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};
