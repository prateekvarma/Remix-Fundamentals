import { Link, useLoaderData } from '@remix-run/react';

import { getStoredNotes } from '../data/notes';

import styles from '../styles/note-details.css';

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId; //just like the dynamic file name
  const selectedNote = notes.find((note) => note.id === noteId);
  return selectedNote;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
