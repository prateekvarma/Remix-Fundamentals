import { redirect } from '@remix-run/node';
import NewNote, { links as newNoteLinks } from '../components/NewNote';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getStoredNotes, storeNotes } from '../data/notes';

export default function NotesPage() {
  return (
    <main>
      <NewNote />
      <NoteList />
    </main>
  );
}

export async function action(data) {
  const { request } = data;
  const formData = await request.formData();

  // const noteData = {
  //   title: formData.get('title'),
  //   content: formData.get('content')
  // }

  const noteData = Object.fromEntries(formData);

  const existingData = await getStoredNotes();

  noteData.id = new Date().toISOString();

  const updatedNotes = existingData.concat(noteData);

  await storeNotes(updatedNotes);

  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
