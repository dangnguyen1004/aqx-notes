import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { Note } from "../types";

interface NotesState {
  notes: Note[];
  addNote: (content: string, categoryId: string) => void;
  updateNote: (id: string, content: string) => void;
  softDeleteNote: (id: string) => void;
  softDeleteNotesByCategory: (categoryId: string) => void;
  restoreNote: (id: string) => void;
  permanentlyDeleteNote: (id: string) => void;
  emptyTrash: () => void;
  deleteAllNotes: () => void;
  getActiveNotes: () => Note[];
  getDeletedNotes: () => Note[];
  getNotesByCategory: (categoryId: string) => Note[];
  getLatestNotesByCategory: (categoryId: string, limit: number) => Note[];
  getNotesCountByCategory: (categoryId: string) => number;
  getNoteById: (id: string) => Note | undefined;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (content: string, categoryId: string) => {
        const now = Date.now();
        const newNote: Note = {
          id: Crypto.randomUUID(),
          content,
          categoryId,
          createdAt: now,
          updatedAt: now,
          isDeleted: false,
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
      },

      updateNote: (id: string, content: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, content, updatedAt: Date.now() } : note,
          ),
        }));
      },

      softDeleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, isDeleted: true, deletedAt: Date.now() }
              : note,
          ),
        }));
      },

      softDeleteNotesByCategory: (categoryId: string) => {
        const now = Date.now();
        set((state) => ({
          notes: state.notes.map((note) =>
            note.categoryId === categoryId && !note.isDeleted
              ? { ...note, isDeleted: true, deletedAt: now }
              : note,
          ),
        }));
      },

      restoreNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, isDeleted: false, deletedAt: undefined }
              : note,
          ),
        }));
      },

      permanentlyDeleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },

      emptyTrash: () => {
        set((state) => ({
          notes: state.notes.filter((note) => !note.isDeleted),
        }));
      },

      deleteAllNotes: () => {
        const now = Date.now();
        set((state) => ({
          notes: state.notes.map((note) =>
            note.isDeleted
              ? note
              : { ...note, isDeleted: true, deletedAt: now },
          ),
        }));
      },

      getActiveNotes: () => {
        return get().notes.filter((note) => !note.isDeleted);
      },

      getDeletedNotes: () => {
        return get().notes.filter((note) => note.isDeleted);
      },

      getNotesByCategory: (categoryId: string) => {
        return get()
          .notes.filter(
            (note) => note.categoryId === categoryId && !note.isDeleted,
          )
          .sort((a, b) => b.updatedAt - a.updatedAt);
      },

      getLatestNotesByCategory: (categoryId: string, limit: number) => {
        return get().getNotesByCategory(categoryId).slice(0, limit);
      },

      getNotesCountByCategory: (categoryId: string) => {
        return get().getNotesByCategory(categoryId).length;
      },

      getNoteById: (id: string) => {
        return get().notes.find((note) => note.id === id);
      },
    }),
    {
      name: "aqx-notes-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
