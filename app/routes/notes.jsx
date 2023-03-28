import { redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '../components/NewNote';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getStoredNotes, storeNotes } from '../data/notes';

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export async function action(data) {
  const { request } = data;
  const formData = await request.formData();

  // const noteData = {
  //   title: formData.get('title'),
  //   content: formData.get('content')
  // }

  const noteData = Object.fromEntries(formData);

  //validation
  if (noteData.title.trim().length < 5) {
    return { message: 'Title must be at least 5 chars long' };
  }

  const existingData = await getStoredNotes();

  noteData.id = new Date().toISOString();

  const updatedNotes = existingData.concat(noteData);

  await storeNotes(updatedNotes);

  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function ErrorBoundary({ error }) {
  return (
    <main className='error'>
      <h1>Error from notes details page</h1>
      <p>{error.message}</p>
      <p>
        back to <Link to='/'>home</Link>
      </p>
    </main>
  );
}
