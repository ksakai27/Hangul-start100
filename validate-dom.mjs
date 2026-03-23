import {
  BASIC_VOWELS,
  COMBINED_VOWELS,
  BASIC_CONSONANTS,
  EXTRA_CONSONANTS,
  CHOSEONG_ORDER,
  JUNGSEONG_ORDER,
  PHRASES,
  PHRASE_CATEGORIES,
} from "../docs/data.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function composeSyllable(initial, vowel) {
  const initialIndex = CHOSEONG_ORDER.indexOf(initial);
  const vowelIndex = JUNGSEONG_ORDER.indexOf(vowel);
  assert(initialIndex >= 0, `Unknown initial: ${initial}`);
  assert(vowelIndex >= 0, `Unknown vowel: ${vowel}`);
  const codePoint = 0xac00 + initialIndex * 21 * 28 + vowelIndex * 28;
  return String.fromCodePoint(codePoint);
}

const letters = [...BASIC_VOWELS, ...COMBINED_VOWELS, ...BASIC_CONSONANTS, ...EXTRA_CONSONANTS];
assert(BASIC_VOWELS.length === 10, `Expected 10 basic vowels, got ${BASIC_VOWELS.length}`);
assert(COMBINED_VOWELS.length === 11, `Expected 11 combined vowels, got ${COMBINED_VOWELS.length}`);
assert(BASIC_CONSONANTS.length === 14, `Expected 14 basic consonants, got ${BASIC_CONSONANTS.length}`);
assert(EXTRA_CONSONANTS.length === 5, `Expected 5 extra consonants, got ${EXTRA_CONSONANTS.length}`);
assert(letters.length === 40, `Expected 40 total letters, got ${letters.length}`);
assert(new Set(letters.map((item) => item.id)).size === letters.length, "Letter IDs must be unique");
assert(new Set(letters.map((item) => item.symbol)).size === letters.length, "Letter symbols must be unique");
assert(CHOSEONG_ORDER.length === 19, "Choseong count must be 19");
assert(JUNGSEONG_ORDER.length === 21, "Jungseong count must be 21");
assert(composeSyllable("ㅇ", "ㅏ") === "아", "ㅇ + ㅏ should produce 아");
assert(composeSyllable("ㄱ", "ㅏ") === "가", "ㄱ + ㅏ should produce 가");
assert(composeSyllable("ㅎ", "ㅣ") === "히", "ㅎ + ㅣ should produce 히");

assert(PHRASES.length === 100, `Expected 100 phrases, got ${PHRASES.length}`);
assert(new Set(PHRASES.map((phrase) => phrase.id)).size === PHRASES.length, "Phrase IDs must be unique");
assert(new Set(PHRASES.map((phrase) => phrase.hangul)).size === PHRASES.length, "Phrase hangul must be unique");
assert(PHRASE_CATEGORIES.length >= 6, "Expected multiple phrase categories");

for (const phrase of PHRASES) {
  assert(phrase.hangul.trim().length > 0, `Phrase hangul missing for ${phrase.id}`);
  assert(phrase.roman.trim().length > 0, `Phrase roman missing for ${phrase.id}`);
  assert(phrase.kana.trim().length > 0, `Phrase kana missing for ${phrase.id}`);
  assert(phrase.meaning.trim().length > 0, `Phrase meaning missing for ${phrase.id}`);
  assert(PHRASE_CATEGORIES.includes(phrase.category), `Unknown phrase category for ${phrase.id}`);
}

console.log("Validation passed: letters, phrases, and syllable composition look good.");
