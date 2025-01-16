import { fetchUser } from '@/app/lib/SQL';
import { Holder } from '@/app/ui/list-form';
import { notFound } from 'next/navigation';

const main = (props) => props.params
  .then(({ uid }) => /^\d+$/.test(uid) ? fetchUser(uid) : Promise.reject(404))
  .then(songs => <main><Holder songs={songs} uid={true}/></main>)
  .catch(status => status == 404 && notFound());

export default main;