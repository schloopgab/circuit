import React, { useState, useEffect, useCallback } from "react";
import { storage } from "./storage.js";

// ---------- Design tokens ----------
// bg #14181A · surface #1E2426 · surface-2 #262E30 · line #33393B
// chalk #F3F1E7 · muted #8B9491 · accent (optic yellow-green) #CCE000
// warn (infield rust) #C1592F

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
`;

// ---------- Workout data ----------
// Every circuit is full-body — each round mixes a lower-body move, a push, a
// pull, and core, so no single session (or even round) is leg-only or
// upper-only. Two variants per circuit keep the exercises fresh week to week
// while the balance and joint cautions stay the same.
const DAYS = {
  A: {
    id: "A",
    name: "Circuit 1",
    focus: "Full Body",
    subtitle: "shoulder + knee aware",
    variants: [
      [
        [
          { id: "a1", name: "Goblet Box Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Sit to a higher box/chair; stop above any pinch." },
          { id: "a2", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Hands higher/more incline if it's achy today." },
          { id: "a3", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "a4", name: "Dead Bug", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a5", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
        [
          { id: "a6", name: "Low Box Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low — avoid a deep bend at the top leg." },
          { id: "a7", name: "Dumbbell Floor Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Elbows ~45° from torso, not flared to 90°." },
          { id: "a8", name: "Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "a9", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "a10", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
        ],
        [
          { id: "a11", name: "Single-Leg Glute Bridge", detail: "3 × 10 ea. leg", eq: "Bodyweight" },
          { id: "a12", name: "Band Face Pull", detail: "3 × 15", eq: "Band" },
          { id: "a13", name: "Single-Arm Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "a14", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "a15", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only — quarter squat depth, not 90°." },
        ],
      ],
      [
        [
          { id: "a1v2", name: "Dumbbell Sumo Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Shallow depth — stop above any pinch." },
          { id: "a2v2", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline if it's achy today." },
          { id: "a3v2", name: "Standing Band Row", detail: "3 × 15", eq: "Band" },
          { id: "a4v2", name: "Plank with Leg Lift", detail: "3 × 8 ea. side", eq: "Bodyweight" },
          { id: "a5v2", name: "Seated Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
        [
          { id: "a6v2", name: "Lateral Low Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "a7v2", name: "Band Internal Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "a8v2", name: "Light Renegade Row", detail: "3 × 8 ea. side", eq: "Dumbbell", flag: "shoulder", mod: "Keep hips stable, moderate weight only." },
          { id: "a9v2", name: "Side Plank Hip Dip", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a10v2", name: "Band Good Morning", detail: "3 × 12", eq: "Band" },
        ],
        [
          { id: "a11v2", name: "Split Squat Hold", detail: "3 × 20s ea. leg", eq: "Bodyweight", flag: "knee", mod: "Quarter-depth only, no deep front-knee bend." },
          { id: "a12v2", name: "Band Tricep Kickback", detail: "3 × 12", eq: "Band" },
          { id: "a13v2", name: "Light Front Raise", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Stop at shoulder height, no higher." },
          { id: "a14v2", name: "Hollow Body Hold", detail: "3 × 20s", eq: "Bodyweight" },
          { id: "a15v2", name: "Standing Band Hip Abduction", detail: "3 × 12 ea. side", eq: "Band" },
        ],
      ],
      [
        [
          { id: "a1v3", name: "Dumbbell Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "a2v3", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline if it's achy today." },
          { id: "a3v3", name: "Band Face Pull", detail: "3 × 15", eq: "Band" },
          { id: "a4v3", name: "Bird Dog", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a5v3", name: "Band Lateral Walk", detail: "3 × 10 ea. side", eq: "Band" },
        ],
        [
          { id: "a6v3", name: "Shallow Reverse Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short step, shallow depth — no deep knee bend." },
          { id: "a7v3", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "a8v3", name: "Light Renegade Row", detail: "3 × 8 ea. side", eq: "Dumbbell", flag: "shoulder", mod: "Keep hips stable, moderate weight only." },
          { id: "a9v3", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "a10v3", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "a11v3", name: "Bodyweight Squat", detail: "3 × 12", eq: "Bodyweight", flag: "knee", mod: "Only go as deep as feels clean — partial reps are fine." },
          { id: "a12v3", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "a13v3", name: "Hammer Curl", detail: "3 × 12", eq: "Dumbbell" },
          { id: "a14v3", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "a15v3", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
      ],
      [
        [
          { id: "a1v4", name: "Barbell Back Squat", detail: "3 × 8", eq: "Barbell", flag: "knee", mod: "Moderate depth, controlled tempo — don't force past any pinch." },
          { id: "a2v4", name: "Barbell Bench Press", detail: "3 × 8", eq: "Barbell", flag: "shoulder", mod: "Moderate grip width, elbows ~45° from torso." },
          { id: "a3v4", name: "Lat Pulldown", detail: "3 × 12", eq: "Machine" },
          { id: "a4v4", name: "Copenhagen Plank", detail: "3 × 15s ea. side", eq: "Bodyweight (bench)", flag: "knee", mod: "Bend the top knee to shorten the lever, or cut hold time short if the near knee is achy." },
          { id: "a5v4", name: "Cable Woodchopper", detail: "3 × 10 ea. side", eq: "Machine" },
        ],
        [
          { id: "a6v4", name: "Leg Press", detail: "3 × 10", eq: "Machine", flag: "knee", mod: "Don't lock out knees at the top; stop short of any pinch at the bottom." },
          { id: "a7v4", name: "Seated Cable Row", detail: "3 × 12", eq: "Machine" },
          { id: "a8v4", name: "Cable Face Pull", detail: "3 × 15", eq: "Machine" },
          { id: "a9v4", name: "Dead Bug", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a10v4", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
        ],
        [
          { id: "a11v4", name: "Leg Extension Machine", detail: "3 × 12, light", eq: "Machine", flag: "knee", mod: "Optional — light weight, partial range, skip entirely if it aggravates." },
          { id: "a12v4", name: "Barbell Romanian Deadlift", detail: "3 × 8", eq: "Barbell" },
          { id: "a13v4", name: "Standing Single-Arm Cable Press", detail: "3 × 10 ea. side", eq: "Machine", flag: "shoulder", mod: "Moderate weight, controlled path — stop if it pinches." },
          { id: "a14v4", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "a15v4", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
      ],
    ],
  },
  B: {
    id: "B",
    name: "Circuit 2",
    focus: "Full Body",
    subtitle: "shoulder + knee aware",
    variants: [
      [
        [
          { id: "b1", name: "Romanian Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "b2", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline (hands elevated) if it's achy today." },
          { id: "b3", name: "Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "b4", name: "Bird Dog", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "b5", name: "Band Lateral Walk", detail: "3 × 10 ea. side", eq: "Band" },
        ],
        [
          { id: "b6", name: "Seated Leg Extension", detail: "3 × 12, light", eq: "Band", flag: "knee", mod: "Optional — skip entirely if it aggravates; straight-leg raises are a fine swap." },
          { id: "b7", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "b8", name: "Overhead Band Press", detail: "3 × 10", eq: "Band", flag: "shoulder", mod: "Optional — skip if achy overhead; a single-arm landmine press is a good sub." },
          { id: "b9", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "b11", name: "Bodyweight Squat", detail: "3 × 12", eq: "Bodyweight", flag: "knee", mod: "Only go as deep as feels clean — partial reps are fine." },
          { id: "b12", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "b13", name: "Light Lateral Raise", detail: "3 × 12", eq: "Dumbbell", flag: "shoulder", mod: "Stop at shoulder height, no higher." },
          { id: "b14", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "b15", name: "Band Monster Walk", detail: "3 × 10 steps ea. dir.", eq: "Band" },
        ],
      ],
      [
        [
          { id: "b1v2", name: "Dumbbell Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "b2v2", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Elevate hands more if achy today." },
          { id: "b3v2", name: "Band Face Pull", detail: "3 × 15", eq: "Band" },
          { id: "b4v2", name: "Superman", detail: "3 × 12", eq: "Bodyweight" },
          { id: "b5v2", name: "Band Clamshell", detail: "3 × 12 ea. side", eq: "Band" },
        ],
        [
          { id: "b6v2", name: "Straight-Leg Raise", detail: "3 × 12, light", eq: "Bodyweight", flag: "knee", mod: "Optional — skip if it aggravates." },
          { id: "b7v2", name: "Band Internal/External Rotation", detail: "3 × 10 ea. side", eq: "Band" },
          { id: "b8v2", name: "Light Arnold Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Optional — skip if overhead pressing is achy." },
          { id: "b9v2", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10v2", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "b11v2", name: "Shallow Reverse Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short step, shallow depth — no deep knee bend." },
          { id: "b12v2", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "b13v2", name: "Hammer Curl", detail: "3 × 12", eq: "Dumbbell" },
          { id: "b14v2", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "b15v2", name: "Band Fire Hydrant", detail: "3 × 10 ea. side", eq: "Band" },
        ],
      ],
      [
        [
          { id: "b1v3", name: "Goblet Box Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Sit to a higher box/chair; stop above any pinch." },
          { id: "b2v3", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Hands higher/more incline if it's achy today." },
          { id: "b3v3", name: "Standing Band Row", detail: "3 × 15", eq: "Band" },
          { id: "b4v3", name: "Dead Bug", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "b5v3", name: "Band Monster Walk", detail: "3 × 10 steps ea. dir.", eq: "Band" },
        ],
        [
          { id: "b6v3", name: "Low Box Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low — avoid a deep bend at the top leg." },
          { id: "b7v3", name: "Band Internal Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "b8v3", name: "Light Lateral Raise", detail: "3 × 12", eq: "Dumbbell", flag: "shoulder", mod: "Stop at shoulder height, no higher." },
          { id: "b9v3", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10v3", name: "Band Pull-Through", detail: "3 × 12", eq: "Band" },
        ],
        [
          { id: "b11v3", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only — quarter squat depth, not 90°." },
          { id: "b12v3", name: "Band Tricep Kickback", detail: "3 × 12", eq: "Band" },
          { id: "b13v3", name: "Single-Arm Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "b14v3", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "b15v3", name: "Single-Leg Glute Bridge", detail: "3 × 10 ea. leg", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "b1v4", name: "Barbell Deadlift", detail: "3 × 8", eq: "Barbell" },
          { id: "b2v4", name: "Lat Pulldown", detail: "3 × 12", eq: "Machine" },
          { id: "b3v4", name: "Chest Press Machine", detail: "3 × 10", eq: "Machine", flag: "shoulder", mod: "Keep elbows slightly forward of your torso, moderate range." },
          { id: "b4v4", name: "Copenhagen Plank", detail: "3 × 15s ea. side", eq: "Bodyweight (bench)", flag: "knee", mod: "Bend the top knee to shorten the lever, or cut hold time short if achy." },
          { id: "b5v4", name: "Cable Face Pull", detail: "3 × 15", eq: "Machine" },
        ],
        [
          { id: "b6v4", name: "Leg Curl Machine", detail: "3 × 12", eq: "Machine" },
          { id: "b7v4", name: "Seated Cable Row", detail: "3 × 12", eq: "Machine" },
          { id: "b8v4", name: "Standing Single-Arm Cable Press", detail: "3 × 10 ea. side", eq: "Machine", flag: "shoulder", mod: "Moderate weight, controlled path — stop if it pinches." },
          { id: "b9v4", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10v4", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
        ],
        [
          { id: "b11v4", name: "Leg Extension Machine", detail: "3 × 12, light", eq: "Machine", flag: "knee", mod: "Optional — light weight, partial range, skip entirely if it aggravates." },
          { id: "b12v4", name: "Cable Tricep Pushdown", detail: "3 × 15", eq: "Machine" },
          { id: "b13v4", name: "Cable Woodchopper", detail: "3 × 10 ea. side", eq: "Machine" },
          { id: "b14v4", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "b15v4", name: "Barbell Romanian Deadlift", detail: "3 × 8", eq: "Barbell" },
        ],
      ],
    ],
  },
  C: {
    id: "C",
    name: "Circuit 3",
    focus: "Full Body",
    subtitle: "shoulder + knee aware",
    variants: [
      [
        [
          { id: "c1", name: "Dumbbell Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "c2", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline (hands elevated) if it's achy today." },
          { id: "c3", name: "Band Row", detail: "3 × 15", eq: "Band" },
          { id: "c4", name: "Bodyweight Squat", detail: "3 × 12", eq: "Bodyweight", flag: "knee", mod: "Only go as deep as feels clean — partial reps are fine." },
          { id: "c5", name: "Dead Bug", detail: "3 × 10", eq: "Bodyweight" },
        ],
        [
          { id: "c6", name: "Shallow Reverse Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short step, shallow depth — no deep knee bend." },
          { id: "c7", name: "Band External Rotation", detail: "3 × 12 ea. side", eq: "Band" },
          { id: "c8", name: "Seated Shoulder Press", detail: "3 × 10, light", eq: "Dumbbell", flag: "shoulder", mod: "Optional — light weight, half range if pressing overhead is achy." },
          { id: "c9", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
          { id: "c10", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
        ],
        [
          { id: "c11", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "c12", name: "Low Box Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "c13", name: "Single-Arm Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "c14", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only." },
          { id: "c15", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "c1v2", name: "Dumbbell Sumo Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "c2v2", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Elevate hands more if achy today." },
          { id: "c3v2", name: "Band Row", detail: "3 × 15", eq: "Band" },
          { id: "c4v2", name: "Shallow Split Squat", detail: "3 × 8 ea. leg", eq: "Bodyweight", flag: "knee", mod: "Quarter-depth only, no deep front-knee bend." },
          { id: "c5v2", name: "Hollow Body Hold", detail: "3 × 20s", eq: "Bodyweight" },
        ],
        [
          { id: "c6v2", name: "Shallow Curtsy Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short, shallow step." },
          { id: "c7v2", name: "Band Internal/External Rotation", detail: "3 × 10 ea. side", eq: "Band" },
          { id: "c8v2", name: "Light Arnold Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Optional — skip if overhead is achy." },
          { id: "c9v2", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
          { id: "c10v2", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
        ],
        [
          { id: "c11v2", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "c12v2", name: "Lateral Low Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "c13v2", name: "Light Renegade Row", detail: "3 × 8 ea. side", eq: "Dumbbell", flag: "shoulder", mod: "Keep hips stable, moderate weight only." },
          { id: "c14v2", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only." },
          { id: "c15v2", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "c1v3", name: "Dumbbell Sumo Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Shallow depth — stop above any pinch." },
          { id: "c2v3", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline if it's achy today." },
          { id: "c3v3", name: "Band Row", detail: "3 × 15", eq: "Band" },
          { id: "c4v3", name: "Dead Bug", detail: "3 × 10", eq: "Bodyweight" },
          { id: "c5v3", name: "Seated Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
        [
          { id: "c6v3", name: "Split Squat Hold", detail: "3 × 20s ea. leg", eq: "Bodyweight", flag: "knee", mod: "Quarter-depth only, no deep front-knee bend." },
          { id: "c7v3", name: "Band External Rotation", detail: "3 × 12 ea. side", eq: "Band" },
          { id: "c8v3", name: "Overhead Band Press", detail: "3 × 10", eq: "Band", flag: "shoulder", mod: "Optional — skip if achy overhead." },
          { id: "c9v3", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
          { id: "c10v3", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
        ],
        [
          { id: "c11v3", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "c12v3", name: "Lateral Low Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "c13v3", name: "Light Arnold Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Optional — skip if overhead is achy." },
          { id: "c14v3", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only." },
          { id: "c15v3", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "c1v4", name: "Barbell Back Squat", detail: "3 × 8", eq: "Barbell", flag: "knee", mod: "Moderate depth, controlled tempo — don't force past any pinch." },
          { id: "c2v4", name: "Barbell Bench Press", detail: "3 × 8", eq: "Barbell", flag: "shoulder", mod: "Moderate grip width, elbows ~45° from torso." },
          { id: "c3v4", name: "Seated Cable Row", detail: "3 × 12", eq: "Machine" },
          { id: "c4v4", name: "Copenhagen Plank", detail: "3 × 15s ea. side", eq: "Bodyweight (bench)", flag: "knee", mod: "Bend the top knee to shorten the lever, or cut hold time short if achy." },
          { id: "c5v4", name: "Dead Bug", detail: "3 × 10", eq: "Bodyweight" },
        ],
        [
          { id: "c6v4", name: "Leg Curl Machine", detail: "3 × 12", eq: "Machine" },
          { id: "c7v4", name: "Lat Pulldown", detail: "3 × 12", eq: "Machine" },
          { id: "c8v4", name: "Cable Face Pull", detail: "3 × 15", eq: "Machine" },
          { id: "c9v4", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "c10v4", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "c11v4", name: "Leg Press", detail: "3 × 10", eq: "Machine", flag: "knee", mod: "Don't lock out knees at the top; stop short of any pinch at the bottom." },
          { id: "c12v4", name: "Standing Single-Arm Cable Press", detail: "3 × 10 ea. side", eq: "Machine", flag: "shoulder", mod: "Moderate weight, controlled path — stop if it pinches." },
          { id: "c13v4", name: "Cable Tricep Pushdown", detail: "3 × 15", eq: "Machine" },
          { id: "c14v4", name: "Cable Woodchopper", detail: "3 × 10 ea. side", eq: "Machine" },
          { id: "c15v4", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
      ],
    ],
  },
};

// Rotation is tied to the real calendar week (Monday-start), so every circuit
// shows the same set all week and moves to the next set the following Monday.
function variantIndexFor(day) {
  const REF_MONDAY = new Date(2024, 0, 1); // known Monday, used as an anchor
  const now = new Date();
  const diffDays = Math.floor((now - REF_MONDAY) / 86400000);
  const weekNum = Math.floor(diffDays / 7);
  const n = day.variants.length;
  return ((weekNum % n) + n) % n;
}

function currentRounds(day) {
  return day.variants[variantIndexFor(day)];
}

const flagLabel = { shoulder: "SHOULDER", knee: "KNEE" };

// --- Coaching logic ---
// Reads an exercise's logged weight history (one entry per time it was actually
// finished with a weight recorded) and returns a directive, non-motivational
// note about what to do next time. No note until there's at least one prior
// data point — a single number by itself isn't a trend.
function incrementFor(eq, currentWeight) {
  if (eq.includes("Barbell")) return currentWeight >= 135 ? 10 : 5;
  if (eq.includes("Machine")) return currentWeight >= 90 ? 10 : 5;
  return currentWeight >= 40 ? 5 : 2.5; // Dumbbell
}

function coachSuggestion(ex, log) {
  const entries = log[ex.id] || [];
  if (entries.length === 0) return null;
  const last = entries[entries.length - 1].weight;
  if (entries.length === 1) {
    return { tone: "info", text: `Last logged: ${last} lbs. Log it again next time this comes up to start tracking a trend.` };
  }
  const prev = entries[entries.length - 2].weight;
  const streak = entries.length >= 3 && entries[entries.length - 3].weight === last && prev === last ? 3 : prev === last ? 2 : 1;
  if (last === prev) {
    const bump = incrementFor(ex.eq, last);
    return {
      tone: "up",
      text: `Held ${last} lbs for ${streak} session${streak > 1 ? "s" : ""} straight — go to ${last + bump} lbs next time.`,
    };
  }
  if (last > prev) {
    return { tone: "hold", text: `You moved up last time (${prev} → ${last} lbs). Hold at ${last} lbs until it's clean, then push again.` };
  }
  return { tone: "hold", text: `You backed off last time (${prev} → ${last} lbs). Stay at ${last} lbs and rebuild before adding more.` };
}

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dateShort(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Monday-start week key, e.g. "2026-07-06"
function weekStartISO(iso) {
  const d = new Date(iso + "T00:00:00");
  const day = d.getDay(); // 0 = Sun
  const diffToMonday = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diffToMonday);
  // Use local date parts, not toISOString() (which converts to UTC and
  // rolls back to the previous day for anyone east of Greenwich).
  return toLocalISO(d);
}

function weekRangeLabel(startISO) {
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const startLabel = start.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const endLabel = end.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const thisWeekStart = weekStartISO(todayISO());
  if (startISO === thisWeekStart) return `This Week (${startLabel} – ${endLabel})`;
  return `${startLabel} – ${endLabel}`;
}

function groupByWeek(history) {
  const groups = {};
  history.forEach((h) => {
    const key = weekStartISO(h.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(h);
  });
  return Object.entries(groups).sort((a, b) => (a[0] < b[0] ? 1 : -1));
}

function lastWeekStartISO() {
  const thisWeekStart = new Date(weekStartISO(todayISO()) + "T00:00:00");
  thisWeekStart.setDate(thisWeekStart.getDate() - 7);
  return toLocalISO(thisWeekStart);
}

function toLocalISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function computeStreak(history) {
  if (!history.length) return 0;
  const dates = new Set(history.map((h) => h.date));
  let streak = 0;
  let cursor = new Date();
  // allow today to be "pending" — start check from today, but don't break streak if today missing
  for (let i = 0; i < 60; i++) {
    const iso = toLocalISO(cursor);
    if (dates.has(iso)) {
      streak++;
    } else if (iso !== todayISO()) {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function CircuitApp() {
  const [screen, setScreen] = useState("home"); // home | workout | history
  const [activeDayId, setActiveDayId] = useState(null);
  const [checked, setChecked] = useState({});
  const [history, setHistory] = useState(null); // null = loading
  const [weights, setWeights] = useState({}); // { exerciseId: "25" }
  const [exerciseLog, setExerciseLog] = useState({}); // { exerciseId: [{date, weight}] }
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      const res = await storage.get("history", false);
      const parsed = res ? JSON.parse(res.value) : [];
      setHistory(parsed);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  const loadWeights = useCallback(async () => {
    try {
      const res = await storage.get("weights", false);
      const parsed = res ? JSON.parse(res.value) : {};
      setWeights(parsed);
    } catch (e) {
      setWeights({});
    }
  }, []);

  const loadExerciseLog = useCallback(async () => {
    try {
      const res = await storage.get("exerciseLog", false);
      const parsed = res ? JSON.parse(res.value) : {};
      setExerciseLog(parsed);
    } catch (e) {
      setExerciseLog({});
    }
  }, []);

  useEffect(() => {
    loadHistory();
    loadWeights();
    loadExerciseLog();
  }, [loadHistory, loadWeights, loadExerciseLog]);

  const persistWeight = async (exId, value) => {
    const next = { ...weights, [exId]: value };
    setWeights(next);
    try {
      await storage.set("weights", JSON.stringify(next));
    } catch (e) {
      // silent — weight still held in local state for this session
    }
  };

  const openDay = (dayId) => {
    setActiveDayId(dayId);
    setChecked({});
    setScreen("workout");
  };

  const toggleExercise = (id) => {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  };

  const finishWorkout = async () => {
    if (!activeDayId || !history) return;
    setSaving(true);
    setError(null);
    const day = DAYS[activeDayId];
    const rounds = currentRounds(day);
    const total = rounds.flat().length;
    const done = Object.values(checked).filter(Boolean).length;
    const entry = {
      date: todayISO(),
      dayId: activeDayId,
      dayName: day.name,
      focus: day.focus,
      completed: done,
      total,
      ts: Date.now(),
    };
    const next = [entry, ...history].slice(0, 200);

    // Record today's weight for every weighted exercise in this workout that
    // has a value entered, so the coach has data to work with next time.
    const today = todayISO();
    const nextLog = { ...exerciseLog };
    rounds.flat().forEach((ex) => {
      const isWeighted = ex.eq && (ex.eq.includes("Dumbbell") || ex.eq.includes("Machine") || ex.eq.includes("Barbell"));
      const raw = weights[ex.id];
      if (!isWeighted || raw === undefined || raw === "" || isNaN(Number(raw))) return;
      const w = Number(raw);
      const prior = nextLog[ex.id] || [];
      // Replace today's entry if it already exists (e.g. re-finishing after a retry).
      const withoutToday = prior.filter((e) => e.date !== today);
      nextLog[ex.id] = [...withoutToday, { date: today, weight: w }].slice(-20);
    });

    // Try the save; on failure, retry once after a short pause before giving up.
    const attemptSave = async () => {
      const result = await storage.set("history", JSON.stringify(next));
      if (!result) throw new Error("Storage returned no result");
      await storage.set("exerciseLog", JSON.stringify(nextLog));
      return result;
    };

    try {
      await attemptSave();
      setHistory(next);
      setExerciseLog(nextLog);
      setSaving(false);
      setScreen("home");
    } catch (e1) {
      await new Promise((r) => setTimeout(r, 600));
      try {
        await attemptSave();
        setHistory(next);
        setExerciseLog(nextLog);
        setSaving(false);
        setScreen("home");
      } catch (e2) {
        setError(
          `Couldn't save (${e2 && e2.message ? e2.message : "unknown error"}). Your checked-off ` +
            `exercises are still here — tap Finish Workout again to retry.`
        );
        setSaving(false);
        // stay on the workout screen so nothing is lost
      }
    }
  };

  const clearHistory = async () => {
    try {
      await storage.set("history", JSON.stringify([]));
      setHistory([]);
    } catch (e) {}
  };

  const streak = history ? computeStreak(history) : 0;
  const weekCount = history
    ? history.filter((h) => {
        const d = new Date(h.date + "T00:00:00");
        const now = new Date();
        const diff = (now - d) / 86400000;
        return diff < 7;
      }).length
    : 0;

  return (
    <div
      style={{
        background: "#14181A",
        color: "#F3F1E7",
        minHeight: "100vh",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <style>{FONT_IMPORT}</style>

      {/* Scoreboard header */}
      <div
        style={{
          borderBottom: "1px solid #33393B",
          background: "#1E2426",
          padding: "20px 20px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div
            onClick={() => setScreen("home")}
            style={{
              fontFamily: "'Teko', sans-serif",
              fontWeight: 700,
              fontSize: "32px",
              letterSpacing: "0.02em",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            CIRCUIT<span style={{ color: "#CCE000" }}>.</span>
          </div>
          <button
            onClick={() => setScreen("history")}
            style={{
              background: "none",
              border: "1px solid #33393B",
              color: "#8B9491",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "6px 10px",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            BOX SCORE
          </button>
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
          <ScoreStat label="STREAK" value={streak} unit="DAY" />
          <ScoreStat label="THIS WEEK" value={weekCount} unit="SESH" />
        </div>
      </div>

      <div style={{ padding: "20px", maxWidth: "560px", margin: "0 auto" }}>
        {screen === "home" && <HomeScreen history={history} onOpenDay={openDay} />}
        {screen === "workout" && activeDayId && (
          <WorkoutScreen
            day={DAYS[activeDayId]}
            checked={checked}
            onToggle={toggleExercise}
            onFinish={finishWorkout}
            onBack={() => setScreen("home")}
            saving={saving}
            weights={weights}
            onWeightChange={persistWeight}
            exerciseLog={exerciseLog}
          />
        )}
        {screen === "history" && (
          <HistoryScreen history={history} onBack={() => setScreen("home")} onClear={clearHistory} />
        )}
        {error && (
          <div style={{ color: "#C1592F", fontSize: "13px", marginTop: "12px" }}>{error}</div>
        )}
      </div>
    </div>
  );
}

function ScoreStat({ label, value, unit }) {
  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#8B9491", letterSpacing: "0.1em" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
        <span style={{ fontFamily: "'Teko', sans-serif", fontSize: "30px", fontWeight: 600, color: "#CCE000", lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#8B9491" }}>{unit}</span>
      </div>
    </div>
  );
}

function HomeScreen({ history, onOpenDay }) {
  const lastDoneFor = (dayId) => {
    if (!history) return null;
    const found = history.find((h) => h.dayId === dayId);
    return found ? found.date : null;
  };

  const lastWeekStart = lastWeekStartISO();
  const lastWeekEntries = history ? history.filter((h) => weekStartISO(h.date) === lastWeekStart) : [];

  return (
    <div>
      <p style={{ color: "#8B9491", fontSize: "14px", marginBottom: "20px", lineHeight: 1.5 }}>
        Three full-body circuits — legs, push, pull, and core all get hit in every session. Pick
        whichever fits today, aim for 2–3 a week. Each one cycles through 4 different sets —
        dumbbells/bands, then a full-gym set with barbells and machines — swapping to the next
        set every Monday. Log a weight and the app starts coaching you on what to lift next time.
        Tagged moves have a shoulder or knee note built in.
      </p>

      <div
        style={{
          background: "#1E2426",
          border: "1px solid #33393B",
          borderRadius: "6px",
          padding: "14px 18px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: "#CCE000",
            marginBottom: "8px",
          }}
        >
          LAST WEEK ({weekRangeLabel(lastWeekStart).toUpperCase()})
        </div>
        {history === null && <div style={{ color: "#8B9491", fontSize: "13px" }}>Loading…</div>}
        {history !== null && lastWeekEntries.length === 0 && (
          <div style={{ color: "#8B9491", fontSize: "13px" }}>Nothing logged last week.</div>
        )}
        {lastWeekEntries.map((h, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 0",
              borderTop: i > 0 ? "1px solid #262E30" : "none",
            }}
          >
            <div>
              <span style={{ fontSize: "14px", fontWeight: 500 }}>{h.dayName}</span>
              <span style={{ color: "#8B9491", fontSize: "12px" }}> — {h.focus}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#8B9491" }}>
                {dateShort(h.date).toUpperCase()}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#CCE000" }}>
                {h.completed}/{h.total}
              </span>
            </div>
          </div>
        ))}
      </div>

      {Object.values(DAYS).map((day) => {
        const last = lastDoneFor(day.id);
        const rounds = currentRounds(day);
        const exCount = rounds.flat().length;
        const variantIdx = variantIndexFor(day);
        const variantLabel = String.fromCharCode(65 + variantIdx); // 0 -> A, 1 -> B, ...
        return (
          <div
            key={day.id}
            onClick={() => onOpenDay(day.id)}
            style={{
              background: "#1E2426",
              border: "1px solid #33393B",
              borderRadius: "6px",
              padding: "16px 18px",
              marginBottom: "12px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Teko', sans-serif", fontSize: "26px", fontWeight: 600, lineHeight: 1 }}>
                  {day.name} — {day.focus}
                </div>
                <div style={{ color: "#8B9491", fontSize: "12px", marginTop: "4px" }}>
                  {day.subtitle} · {rounds.length} rounds · {exCount} moves
                </div>
                {day.variants.length > 1 && (
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "#CCE000",
                      marginTop: "6px",
                    }}
                  >
                    SET {variantLabel} · THIS WEEK
                  </div>
                )}
              </div>
              <div style={{ color: "#CCE000", fontFamily: "'Teko', sans-serif", fontSize: "22px" }}>→</div>
            </div>
            {last && (
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#8B9491", marginTop: "10px", letterSpacing: "0.05em" }}>
                LAST DONE {dateShort(last).toUpperCase()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function WorkoutScreen({ day, checked, onToggle, onFinish, onBack, saving, weights, onWeightChange, exerciseLog }) {
  const rounds = currentRounds(day);
  const total = rounds.flat().length;
  const done = Object.values(checked).filter(Boolean).length;
  const variantIdx = variantIndexFor(day);
  const variantLabel = String.fromCharCode(65 + variantIdx);

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#8B9491",
          fontSize: "13px",
          cursor: "pointer",
          padding: 0,
          marginBottom: "14px",
        }}
      >
        ← Back
      </button>

      <div style={{ fontFamily: "'Teko', sans-serif", fontSize: "34px", fontWeight: 700, lineHeight: 1 }}>
        {day.name} — {day.focus}
      </div>
      <div style={{ color: "#8B9491", fontSize: "12px", marginTop: "4px", marginBottom: "18px" }}>
        {done} / {total} moves logged
        {day.variants.length > 1 && <span style={{ color: "#CCE000" }}> · Set {variantLabel} this week</span>}
      </div>

      {rounds.map((round, ri) => (
        <div key={ri} style={{ marginBottom: "22px" }}>
          <div
            style={{
              display: "inline-block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "#14181A",
              background: "#CCE000",
              padding: "3px 9px",
              borderRadius: "3px",
              marginBottom: "10px",
            }}
          >
            ROUND {ri + 1} OF {rounds.length}
          </div>
          {round.map((ex) => (
            <ExerciseRow
              key={ex.id}
              ex={ex}
              isChecked={!!checked[ex.id]}
              onToggle={() => onToggle(ex.id)}
              weight={weights[ex.id] || ""}
              onWeightChange={(val) => onWeightChange(ex.id, val)}
              coach={coachSuggestion(ex, exerciseLog)}
            />
          ))}
        </div>
      ))}

      <button
        onClick={onFinish}
        disabled={saving}
        style={{
          width: "100%",
          background: "#CCE000",
          color: "#14181A",
          border: "none",
          borderRadius: "6px",
          padding: "14px",
          fontFamily: "'Teko', sans-serif",
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "0.03em",
          cursor: "pointer",
          marginTop: "8px",
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving ? "SAVING…" : "FINISH WORKOUT"}
      </button>
    </div>
  );
}

function ExerciseRow({ ex, isChecked, onToggle, weight, onWeightChange, coach }) {
  const isWeighted = ex.eq && (ex.eq.includes("Dumbbell") || ex.eq.includes("Machine") || ex.eq.includes("Barbell"));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "10px 4px",
        borderBottom: "1px solid #262E30",
        opacity: isChecked ? 0.5 : 1,
      }}
    >
      <div
        onClick={onToggle}
        style={{
          minWidth: "20px",
          height: "20px",
          borderRadius: "4px",
          border: `2px solid ${isChecked ? "#CCE000" : "#33393B"}`,
          background: isChecked ? "#CCE000" : "transparent",
          marginTop: "2px",
          cursor: "pointer",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          onClick={onToggle}
          style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", cursor: "pointer" }}
        >
          <span style={{ fontSize: "15px", fontWeight: 500, textDecoration: isChecked ? "line-through" : "none" }}>
            {ex.name}
          </span>
          {ex.flag && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.08em",
                color: "#C1592F",
                border: "1px solid #C1592F",
                borderRadius: "3px",
                padding: "1px 5px",
              }}
            >
              {flagLabel[ex.flag]}
            </span>
          )}
        </div>
        <div
          onClick={onToggle}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#8B9491", marginTop: "3px", cursor: "pointer" }}
        >
          {ex.detail} · {ex.eq}
        </div>
        {ex.mod && (
          <div onClick={onToggle} style={{ fontSize: "12px", color: "#C1592F", marginTop: "4px", lineHeight: 1.4, cursor: "pointer" }}>
            {ex.mod}
          </div>
        )}
        {isWeighted && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
            <label
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "#8B9491",
                letterSpacing: "0.06em",
              }}
            >
              WEIGHT
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onWeightChange(e.target.value)}
              placeholder="—"
              style={{
                width: "56px",
                background: "#14181A",
                border: "1px solid #33393B",
                borderRadius: "4px",
                color: "#F3F1E7",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                padding: "4px 6px",
              }}
            />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#8B9491" }}>
              lbs
            </span>
          </div>
        )}
        {isWeighted && coach && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              marginTop: "6px",
              fontSize: "12px",
              lineHeight: 1.4,
              color: coach.tone === "up" ? "#CCE000" : "#8B9491",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.06em", marginTop: "2px" }}>
              COACH
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              {coach.text}
              {coach.tone === "up" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const match = coach.text.match(/go to (\d+(\.\d+)?) lbs/);
                    if (match) onWeightChange(match[1]);
                  }}
                  style={{
                    marginLeft: "6px",
                    background: "none",
                    border: "1px solid #CCE000",
                    color: "#CCE000",
                    borderRadius: "3px",
                    fontSize: "10px",
                    padding: "1px 6px",
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                  }}
                >
                  USE IT
                </button>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function HistoryScreen({ history, onBack, onClear }) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: "#8B9491", fontSize: "13px", cursor: "pointer", padding: 0, marginBottom: "14px" }}
      >
        ← Back
      </button>
      <div style={{ fontFamily: "'Teko', sans-serif", fontSize: "30px", fontWeight: 700, marginBottom: "16px" }}>
        Box Score
      </div>

      {history === null && <div style={{ color: "#8B9491", fontSize: "13px" }}>Loading…</div>}
      {history && history.length === 0 && (
        <div style={{ color: "#8B9491", fontSize: "13px" }}>No sessions logged yet — finish a workout to start your streak.</div>
      )}
      {history && history.length > 0 && (
        <>
          {groupByWeek(history).map(([weekStart, entries]) => (
            <div key={weekStart} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    color: "#CCE000",
                  }}
                >
                  {weekRangeLabel(weekStart).toUpperCase()}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#8B9491" }}>
                  {entries.length} SESH
                </div>
              </div>
              {entries.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #262E30",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{h.dayName} — {h.focus}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#8B9491" }}>
                      {dateShort(h.date).toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#CCE000" }}>
                    {h.completed}/{h.total}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={onClear}
            style={{
              background: "none",
              border: "1px solid #33393B",
              color: "#8B9491",
              fontSize: "12px",
              padding: "8px 12px",
              borderRadius: "4px",
              marginTop: "8px",
              cursor: "pointer",
            }}
          >
            Clear history
          </button>
        </>
      )}
    </div>
  );
}
