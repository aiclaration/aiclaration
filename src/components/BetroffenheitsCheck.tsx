'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react';

type Answer = 'ja' | 'nein' | null;
type Step = 'q1' | 'q2' | 'q3' | 'result';
type ResultKey = 'kein_ki' | 'nur_intern' | 'ausnahme' | 'betroffen';

interface ResultConfig {
  badge: string;
  title: string;
  text: string;
  bg: string;
  cta: boolean;
}

const QUESTIONS: Record<'q1' | 'q2' | 'q3', string> = {
  q1: 'Nutzt Ihr Unternehmen KI (ChatGPT, Claude, Copilot o. ä.) zur Erstellung von Texten für Ihre Website, Ihren Blog, Newsletter oder Social Media?',
  q2: 'Publizieren Sie diese KI-generierten Texte online für die Öffentlichkeit?',
  q3: 'Ist eine natürliche Person redaktionell verantwortlich und hat den KI-generierten Text vor Veröffentlichung vollständig überprüft?',
};

const RESULTS: Record<ResultKey, ResultConfig> = {
  kein_ki: {
    badge: 'Nicht betroffen',
    title: 'Kein KI-Einsatz — keine ai-transparency.json nötig',
    text: 'Da Sie keine KI zur Content-Erstellung nutzen, sind Sie von Art. 50(4) nicht betroffen. Falls sich das ändert, können Sie jederzeit zurückkommen.',
    bg: 'bg-emerald-50 border-emerald-200',
    cta: false,
  },
  nur_intern: {
    badge: 'Nicht betroffen',
    title: 'Nur intern — nicht von Art. 50(4) betroffen',
    text: 'Da Sie KI-generierte Texte nicht öffentlich publizieren, sind Sie nicht betroffen. Die Pflicht gilt nur bei öffentlicher Verbreitung.',
    bg: 'bg-emerald-50 border-emerald-200',
    cta: false,
  },
  ausnahme: {
    badge: 'Ausnahme möglich',
    title: 'Redaktionelle Prüfung — Ausnahme greift ggf.',
    text: 'Wenn eine natürliche Person den KI-generierten Text vollständig überprüft und redaktionell verantwortet, kann die Ausnahme von Art. 50(4) greifen. Dokumentieren Sie diesen Prozess trotzdem — als Nachweis gegenüber Behörden empfohlen.',
    bg: 'bg-amber-50 border-amber-200',
    cta: true,
  },
  betroffen: {
    badge: 'Betroffen',
    title: 'Betroffen — KI-Transparenz-Prozess dokumentieren',
    text: 'Sie müssen ab August 2026 Ihren KI-Transparenz-Prozess nachweisbar dokumentieren. Eine ai-transparency.json unter /.well-known/ auf Ihrer Website ist der Nachweis — kostenlos erstellbar.',
    bg: 'bg-red-50 border-red-200',
    cta: true,
  },
};

function getResult(q1: Answer, q2: Answer, q3: Answer): ResultKey {
  if (q1 === 'nein') return 'kein_ki';
  if (q2 === 'nein') return 'nur_intern';
  if (q3 === 'ja') return 'ausnahme';
  return 'betroffen';
}

export default function BetroffenheitsCheck() {
  const [step, setStep] = useState<Step>('q1');
  const [answers, setAnswers] = useState<{ q1: Answer; q2: Answer; q3: Answer }>({
    q1: null,
    q2: null,
    q3: null,
  });

  function handleAnswer(question: 'q1' | 'q2' | 'q3', value: 'ja' | 'nein') {
    const updated = { ...answers, [question]: value };
    setAnswers(updated);
    if (question === 'q1') {
      setStep(value === 'nein' ? 'result' : 'q2');
    } else if (question === 'q2') {
      setStep(value === 'nein' ? 'result' : 'q3');
    } else {
      setStep('result');
    }
  }

  function goBack() {
    if (step === 'q2') setStep('q1');
    else if (step === 'q3') setStep('q2');
    else if (step === 'result') {
      if (answers.q3 !== null) setStep('q3');
      else if (answers.q2 !== null) setStep('q2');
      else setStep('q1');
    }
  }

  function restart() {
    setStep('q1');
    setAnswers({ q1: null, q2: null, q3: null });
  }

  const stepNumber = step === 'q1' ? 1 : step === 'q2' ? 2 : step === 'q3' ? 3 : null;
  const result = step === 'result' ? RESULTS[getResult(answers.q1, answers.q2, answers.q3)] : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-8 min-h-11 py-2"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        Zurück zur Startseite
      </Link>

      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
        <span>Deadline: August 2026 — EU AI Act Art. 50(4)</span>
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">Bin ich betroffen?</h1>
      <p className="text-slate-700 mb-8">3 Fragen — unter 2 Minuten — kostenlos, ohne Anmeldung</p>

      {stepNumber && (
        <div className="flex gap-2 mb-8" role="progressbar" aria-valuenow={stepNumber} aria-valuemin={1} aria-valuemax={3} aria-label={`Schritt ${stepNumber} von 3`}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                n <= stepNumber ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      )}

      {step !== 'result' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">
            Frage {stepNumber} von 3
          </p>
          <p className="text-xl font-semibold text-slate-900 mb-8 leading-snug">
            {QUESTIONS[step as 'q1' | 'q2' | 'q3']}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleAnswer(step as 'q1' | 'q2' | 'q3', 'ja')}
              className="flex-1 bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11"
            >
              Ja
            </button>
            <button
              type="button"
              onClick={() => handleAnswer(step as 'q1' | 'q2' | 'q3', 'nein')}
              className="flex-1 bg-slate-100 text-slate-800 font-medium px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-200 transition-all duration-150 min-h-11"
            >
              Nein
            </button>
          </div>
          {step !== 'q1' && (
            <button
              type="button"
              onClick={goBack}
              className="text-sm text-slate-500 hover:text-slate-700 py-2"
            >
              ← Zurück
            </button>
          )}
        </div>
      )}

      {step === 'result' && result && (
        <div className={`rounded-2xl border-2 p-8 ${result.bg}`}>
          <div className="inline-flex items-center gap-2 text-sm font-semibold mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            {result.badge}
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">{result.title}</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">{result.text}</p>
          {result.cta && (
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 mb-4"
            >
              Jetzt Policy erstellen
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
          <div>
            <button
              type="button"
              onClick={restart}
              className="text-sm text-slate-500 hover:text-slate-700 py-2"
            >
              ← Nochmal von vorne
            </button>
          </div>
        </div>
      )}

      <p className="mt-8 text-xs text-slate-500 text-center">
        Kein Rechtsrat — für rechtssichere Beurteilung Ihres konkreten Falls: Rechtsanwalt hinzuziehen.
      </p>
    </div>
  );
}
