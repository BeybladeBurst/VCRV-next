import { fetchSong } from '@/app/lib/SQL';
import { Holder } from '@/app/ui/list-form';
import { notFound } from 'next/navigation';

const main = (props) =>
  props.params
    .then(({id}) => id.length == 1 || id.every(vid => /^\d+$/.test(vid)) ? fetchSong(id.join()) : Promise.reject(404))
    .then(songs => <main><Holder songs={songs} /></main>)
    .catch(status => status == 404 && notFound());
    
export default main;