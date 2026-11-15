"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./basicDj.module.scss";
import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";
import FlexBox from "../components/flexBox/FlexBox";
import Link from "next/link";

type SongOpt = { label: string; src: string };

type Props = {
  videoSrc?: string;
  leftSrc?: string; // unused; songOptions drive selections
  rightSrc?: string; // unused
  startFader?: number; // 0..1 (0 = left only, 1 = right only)
  onShowNext?: (show: boolean) => void;
  songOptions?: SongOpt[]; // default 4
  showNext?: boolean;
};

export default function BasicDJ({
  videoSrc = "/videos/finalfinalAssets/DeckGameVid.mp4",
  songOptions = [
    { label: "Das Spiegle", src: "/music/House1Final.mp3" },
    { label: "Üntz Üntz", src: "/music/House4Final.mp3" },
    { label: "Graftvlaffer", src: "/music/House3.mp3" },
    { label: "Oden Joyest", src: "/music/House6.mp3" },
    { label: "Ang Merkel", src: "/music/House4.mp3" },
  ],
  startFader = 0.0,
  onShowNext,
  showNext = false,
}: Props) {
  // --------- constants ----------
  const STEP = 0.1; // crossfader quantization
  const SWAP_FADE_SEC = 0.22; // fade when swapping a song on a deck
  const XFADE_STEP_RAMP_SEC = 0.12; // ramp per crossfader step
  const quantize = (v: number) =>
    Math.max(0, Math.min(1, Math.round(v / STEP) * STEP));

  // --------- UI state ----------
  const [leftSel, setLeftSel] = useState(songOptions[0]?.src ?? "");
  const [rightSel, setRightSel] = useState(songOptions[1]?.src ?? "");
  const [started, setStarted] = useState(false);

  const initialXf = Math.max(0, Math.min(1, startFader ?? 0.0));
  const [xfUi, setXfUi] = useState<number>(initialXf);
  const [xfAudio, setXfAudio] = useState<number>(quantize(initialXf));

  useEffect(() => void onShowNext?.(xfAudio === 1), [xfAudio, onShowNext]);

  // --------- video (visuals only) ----------
  const videoRef = useRef<HTMLVideoElement>(null);
  const playVideo = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.loop = true;
      v.muted = true; // visuals only
      v.playsInline = true;
      if (v.paused) await v.play();
    } catch {
      // ignore
    }
  }, []);

  // --------- audio via MediaElement + WebAudio ----------
  const audioCtxRef = useRef<AudioContext | null>(null);
  const deckLGainRef = useRef<GainNode | null>(null);
  const deckRGainRef = useRef<GainNode | null>(null);
  const keepSrcRef = useRef<ConstantSourceNode | null>(null);
  const keepGainRef = useRef<GainNode | null>(null);
  const keepStartedRef = useRef(false);

  // We keep two HTMLAudio elements (one per deck). We *never* swap them out.
  const aLeftRef = useRef<HTMLAudioElement | null>(null);
  const aRightRef = useRef<HTMLAudioElement | null>(null);

  // And connect each to WebAudio once
  const leftNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rightNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Build or resume the AudioContext, deck gains, and a silent keepalive (for iOS)
  const ensureCtx = useCallback(async () => {
    if (!audioCtxRef.current) {
      const Ctor: typeof AudioContext =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctor({ latencyHint: "interactive" });
      audioCtxRef.current = ctx;

      const gL = ctx.createGain();
      const gR = ctx.createGain();
      // Equal-power from current xf
      gL.gain.value = Math.cos((xfAudio * Math.PI) / 2);
      gR.gain.value = Math.sin((xfAudio * Math.PI) / 2);
      gL.connect(ctx.destination);
      gR.connect(ctx.destination);
      deckLGainRef.current = gL;
      deckRGainRef.current = gR;

      // Silent keepalive
      const keep = ctx.createConstantSource();
      const kg = ctx.createGain();
      kg.gain.value = 0;
      keep.connect(kg).connect(ctx.destination);
      keepSrcRef.current = keep;
      keepGainRef.current = kg;

      // Auto-resume if Safari suspends
      const resume = async () => {
        if (ctx.state !== "running") {
          try {
            await ctx.resume();
          } catch {}
        }
      };
      document.addEventListener("visibilitychange", resume, { passive: true });
      window.addEventListener("focus", resume, { passive: true });
      ctx.onstatechange = () => {
        if (ctx.state !== "running") {
          ctx.resume().catch(() => {});
        }
      };
    }

    const ctx = audioCtxRef.current!;
    if (ctx.state !== "running") {
      try {
        await ctx.resume();
      } catch {}
    }
    return ctx;
  }, [xfAudio]);

  // Equal-power ramp for the crossfader
  const rampToXf = useCallback((to: number, dur = XFADE_STEP_RAMP_SEC) => {
    const ctx = audioCtxRef.current;
    const gL = deckLGainRef.current;
    const gR = deckRGainRef.current;
    if (!ctx || !gL || !gR) return;

    const left = Math.cos((to * Math.PI) / 2);
    const right = Math.sin((to * Math.PI) / 2);
    const now = ctx.currentTime;

    gL.gain.cancelScheduledValues(now);
    gR.gain.cancelScheduledValues(now);
    gL.gain.setValueAtTime(gL.gain.value, now);
    gR.gain.setValueAtTime(gR.gain.value, now);
    gL.gain.linearRampToValueAtTime(left, now + dur);
    gR.gain.linearRampToValueAtTime(right, now + dur);

    setXfAudio(to);
  }, []);

  // Initialize the audio graph on first tap and start playback
  const startAll = useCallback(async () => {
    const ctx = await ensureCtx();

    // iOS unlock: start the silent source inside the gesture *before* awaits
    try {
      if (!keepStartedRef.current && keepSrcRef.current) {
        try {
          keepSrcRef.current.start();
        } catch {}
        keepStartedRef.current = true;
      }
    } catch {}

    // Create audio elements if needed (once)
    if (!aLeftRef.current) {
      aLeftRef.current = new Audio();
      aLeftRef.current.crossOrigin = "anonymous";
      aLeftRef.current.loop = true;
      aLeftRef.current.preload = "auto";
      aLeftRef.current.src = leftSel;
    }
    if (!aRightRef.current) {
      aRightRef.current = new Audio();
      aRightRef.current.crossOrigin = "anonymous";
      aRightRef.current.loop = true;
      aRightRef.current.preload = "auto";
      aRightRef.current.src = rightSel;
    }

    // Connect each element to WebAudio *once*
    if (!leftNodeRef.current && aLeftRef.current) {
      leftNodeRef.current = ctx.createMediaElementSource(aLeftRef.current);
      leftNodeRef.current.connect(deckLGainRef.current!);
    }
    if (!rightNodeRef.current && aRightRef.current) {
      rightNodeRef.current = ctx.createMediaElementSource(aRightRef.current);
      rightNodeRef.current.connect(deckRGainRef.current!);
    }

    // Start video visuals (muted)
    await playVideo();

    // Play both decks (allowed because we are *inside the tap*)
    // iOS: calling play() on two elements within the same gesture is OK
    try {
      await aLeftRef.current!.play();
    } catch {}
    try {
      await aRightRef.current!.play();
    } catch {}

    // Ensure crossfader reflects state
    rampToXf(xfAudio, 0.01);
    setStarted(true);
  }, [ensureCtx, playVideo, rampToXf, leftSel, rightSel, xfAudio]);

  // Swap a deck’s track by changing the <audio>.src and fading between old/new
  const swapDeck = useCallback(
    async (side: "L" | "R", srcPath: string) => {
      const ctx = await ensureCtx();
      const now = ctx.currentTime;

      const el = side === "L" ? aLeftRef.current : aRightRef.current;
      const deckGain =
        side === "L" ? deckLGainRef.current : deckRGainRef.current;

      if (!el || !deckGain) return;

      // We do a local pre-fade on the HTMLAudio element using a temporary Gain
      // by inserting a per-deck pre-gain node in front of the deck gain.
      // Since MediaElementAudioSourceNode cannot be reconnected to multiple nodes,
      // we simulate a "local" swap by briefly dipping the deck's overall gain
      // then restoring (this won’t affect the other deck because each has its own gain).
      // For smoother result, we ramp the deck down a bit, change src, then ramp back.
      const current = deckGain.gain.value;
      const dip = Math.max(0, Math.min(1, current * 0.35)); // dip to ~35% of current

      deckGain.gain.cancelScheduledValues(now);
      deckGain.gain.setValueAtTime(current, now);
      deckGain.gain.linearRampToValueAtTime(dip, now + SWAP_FADE_SEC / 2);

      // Change the source; iOS requires pause->src->load()->play for reliability
      try {
        el.pause();
      } catch {}
      el.src = srcPath;
      try {
        el.load();
      } catch {}
      try {
        await el.play(); // still inside user flow if user just tapped; otherwise the context is already running so this should be allowed
      } catch {}

      // Fade back up
      const after = now + SWAP_FADE_SEC / 2 + 0.01;
      deckGain.gain.setValueAtTime(dip, after);
      deckGain.gain.linearRampToValueAtTime(current, after + SWAP_FADE_SEC / 2);
    },
    [ensureCtx],
  );

  // Track selection handlers
  const handleChangeLeft = useCallback(
    (src: string) => {
      setLeftSel(src);
      if (!started) return;
      swapDeck("L", src);
    },
    [started, swapDeck],
  );

  const handleChangeRight = useCallback(
    (src: string) => {
      setRightSel(src);
      if (!started) return;
      swapDeck("R", src);
    },
    [started, swapDeck],
  );

  // Slider handlers (quantized)
  const onSliderChangeQuantized = useCallback(
    async (val: number) => {
      setXfUi(val);
      await ensureCtx();
      const q = quantize(val);
      if (q !== xfAudio) {
        rampToXf(q, XFADE_STEP_RAMP_SEC);
        setXfAudio(q);
        onShowNext?.(q === 1);
      }
    },
    [ensureCtx, rampToXf, xfAudio, onShowNext],
  );

  // Poke context to keep it alive during interactions (helps iOS)
  const pokeCtx = useCallback(() => {
    ensureCtx().catch(() => {});
  }, [ensureCtx]);

  // Cleanup
  useEffect(() => {
    return () => {
      try {
        aLeftRef.current?.pause();
        aRightRef.current?.pause();
      } catch {}
      try {
        deckLGainRef.current?.disconnect();
        deckRGainRef.current?.disconnect();
      } catch {}
      try {
        keepGainRef.current?.disconnect();
      } catch {}
      try {
        audioCtxRef.current?.close();
      } catch {}
    };
  }, []);

  return (
    <div onPointerDown={pokeCtx} onKeyDown={pokeCtx}>
      {/* Controls */}
      <Card
        customClass={styles.controlsBox}
        gap={1}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        backgroundColor={0}
        size={0}
      >
        <FlexBox
          customClass={styles.SelectionBox}
          gap={1}
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          flexWrap="nowrap"
        >
          <Card backgroundColor={3} gap={1} size={2}>
            <Text color={2}>Deck 1</Text>
            {songOptions.map((opt) => (
              <Card
                key={opt.src}
                size={2}
                onClick={() => handleChangeLeft(opt.src)}
                backgroundColor={opt.src === leftSel ? 3 : 1}
                borderColor={5}
                borderWidth={1}
                dropShadow={5}
              >
                <Text color={opt.src === leftSel ? 2 : 5}>{opt.label}</Text>
              </Card>
            ))}
          </Card>

          <Card backgroundColor={3} gap={1} size={2}>
            <Text color={2}>Deck 2</Text>
            {songOptions.map((opt) => (
              <Card
                key={opt.src}
                size={2}
                onClick={() => handleChangeRight(opt.src)}
                backgroundColor={opt.src === rightSel ? 3 : 1}
                borderColor={5}
                borderWidth={1}
                dropShadow={5}
              >
                <Text color={opt.src === rightSel ? 2 : 5}>{opt.label}</Text>
              </Card>
            ))}
          </Card>
        </FlexBox>

        {!started ? (
          <Card
            onClick={startAll}
            backgroundColor={1}
            borderColor={5}
            borderWidth={2}
            dropShadow={5}
          >
            <Text>▶ Play</Text>
          </Card>
        ) : (
          <div />
        )}

        {started && (
          <FlexBox
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            gap={2}
          >
            <Card backgroundColor={3} borderColor={3} borderWidth={2}>
              <Text color={2}>Fade The Music {xfUi.toFixed(2)}</Text>
              <Gutter size={3} />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={xfUi}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  if (!Number.isFinite(v)) return;
                  onSliderChangeQuantized(v);
                }}
                className={styles.slider}
                aria-label="Crossfader"
              />
            </Card>
            {showNext && (
              <Link href="/djTwo">
                <Card dropShadow={1} backgroundColor={1} size={5} radius={3}>
                  <Text size={5}>Finish Set</Text>
                </Card>
              </Link>
            )}
          </FlexBox>
        )}
      </Card>
    </div>
  );
}
