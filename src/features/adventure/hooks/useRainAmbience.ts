import React from 'react';

export function useRainAmbience() {
  const contextRef = React.useRef<AudioContext | null>(null);
  const gainRef = React.useRef<GainNode | null>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => () => {
    const context = contextRef.current;
    if (context && context.state !== 'closed') {
      void context.close().catch((closeError: unknown) => {
        console.error('Could not close the rain ambience audio context.', closeError);
      });
    }
  }, []);

  const toggle = async () => {
    const context = contextRef.current;
    const gain = gainRef.current;

    if (enabled && context && gain) {
      gain.gain.setTargetAtTime(0, context.currentTime, 0.08);
      setEnabled(false);
      return;
    }

    let newContext: AudioContext | null = null;
    try {
      let activeContext = context;
      if (!activeContext) {
        activeContext = new AudioContext();
        newContext = activeContext;

        const noiseBuffer = activeContext.createBuffer(
          1,
          activeContext.sampleRate * 2,
          activeContext.sampleRate,
        );
        const noise = noiseBuffer.getChannelData(0);
        for (let index = 0; index < noise.length; index += 1) {
          noise[index] = (Math.random() * 2 - 1) * 0.3;
        }

        const source = activeContext.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const highpass = activeContext.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.value = 170;

        const lowpass = activeContext.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 1800;

        const masterGain = activeContext.createGain();
        masterGain.gain.value = 0;
        source.connect(highpass);
        highpass.connect(lowpass);
        lowpass.connect(masterGain);
        masterGain.connect(activeContext.destination);
        source.start();

        contextRef.current = activeContext;
        gainRef.current = masterGain;
        newContext = null;
      }

      await activeContext.resume();
      const activeGain = gainRef.current;
      if (!activeGain) {
        throw new Error('Rain ambience audio is unavailable.');
      }
      activeGain.gain.setTargetAtTime(0.12, activeContext.currentTime, 0.2);
      setEnabled(true);
      setError('');
    } catch (audioError) {
      if (newContext) {
        void newContext.close().catch((closeError: unknown) => {
          console.error('Could not close the rain ambience audio context.', closeError);
        });
      }
      console.error('Could not start the rain ambience audio.', audioError);
      setEnabled(false);
      setError('Could not start sound. Check your browser audio settings.');
    }
  };

  return { enabled, error, toggle };
}
