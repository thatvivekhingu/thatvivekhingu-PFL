/**
 * VIAN Voice AI Engine (Phase 4: Jarvis Voice Interface)
 * Speech-to-Text Recognition & Natural Text-to-Speech Synthesis Integration
 */

type SpeechRecognitionType = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: unknown) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
};

export class VianVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private recognition: SpeechRecognitionType | null = null;
  private isSpeaking = false;
  private isListening = false;

  constructor() {
    if (typeof window !== "undefined") {
      if ("speechSynthesis" in window) {
        this.synth = window.speechSynthesis;
      }

      const SpeechRecognitionConstructor =
        (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionType }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionType }).webkitSpeechRecognition;

      if (SpeechRecognitionConstructor) {
        try {
          this.recognition = new SpeechRecognitionConstructor();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.lang = "en-IN";
        } catch (e) {
          console.warn("Speech recognition initialization warning:", e);
        }
      }
    }
  }

  public isRecognitionSupported(): boolean {
    return this.recognition !== null;
  }

  public isSynthesisSupported(): boolean {
    return this.synth !== null;
  }

  public startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): boolean {
    if (!this.recognition) {
      if (onError) onError("Speech recognition is not supported in this browser.");
      return false;
    }

    try {
      this.stop();

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: unknown) => {
        const recognitionEvent = event as {
          resultIndex: number;
          results: Array<{
            [index: number]: { transcript: string };
            isFinal: boolean;
            length: number;
          }>;
        };

        let transcript = "";
        let isFinal = false;

        for (let i = recognitionEvent.resultIndex; i < recognitionEvent.results.length; ++i) {
          transcript += recognitionEvent.results[i][0].transcript;
          if (recognitionEvent.results[i].isFinal) {
            isFinal = true;
          }
        }

        onResult(transcript, isFinal);
      };

      this.recognition.onerror = (e: unknown) => {
        this.isListening = false;
        const errObj = e as { error?: string };
        if (onError) onError(errObj?.error || "Voice capture error");
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.warn("Speech recognition start warning:", err);
      this.isListening = false;
      if (onError) onError((err as Error).message);
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn("Speech recognition stop warning:", e);
      }
      this.isListening = false;
    }
  }

  public speak(text: string, onEnd?: () => void): void {
    if (!this.synth) return;

    this.stopSpeaking();

    // Strip markdown formatting and tool tags for speech synthesis
    const cleanText = text
      .replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "")
      .replace(/(\*\*|__|\*|_|`|#|>|\[.*?\]\(.*?\))/g, "")
      .replace(/[^\w\s.,!?'"-]/g, "")
      .replace(/\n+/g, " ")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick natural sounding voice if available
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        (v.lang.startsWith("en") || v.lang.startsWith("hi")) &&
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Neural"))
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis warning:", e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.isSpeaking = true;
    this.synth.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public stop(): void {
    this.stopListening();
    this.stopSpeaking();
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }

  public getListeningState(): boolean {
    return this.isListening;
  }
}

