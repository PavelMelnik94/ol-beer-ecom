import JSConfetti from 'js-confetti';
import { useEffect } from 'react';

interface Config {
    confettiRadius?: number,
    confettiNumber?: number,
    confettiColors?: string[],
    emojis?: string[],
    emojiSize?: number,
}

const DEFAULT_CONFIG = {
    confettiColors: [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
    ],
} satisfies Config;

export function useConfetti({
    playWhen = false,
    config = DEFAULT_CONFIG,
    depends = [],
}: {
    playWhen: boolean;
    config?: Config;
    depends?: unknown[]
}) {
    useEffect(() => {
        const jsConfetti = new JSConfetti();
        if (playWhen) {
            jsConfetti.addConfetti(config).then(() => {
                jsConfetti.clearCanvas();
                jsConfetti.destroyCanvas();
            })
        }
        return () => {
            jsConfetti.clearCanvas();
            jsConfetti.destroyCanvas();
        }
    }, [playWhen, ...depends]);
}
