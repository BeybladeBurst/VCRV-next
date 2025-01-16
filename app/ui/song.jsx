'use client';
import Link from 'next/link';
import { UseState } from '@/app/lib/utils';
import styles from '@/app/ui/song.module.css';

const Song = ({song}) => {
    if (!song.title) song = {vid: `sm${song.vid}`};

    const id = song.vid.substring(2);
    const Thumb = {
        u: `https://secure-dcdn.cdn.nimg.jp/nicoaccount/usericon/${Math.floor(song.uid/10000)}/${song.uid}.jpg`,
        v: `https://nicovideo.cdn.nimg.jp/thumbnails/${id}/${id}.${song.thumb ? song.thumb + '.' : ''}L`
    };
    Thumb.u = new UseState(Thumb.u);
    Thumb.v = new UseState(Thumb.v);
    Thumb.v.replace = ev => {
        error.value[ev.target.alt] ??= 0;
        if (++error.value[ev.target.alt] < 2)
            return Thumb.v.set(Thumb.v.value.replace('.L', ''));
        if (ev.target.matches('#public img'))
            dispatchEvent(new CustomEvent('song-deleted', {detail: ev.target.alt}));
    }
    const error = new UseState({});

    const links = [
        `https://www.youtube.com/results?search_query=${song.title ?? song.vid}`,
        `https://www.google.com/search?q=%22${song.vid}%22`,
        `https://www.google.com/search?q=${song.title ?? ''} ${song.name ?? ''}`
    ];
    links.logo = [
        'https://developers.google.com/static/site-assets/logo-youtube.svg',
        'https://www.gstatic.com/devrel-devsite/prod/vdf1c73ddfa29bc07c1524d67528b078b0717f3e7ffc0621bf09846cb55759e81/developers/images/touchicon-180-new.png',
        'https://www.gstatic.com/devrel-devsite/prod/vdf1c73ddfa29bc07c1524d67528b078b0717f3e7ffc0621bf09846cb55759e81/developers/images/touchicon-180-new.png'
    ];
    return (
        <li className={styles.song}>
            <Link href={`https://www.nicovideo.jp/watch/${song.vid}`} target='_blank'>
                <img src={Thumb.v.value} alt={song.vid || 'video'} onError={Thumb.v.replace}
                    className='video'
                />
            </Link>
            <h2>{song.title}</h2>
            <Link href={`/list/${song.uid}`} target='_blank'>
                {song.name} ▪ {new Date(song.date).getFullYear() || ''}
            </Link>
            <Link href={`https://www.nicovideo.jp/user/${song.uid}/video?sortKey=registeredAt&sortOrder=desc`} target='_blank'>
                <img src={Thumb.u.value} alt={song.uid || 'user'} onError={() => Thumb.u.set(`https://secure-dcdn.cdn.nimg.jp/nicoaccount/usericon/defaults/blank.jpg`)}
                    className='user'
                />
            </Link>
            <nav>{links.map((href, i) => 
                <Link href={href} target='_blank' key={i}>
                    <img src={links.logo[i]} alt='logo'/>
                </Link>)}
            </nav>
        </li>)
}
export default Song;