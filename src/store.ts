import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export interface Submission {
  id: string;
  patientId: string;
  fillerName: string;
  relationship?: string;
  month: string;
  date: string;
  answers: Record<string, string>;
  originalAnswers?: Record<string, string>;
  adminAnswers?: Record<string, any>;
  editedBy?: Record<string, string>;
}

export const SCORING_CONFIG: Record<string, { key: string; label: string; cutoff: number; black: number; gray: number }[]> = {
  "9": [
    { key: 'c', label: 'Communication', cutoff: 13.97, black: 10, gray: 25 },
    { key: 'gm', label: 'Gross Motor', cutoff: 17.82, black: 15, gray: 30 },
    { key: 'fm', label: 'Fine Motor', cutoff: 31.32, black: 30, gray: 40 },
    { key: 'ps', label: 'Problem Solving', cutoff: 28.72, black: 25, gray: 40 },
    { key: 'pe', label: 'Personal Social', cutoff: 18.91, black: 15, gray: 30 },
  ],
  "12": [
    { key: 'c', label: 'Communication', cutoff: 15.64, black: 15, gray: 30 },
    { key: 'gm', label: 'Gross Motor', cutoff: 21.49, black: 20, gray: 30 },
    { key: 'fm', label: 'Fine Motor', cutoff: 34.50, black: 30, gray: 40 },
    { key: 'ps', label: 'Problem Solving', cutoff: 27.32, black: 25, gray: 35 },
    { key: 'pe', label: 'Personal Social', cutoff: 21.73, black: 20, gray: 30 },
  ],
  "18": [
    { key: 'c', label: 'Communication', cutoff: 13.06, black: 10, gray: 25 },
    { key: 'gm', label: 'Gross Motor', cutoff: 37.38, black: 35, gray: 40 },
    { key: 'fm', label: 'Fine Motor', cutoff: 34.32, black: 30, gray: 40 },
    { key: 'ps', label: 'Problem Solving', cutoff: 25.74, black: 25, gray: 35 },
    { key: 'pe', label: 'Personal Social', cutoff: 27.19, black: 25, gray: 35 },
  ],
  "24": [
    { key: 'c', label: 'Communication', cutoff: 25.17, black: 25, gray: 40 },
    { key: 'gm', label: 'Gross Motor', cutoff: 38.07, black: 35, gray: 45 },
    { key: 'fm', label: 'Fine Motor', cutoff: 35.16, black: 35, gray: 40 },
    { key: 'ps', label: 'Problem Solving', cutoff: 29.78, black: 25, gray: 35 },
    { key: 'pe', label: 'Personal-Social', cutoff: 31.54, black: 30, gray: 40 },
  ],
  "30": [
    { key: 'c', label: 'Communication', cutoff: 33.3, black: 30, gray: 40 },
    { key: 'gm', label: 'Gross Motor', cutoff: 36.14, black: 35, gray: 40 },
    { key: 'fm', label: 'Fine Motor', cutoff: 19.25, black: 15, gray: 30 },
    { key: 'ps', label: 'Problem Solving', cutoff: 27.08, black: 25, gray: 35 },
    { key: 'pe', label: 'Personal-Social', cutoff: 32.01, black: 30, gray: 40 },
  ],
  "36": [
    { key: 'c', label: 'Communication', cutoff: 30.99, black: 30, gray: 35 },
    { key: 'gm', label: 'Gross Motor', cutoff: 36.99, black: 35, gray: 40 },
    { key: 'fm', label: 'Fine Motor', cutoff: 18.07, black: 15, gray: 20 },
    { key: 'ps', label: 'Problem Solving', cutoff: 30.29, black: 30, gray: 35 },
    { key: 'pe', label: 'Personal-Social', cutoff: 35.33, black: 35, gray: 40 },
  ],
  "48": [
    { key: 'c', label: 'Communication', cutoff: 30.72, black: 30, gray: 35 },
    { key: 'gm', label: 'Gross Motor', cutoff: 32.78, black: 30, gray: 35 },
    { key: 'fm', label: 'Fine Motor', cutoff: 15.81, black: 15, gray: 20 },
    { key: 'ps', label: 'Problem Solving', cutoff: 31.3, black: 30, gray: 35 },
    { key: 'pe', label: 'Personal-Social', cutoff: 26.6, black: 25, gray: 30 },
  ],
  "60": [
    { key: 'c', label: 'Communication', cutoff: 33.19, black: 30, gray: 35 },
    { key: 'gm', label: 'Gross Motor', cutoff: 31.28, black: 30, gray: 35 },
    { key: 'fm', label: 'Fine Motor', cutoff: 26.54, black: 25, gray: 30 },
    { key: 'ps', label: 'Problem Solving', cutoff: 29.99, black: 25, gray: 30 },
    { key: 'pe', label: 'Personal-Social', cutoff: 39.07, black: 35, gray: 40 },
  ],
};

export function getSubmissionScoresAndStatus(sub: { month: string; answers: Record<string, string> }) {
  const month = sub.month;
  const config = SCORING_CONFIG[month];
  if (!config) {
    return { scores: [], status: 'N/A' };
  }

  const scoresList = config.map(row => {
    let sum = 0;
    let answered = 0;
    for (let i = 1; i <= 6; i++) {
      const val = sub.answers[`${month}_${row.key}_${i}`];
      if (val === 'YES') { sum += 10; answered++; }
      else if (val === 'SOMETIMES') { sum += 5; answered++; }
      else if (val === 'NOT YET') { sum += 0; answered++; }
    }
    const score = answered === 0 ? 0 : Math.round((sum / answered) * 6);
    
    let status: 'normal' | 'borderline' | 'abnormal' = 'normal';
    if (score <= row.black) {
      status = 'abnormal';
    } else if (score > row.black && score <= row.gray) {
      status = 'borderline';
    }

    return {
      key: row.key,
      label: row.label,
      score,
      cutoff: row.cutoff,
      black: row.black,
      gray: row.gray,
      status
    };
  });

  let overallStatus: 'normal' | 'borderline' | 'abnormal' = 'normal';
  if (scoresList.some(s => s.status === 'abnormal')) {
    overallStatus = 'abnormal';
  } else if (scoresList.some(s => s.status === 'borderline')) {
    overallStatus = 'borderline';
  }

  return {
    scores: scoresList,
    status: overallStatus
  };
}

export async function saveSubmission(submission: Omit<Submission, 'id' | 'date'>) {
  const newSubmission = {
    ...submission,
    date: new Date().toISOString()
  };
  const docRef = await addDoc(collection(db, 'submissions'), newSubmission);
  return { id: docRef.id, ...newSubmission };
}

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'submissions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subs: Submission[] = [];
      snapshot.forEach((doc) => {
        subs.push({ id: doc.id, ...doc.data() } as Submission);
      });
      setSubmissions(subs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching submissions: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { submissions, loading };
}

export async function updateSubmission(id: string, updates: Partial<Submission>) {
  const docRef = doc(db, 'submissions', id);
  await updateDoc(docRef, updates);
}
