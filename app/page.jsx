import Button from '@/app/ui/button-link';
import { MusicalNoteIcon, ListBulletIcon } from '@heroicons/react/24/solid';

const main = () =>
    <main className='menu'>
        <Button href='/watch'><MusicalNoteIcon/>Random</Button>
        <Button href='/list/my/fave'><ListBulletIcon/>My Lists</Button>
    </main>

export default main;