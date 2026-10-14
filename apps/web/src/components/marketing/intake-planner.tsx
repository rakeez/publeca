"use client";

/**
 * The diagnostic planner (playbook P11a). One question per screen, answers changeable at any
 * point, then a summary that shows its working: each item names the answer(s) behind it.
 * Nothing is stored or sent. The only way answers leave the browser is a WhatsApp message the
 * reader sees and edits before sending.
 */

import Link from "next/link";
import { useState } from "react";
import { whatsappUrl } from "@/lib/brand";
import { QUESTIONS, isComplete, messageFor, planFor, type Answers } from "@/lib/content/intake";
import { CheckList } from "./ui";

export function IntakePlanner() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const q = QUESTIONS[step]!;
  const value = answers[q.id];
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const total = QUESTIONS.length;

  const choose = (id: string) => {
    if (q.multi) {
      // "Nothing yet" excludes everything else, and vice versa.
      const next =
        id === "nothing"
          ? ["nothing"]
          : selected.includes(id)
            ? selected.filter((x) => x !== id)
            : [...selected.filter((x) => x !== "nothing"), id];
      setAnswers({ ...answers, [q.id]: next });
      return;
    }
    const next = { ...answers, [q.id]: id };
    setAnswers(next);
    if (q.id === "business" && id === "events") return setShowResult(true);
    if (step < total - 1) setStep(step + 1);
    else if (isComplete(next)) setShowResult(true);
  };

  const canContinue = selected.length > 0;

  if (showResult && isComplete(answers)) {
    const plan = planFor(answers);
    const message = messageFor(answers, plan);
    const edit = () => {
      setShowResult(false);
      setStep(0);
    };

    if (plan.kind === "events") {
      return (
        <Panel>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Where to start</p>
          <p className="font-display mt-3 text-2xl font-bold tracking-tight text-slate-900">
            For ticketed events, start with the events arm.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            A growth diagnostic is built for companies. For an on-sale, the events team plans the campaign backward from
            your date, or you run it yourself on the ticketing platform with purchase tracking built in.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="intake-result"
              className="inline-flex items-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
            >
              Plan your event
            </a>
            <Link href="/events" className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
              See the events arm
            </Link>
          </div>
          <EditLink onClick={edit} />
        </Panel>
      );
    }

    return (
      <Panel>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">What a diagnostic would look at first</p>
        <p className="mt-2 text-sm text-slate-500">
          A starting list, not a verdict: the diagnostic itself confirms it or replaces it. No score, no forecast.
        </p>
        <ol className="mt-6 space-y-4">
          {plan.focus.map((f, i) => (
            <li key={f.id} className="animate-fade-up rounded-2xl border border-slate-200 p-5" style={{ animationDelay: `${i * 80}ms` }}>
              <p className="font-display text-lg font-semibold text-slate-900">
                <span className="mr-2 text-accent-500">{String(i + 1).padStart(2, "0")}</span>
                {f.title}
              </p>
              <p className="mt-1.5 leading-relaxed text-slate-600">{f.gets}</p>
              <p className="mt-3 text-sm text-slate-500">
                {f.because.length > 0 ? (
                  <>
                    <span className="font-semibold text-slate-700">Suggested because you said: </span>
                    {f.because.map((b, j) => (
                      <span key={b}>
                        {j > 0 && "; "}&ldquo;{b}&rdquo;
                      </span>
                    ))}
                    . You can change this.
                  </>
                ) : (
                  <span className="font-semibold text-slate-700">Where every diagnostic starts, whatever the answers.</span>
                )}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Where to start</p>
            <p className="mt-1.5 font-semibold text-slate-900">{plan.start.pkg}</p>
            <p className="mt-1 text-sm text-slate-600">{plan.start.shape}</p>
            <Link
              href={`/for/${plan.start.segment}#packages`}
              className="mt-2 inline-block text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand-600"
            >
              What it includes
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">What you would get each week</p>
            <div className="mt-2 text-sm">
              <CheckList items={[plan.reporting]} />
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="intake-result"
            className="inline-flex items-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
          >
            Talk it through on WhatsApp
          </a>
          <p className="text-sm text-slate-500">Your answers go in the message, so you can check and edit them before sending.</p>
        </div>
        <EditLink onClick={edit} />
      </Panel>
    );
  }

  return (
    <Panel>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Question {step + 1} of {total}
        </p>
        <div className="flex gap-1" aria-hidden>
          {QUESTIONS.map((x, i) => (
            <span key={x.id} className={`h-1.5 w-6 rounded-full transition-colors ${i <= step ? "bg-brand-500" : "bg-slate-200"}`} />
          ))}
        </div>
      </div>

      <fieldset key={q.id} className="mt-5 animate-fade-up">
        <legend className="font-display text-2xl font-bold tracking-tight text-slate-900">{q.prompt}</legend>
        {q.help && <p className="mt-1 text-sm text-slate-500">{q.help}</p>}
        <div className="mt-5 grid gap-2.5" role={q.multi ? "group" : "radiogroup"} aria-label={q.prompt}>
          {q.options.map((o) => {
            const on = selected.includes(o.id);
            return (
              <button
                key={o.id}
                type="button"
                role={q.multi ? "checkbox" : "radio"}
                aria-checked={on}
                onClick={() => choose(o.id)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium transition-colors duration-150 ${
                  on ? "border-brand-300 bg-brand-50 text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-5 w-5 shrink-0 items-center justify-center border text-[11px] font-bold ${
                    q.multi ? "rounded-md" : "rounded-full"
                  } ${on ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300"}`}
                >
                  {on && "✓"}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-900 disabled:invisible"
        >
          ← Back
        </button>
        {(q.multi || (step === total - 1 && canContinue) || (canContinue && step < total - 1)) && (
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => {
              if (step < total - 1) setStep(step + 1);
              else if (isComplete(answers)) setShowResult(true);
            }}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {step === total - 1 ? "Show what it would look at" : "Next"}
          </button>
        )}
      </div>
    </Panel>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">{children}</div>;
}

function EditLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-6 text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900">
      Change my answers
    </button>
  );
}
