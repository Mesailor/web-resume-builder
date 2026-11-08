import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  headline: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
  socialNetworks: z.object({
    linkedin: z.url("LinkedIn must be a valid URL.").optional(),
    github: z.url("LinkedIn must be a valid URL.").optional(),
    telegram: z.url("LinkedIn must be a valid URL.").optional(),
  }),
});

export const ResumeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      headline: "",
      location: "",
      email: "",
      phone: "",
      socialNetworks: {},
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <form
      id="resume-form"
      onSubmit={form.handleSubmit(onSubmit)}
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
    </form>
  );
};
