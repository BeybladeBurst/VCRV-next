import { fetchSong } from '@/app/lib/SQL';
import { Holder } from '@/app/ui/list-form';
import { unstable_cache } from 'next/cache'

const main = () => unstable_cache(fetchSong, ['songs'], {revalidate: 1})()
    .then(songs => <main><Holder songs={songs} /></main>);
    
export default main;