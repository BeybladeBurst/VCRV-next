'use server';
import { sql } from '@vercel/postgres';

const Query = ({string, params}: {string: string, params: string[]}) => sql.query(string, params)
  .then(re => re.rows)
  .catch(er => console.error(er));

const fetchSong = (key?: string) => {
  const Key = key && !/^[\d,]+$/.test(key) ? decodeURIComponent(key) : key?.split(',');
  const query = {
    string: `
      SELECT thumb,uid,date,title,name,
        CASE when nm=1 then concat('nm',original.id) else concat('sm',original.id) END as vid
      FROM original LEFT JOIN uploader on uploader.id=original.uid ` + (
      Array.isArray(Key) ? 
        `where original.id in (${Key.map((_, i) => `$${i+1}`).join(',')})` : 
        (Key ? `where lower(title) like lower(concat('%',$1::text,'%'))` : '') + `order by random() limit 50`
      ), 
    params: Array.isArray(Key) ? Key : Key ? [Key] : []
  };
  return Query(query);
}
const fetchUser = (uid?: string) => {
  const query = {
    string: `
      SELECT thumb,uid,date,title,name,
        CASE when nm=1 then concat('nm',original.id) else concat('sm',original.id) END as vid
      FROM original LEFT JOIN uploader on uploader.id=original.uid where uid=$1 order by date desc`,
    params: uid ? [uid] : []
  };
  return Query(query);
}
export {fetchSong, fetchUser}