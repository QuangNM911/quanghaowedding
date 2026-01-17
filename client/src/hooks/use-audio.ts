import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export function useAudio(url: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [url],
      html5: true,
      loop: true,
      volume: 0.5,
      autoplay: false
    });

    return () => {
      soundRef.current?.unload();
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
