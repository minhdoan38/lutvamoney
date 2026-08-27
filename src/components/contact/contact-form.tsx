"use client";

import { type FormEvent, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/i18n/get-dictionary";

const initialValues = {
  name: "",
  company: "",
  phone: "",
  email: "",
  comment: "",
};

const formLabelClassName = "block font-mono text-xs font-medium leading-[1.4] tracking-[0.08em]";

const MAX_LENGTHS = {
  name: 120,
  company: 160,
  phone: 32,
  email: 254,
  comment: 2000,
} as const;

type FormValues = typeof initialValues;
type FormErrors = Partial<Record<keyof FormValues, string>>;

type FormCopy = Dictionary["contact"]["form"];

function validate(values: FormValues, errorsCopy: FormCopy["errors"]): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = errorsCopy.name;
  if (!values.company.trim()) errors.company = errorsCopy.company;
  if (!values.phone.trim()) errors.phone = errorsCopy.phone;
  if (values.name.length > MAX_LENGTHS.name) errors.name = errorsCopy.tooLong;
  if (values.company.length > MAX_LENGTHS.company) errors.company = errorsCopy.tooLong;
  if (values.phone.length > MAX_LENGTHS.phone) errors.phone = errorsCopy.tooLong;
  if (values.comment.length > MAX_LENGTHS.comment) errors.comment = errorsCopy.tooLong;
  if (!values.email.trim()) {
    errors.email = errorsCopy.email;
  } else if (values.email.length > MAX_LENGTHS.email) {
    errors.email = errorsCopy.tooLong;
  } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = errorsCopy.emailInvalid;
  }

  return errors;
}

type ContactFormProps = {
  copy: FormCopy;
};

export function ContactForm({ copy }: ContactFormProps) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function updateValue(field: keyof FormValues, value: string) {
    const maxLength = MAX_LENGTHS[field];
    setValues((current) => ({ ...current, [field]: value.slice(0, maxLength) }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedValues = {
      ...values,
      name: values.name.trim(),
      company: values.company.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      comment: values.comment.trim(),
    };
    const nextErrors = validate(normalizedValues, copy.errors);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      const firstErrorField = Object.keys(nextErrors)[0] as keyof FormValues;
      const fieldName = firstErrorField === "company" ? "organization" : firstErrorField === "phone" ? "tel" : firstErrorField;
      const field = formRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${fieldName}"]`);
      field?.focus();
      return;
    }

    setStatus("success");
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  }

  return (
    <div id="contact-form" className="scroll-mt-24 bg-foreground px-4 py-24 text-background sm:px-6 md:py-36 lg:px-10" aria-labelledby={`${formId}-heading`}>
      <div className="mx-auto grid max-w-375 gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <h2 id={`${formId}-heading`} className="text-xl font-medium leading-[1.05] tracking-[-0.02em]">
            {copy.heading}
          </h2>
          <p className="mt-7 max-w-[28ch] text-base leading-[1.6] text-background/70">
            {copy.lede}
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {status === "success" ? (
            <div className="border-t border-background/25 pt-7" role="status" aria-live="polite">
              <p className="max-w-xl text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-0.04em]">
                {copy.successTitle}
              </p>
              <p className="mt-7 max-w-md text-base leading-relaxed text-background/70">
                {copy.successBody}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="mt-9 border-background/35 text-background hover:border-background hover:bg-background hover:text-foreground"
              >
                {copy.successReset}
              </Button>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-8" aria-describedby={`${formId}-privacy ${formId}-status`}>
              <Field
                id={`${formId}-name`}
                label={copy.name}
                name="name"
                placeholder={copy.namePlaceholder}
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(value) => updateValue("name", value)}
                maxLength={MAX_LENGTHS.name}
              />
              <Field
                id={`${formId}-company`}
                label={copy.company}
                name="organization"
                placeholder={copy.companyPlaceholder}
                autoComplete="organization"
                value={values.company}
                error={errors.company}
                onChange={(value) => updateValue("company", value)}
                maxLength={MAX_LENGTHS.company}
              />
              <Field
                id={`${formId}-phone`}
                label={copy.phone}
                name="tel"
                placeholder={copy.phonePlaceholder}
                type="tel"
                autoComplete="tel"
                value={values.phone}
                error={errors.phone}
                onChange={(value) => updateValue("phone", value)}
                maxLength={MAX_LENGTHS.phone}
              />
              <Field
                id={`${formId}-email`}
                label={copy.email}
                name="email"
                placeholder={copy.emailPlaceholder}
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(value) => updateValue("email", value)}
                maxLength={MAX_LENGTHS.email}
              />

              <div className="space-y-3 pt-1">
                <label htmlFor={`${formId}-comment`} className={formLabelClassName}>
                  {copy.comment} <span className="font-normal text-background/55">{copy.commentOptional}</span>
                </label>
                <textarea
                  id={`${formId}-comment`}
                  name="comment"
                  value={values.comment}
                  onChange={(event) => updateValue("comment", event.target.value)}
                  placeholder={copy.commentPlaceholder}
                  rows={4}
                  maxLength={MAX_LENGTHS.comment}
                  className="block min-h-32 w-full resize-y rounded-none border-0 border-b border-background/25 bg-transparent px-0 py-3 text-base leading-[1.6] tracking-[0.01em] text-background outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] placeholder:text-background/55 focus-visible:border-background focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-foreground"
                />
              </div>

              <div className="border-t border-background/15 pt-7">
                <p id={`${formId}-privacy`} className="max-w-[38ch] text-sm leading-[1.5] text-background/70">
                  {copy.privacy}
                </p>
                <p id={`${formId}-status`} className="sr-only" aria-live="polite">
                  {Object.keys(errors).length > 0 ? copy.statusErrors : ""}
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="mt-8 min-h-14 w-full bg-background font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground hover:bg-accent hover:text-background"
                >
                  {copy.submit}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  autoComplete: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

function Field({ id, label, name, type = "text", autoComplete, placeholder, value, error, onChange, maxLength }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-3">
      <label htmlFor={id} className={formLabelClassName}>
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        required
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 border-0 border-b border-background/25 px-0 text-base leading-[1.4] tracking-[0.01em] text-background placeholder:text-background/55 aria-invalid:border-accent focus-visible:border-background focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base"
      />
      {error ? (
        <p id={errorId} className="text-sm font-medium leading-[1.4] text-background" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
