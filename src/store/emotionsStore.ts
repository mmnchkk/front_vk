import { createEffect, createEvent, createStore } from "effector";
import { Emotion } from "../types/emotions";
import { addEmotion, fetchEmotions } from "../service/emotionService";

export const addNewEmotion = createEvent<{
  mood: string;
  reason: string;
  notes: string;
  feelings: string;
  date: Date;
}>();

export const loadEmotionFx = createEffect(async () => {
  const emotions = await fetchEmotions();
  return emotions;
});

export const addEmotionFx = createEffect(
  async (emotion: {
    mood: string;
    reason: string;
    notes: string;
    feelings: string;
    date: Date;
  }) => {
    const newEmotion = await addEmotion(
      emotion.mood,
      emotion.reason,
      emotion.notes,
      emotion.feelings,
      emotion.date
    );
    return newEmotion;
  }
);

export const $emotions = createStore<Emotion[]>([])
  .on(loadEmotionFx.doneData, (_, emotions) => emotions)
  .on(addEmotionFx.doneData, (state, newEmotion) => [...state, newEmotion]);

addNewEmotion.watch((emotion) => {
  addEmotionFx(emotion);
});

loadEmotionFx();
