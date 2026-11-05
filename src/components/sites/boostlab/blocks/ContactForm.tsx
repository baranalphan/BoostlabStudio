"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/app/support/actions";
import { cn } from "@/lib/utils";
import type { ContactField, ContactFormState } from "@/types/boostlab";
import { Container, Grid, Kicker, Spacer } from "../ui/Layout";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";
import { supportContact } from "../content";
import styles from "./ContactForm.module.css";

const initialState: ContactFormState = {
  status: "idle",
  values: { name: "", email: "", subject: "", message: "" },
};

/**
 * The support page's single contact card, in the bordered style the department cards had:
 * the heading and blurb on the left, the form on the right (stacked below 768px). It posts
 * to a Server Action that mails info@boostlabgames.com.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const { fields } = supportContact;

  const field = (name: ContactField, className?: string) => {
    const error = state.errors?.[name];
    const id = `contact-${name}`;
    const shared = {
      id,
      name,
      required: true,
      maxLength: supportContact.limits[name],
      placeholder: fields[name].placeholder,
      defaultValue: state.values[name],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
    };
    return (
      <div className={cn(styles.field, className)}>
        <label className={styles.label} htmlFor={id}>
          <Reveal mode="slide">{fields[name].label}</Reveal>
        </label>
        {name === "message" ? (
          <textarea className={cn(styles.input, styles.textarea)} rows={6} {...shared} />
        ) : (
          <input
            className={styles.input}
            type={name === "email" ? "email" : "text"}
            autoComplete={name === "name" ? "name" : name === "email" ? "email" : "off"}
            {...shared}
          />
        )}
        {error ? (
          <p className={styles.error} id={`${id}-error`}>
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <section className={styles.main}>
      <Spacer size="l" />
      <Container>
        <Grid className={styles.card}>
          <div className={styles.intro}>
            <Reveal>
              <Kicker className={styles.kicker}>{supportContact.kicker}</Kicker>
            </Reveal>
            <Spacer size="m" />
            <h2 className={styles.title}>
              <SplitText>{supportContact.title}</SplitText>
            </h2>
            <Spacer size="m" />
            <p className={styles.description}>
              <SplitText>{supportContact.description}</SplitText>
            </p>
            <Spacer size="m" />
            {/* The topics and the address are there from the start, not revealed on scroll:
                they sit low on the first screen, where a scroll reveal left them hidden
                until the visitor scrolled. */}
            <ul className={styles.topics}>
              {supportContact.topics.map((topic) => (
                <li key={topic}>
                  <span className={styles.topic}>{topic}</span>
                </li>
              ))}
            </ul>

            {/* Pinned to the bottom of the column so it lines up with the send button. */}
            <div className={styles.direct}>
              <p className={styles.label}>{supportContact.emailLabel}</p>
              <a className={styles.mail} href={`mailto:${supportContact.email}`}>
                {supportContact.email}
              </a>
            </div>
          </div>

          {/* Also a WebMCP tool, so a browser's AI agent can fill it in for the visitor; the
              visitor still presses send themselves. */}
          <form
            className={styles.form}
            action={formAction}
            toolname="contact_boostlab"
            tooldescription="Send a message to Boostlab Game Studio: player support, bug reports, feedback, business or press. Needs the sender's name, email, a subject and the message."
          >
            {field("name")}
            {field("email")}
            {field("subject", styles.full)}
            {field("message", styles.full)}

            {/* Honeypot for bots; hidden from people and assistive tech. */}
            <input
              className={styles.honeypot}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className={cn(styles.footer, styles.full)}>
              <Reveal>
                <Button type="submit" variant="secondary" disabled={pending}>
                  {pending ? supportContact.sending : supportContact.submit}
                </Button>
              </Reveal>
              <p
                className={styles.status}
                data-status={state.status}
                role="status"
                aria-live="polite"
              >
                {state.status === "success" ? supportContact.success : null}
                {state.status === "error" && !state.errors ? supportContact.error : null}
              </p>
            </div>
          </form>
        </Grid>
      </Container>
      <Spacer size="m" />
    </section>
  );
}
