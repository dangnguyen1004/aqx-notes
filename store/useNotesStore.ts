import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../types';

interface NotesState {
  notes: Note[];
  addNote: (content: string, categoryId: string) => void;
  updateNote: (id: string, content: string) => void;
  softDeleteNote: (id: string) => void;
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
          id: uuidv4(),
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
            note.id === id
              ? { ...note, content, updatedAt: Date.now() }
              : note
          ),
        }));
      },

      softDeleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, isDeleted: true, deletedAt: Date.now() }
              : note
          ),
        }));
      },

      restoreNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, isDeleted: false, deletedAt: undefined }
              : note
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
              : { ...note, isDeleted: true, deletedAt: now }
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
            (note) => note.categoryId === categoryId && !note.isDeleted
          )
          .sort((a, b) => b.createdAt - a.createdAt);
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
      name: 'aqx-notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
