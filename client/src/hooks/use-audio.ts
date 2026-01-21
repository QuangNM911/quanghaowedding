import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export function useAudio(url: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const sound = new Howl({
      src: [url],
      html5: true,
      volume: 0.5,
      autoplay: false,
      onend: () => {
        if (isPlayingRef.current) {
          sound.play();
        }
      },
    });
    soundRef.current = sound;

    return () => {
      soundRef.current = null;
      sound.unload();
    };
  }, [url]);

  const toggle = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const play = () => {
    if (!soundRef.current) return;
    if (!isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  return { isPlaying, toggle, play, pause };
}
