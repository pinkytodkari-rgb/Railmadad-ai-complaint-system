import React, { useState } from 'react';
import { WATER_LEAKAGE_IMAGE } from '../../data/mockData';

export default function StaffTrainingPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      id: 1,
      image: WATER_LEAKAGE_IMAGE,
      question: "What primary defect is identified in this evidence photo?",
      options: [
        { label: "Water Leakage (Upper Panel)", correct: true },
        { label: "Electrical Switchboard Damage", correct: false },
        { label: "Coach Floor Cleanliness Issue", correct: false },
        { label: "Window Glass Fracture", correct: false }
      ],
      explanation: "Water droplets dripping from the upper panel ceiling indicate a drainage pipe leak requiring Water & Sanitation / Coach Maintenance intervention."
    }
  ];

  const currentQ = questions[0];

  const handleSelect = (index) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    if (currentQ.options[index].correct) {
      setScore(score + 1);
    }
  };

  return (
    <div class="w-full max-w-4xl mx-auto flex flex-col gap-6 py-2">
      <div class="flex justify-between items-center border-b border-outline-variant/60 pb-4">
        <div>
          <h1 class="font-bold text-2xl text-on-surface">Staff Defect Identification Training</h1>
          <p class="text-xs text-on-surface-variant">Train field maintenance staff to correctly identify and classify defect categories</p>
        </div>
        <div class="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">workspace_premium</span>
          Score: {score} / {questions.length}
        </div>
      </div>

      <div class="bg-surface rounded-xl border border-outline-variant p-6 shadow-xs flex flex-col md:flex-row gap-6 items-start">
        {/* Photo */}
        <div class="w-full md:w-80 h-56 rounded-lg overflow-hidden border border-outline-variant flex-shrink-0 bg-surface-container-low">
          <img src={currentQ.image} alt="Defect Training Sample" class="w-full h-full object-cover" />
        </div>

        {/* Quiz Area */}
        <div class="flex-grow flex flex-col gap-4 w-full">
          <span class="text-[11px] font-bold text-primary uppercase tracking-wider">Question 1 of 1</span>
          <h3 class="font-bold text-base text-on-surface">{currentQ.question}</h3>

          <div class="flex flex-col gap-2.5">
            {currentQ.options.map((opt, idx) => {
              let btnClass = "border-outline-variant hover:border-primary text-on-surface bg-surface";
              if (answered) {
                if (opt.correct) btnClass = "border-status-resolved bg-status-resolved/10 text-status-resolved font-bold";
                else if (selectedOption === idx) btnClass = "border-status-emergency bg-error-container/30 text-status-emergency";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  class={`p-3 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt.label}</span>
                  {answered && opt.correct && (
                    <span class="material-symbols-outlined text-status-resolved text-base">check_circle</span>
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div class="p-3 bg-ai-accent/30 border border-ai-stroke/40 rounded-lg text-xs text-on-surface mt-2 flex items-start gap-2">
              <span class="material-symbols-outlined text-ai-stroke text-base">info</span>
              <div>
                <strong>Explanation:</strong> {currentQ.explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
