import { Fragment } from "react";

// Lets long URLs and email addresses wrap at their joints (after "/", before "@" or ".")
// instead of mid-word, which matters in the narrow value column on phones.
export function Breakable({ text }: { text: string }) {
  const parts = text.split(/(?=[@.])|(?<=\/)/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
