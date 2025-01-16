'use client';
import { fetchSong } from '@/app/lib/SQL';
import fave from '@/app/lib/fave';
import { UseState } from '@/app/lib/utils';
import { useEffect } from 'react';
import Button from '@/app/ui/button-link';
import List from '@/app/ui/list';
import styles from '@/app/ui/list.module.css';
import { HeartIcon } from '@heroicons/react/24/solid';

const transferrer = (Songs) => 
    addEventListener('song-deleted', ({detail: vid}) => {
        if (!Songs.public.value || !Songs.deleted.value) return;
        const results = Object.groupBy(Songs.public.value, s => s.vid == vid ? 'deleted' : 'songs');
        if (!results.deleted) return;
        Songs.public.set(results.songs);
        Songs.deleted.set([...Songs.deleted.value, ...results.deleted]);
    });

const Form = () => {
    const Songs = {
        public: new UseState([]),
        deleted: new UseState([])
    };
    const hidden = new UseState(false);
    const loading = new UseState(false);
    const list = ev => {
        ev.preventDefault();
        loading.set(true);
        fetchSong(new FormData(ev.currentTarget).get('vids')).then(songs => {
            Songs.public.set(songs);
            Songs.deleted.set(fave.filter(vid => !songs.find(s => /\d+$/.exec(s.vid)[0] == vid)).map(vid => ({vid})));
            hidden.set(true);
        });
    };
    useEffect(() => transferrer(Songs));
    return (
    <>
        <form onSubmit={list} hidden={hidden.value} className={styles.form}>
            <Button type='submit' loading={loading.value ? 'loading' : ''}><HeartIcon/>FAVE</Button>
            <input value={fave} type='hidden' name='vids' readOnly/>
        </form>
        <List hidden={!hidden.value} songs={Songs.public.value} deleted={Songs.deleted.value}/>
    </>)
}
const Holder = ({songs: original, uid}) => {
    const Songs = {
        public: new UseState(original),
        deleted: new UseState([])
    };
    useEffect(() => transferrer(Songs));
    return <List songs={Songs.public.value} deleted={Songs.deleted.value} order={uid ? 'Date-D' : null}/>
}
export {Form, Holder};