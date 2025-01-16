'use client';
import Song from '@/app/ui/song';
import { UseState } from '@/app/lib/utils';
import { CalendarDateRangeIcon, UserIcon, MusicalNoteIcon, TrashIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import styles from '@/app/ui/list.module.css';

const sorter = {
    'Date-U': (s, t) => new Date(s.date) - new Date(t.date),
    'Date-D': (s, t) => new Date(t.date) - new Date(s.date),
    'Uploader': (s, t) => s.uid - t.uid
}
const list = ({songs, deleted, order}) => {
    const sorting = new UseState();
    const Hidden = {
        public: new UseState(false),
        deleted: new UseState(true)
    };
    const change = ({target}) => target.name == 'sort' ? 
        sorting.set(target.value) : 
        (Hidden.public.set(target.value == 'deleted'), Hidden.deleted.set(target.value == 'public'));

    return (<>
        <div className={styles.menu} onChange={change}>
            <label>
                <input type='radio' name='status' value='public' defaultChecked></input>
                <MusicalNoteIcon /> <data value={songs?.length ?? 0}></data>
            </label> 
            <label>
                <input type='radio' name='status' value='deleted'></input>
                <TrashIcon /> <data value={deleted?.length ?? 0}></data>
            </label> 
            <label>
                <input type='radio' name='sort' value='Date-U'></input>
                <CalendarDateRangeIcon />↑
            </label>
            <label>
                <input type='radio' name='sort' value='Date-D' defaultChecked={order == 'Date-D'}></input>
                <CalendarDateRangeIcon />↓
            </label>
            <label>
                <input type='radio' name='sort' value='Uploader'></input>
                <UserIcon />
            </label>
        </div>
        <ul id='public' hidden={Hidden.public.value}>
            {songs.sort(sorter[sorting.value] ?? undefined).map(song => <Song song={song} key={song.vid}/>)}
        </ul>
        <ul id='deleted' hidden={Hidden.deleted.value}>
            {deleted.map(song => <Song song={song} key={song.vid}></Song>)}
        </ul>
        <button onClick={() => scrollTo(0,0)}><ArrowUpCircleIcon className={styles.top}/></button>
    </>)
}
export default list;