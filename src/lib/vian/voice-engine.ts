/**
 * VIAN Voice AI Engine (Phase 8)
 * Speech-to-Text Recognition & Text-to-Speech Synthesis Integration
 */

export class VianVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, onEnd?: () => void): void {
    if (!this.synth) return;

    this.stop();

    // Strip markdown formatting symbols for speech synthesis
    const cleanText = text
      .replace(/(\*\*|__|\*|_|`|#|>|\[.*?\]\(.*?\))/g, "")
      .replace(/\n+/g, " ")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis warning:", e);
      this.isSpeaking = false;
    };

    this.isSpeaking = true;
    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }
}
