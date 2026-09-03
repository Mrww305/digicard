/**
 * Custom "SplitText" utility — mimics GSAP's SplitText plugin.
 *
 * Parses the text of a node, wraps every individual character in its
 * own inline-block `<span class="char">`, and groups characters into
 * `<span class="word">` wrappers so words never break mid-line.
 * The original string is preserved on the node via `aria-label`
 * (each char span is aria-hidden) so screen readers stay intact.
 */
export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = (el.textContent ?? "").trim();
  el.setAttribute("aria-label", text);

  const chars: HTMLElement[] = [];
  el.textContent = "";

  for (const word of text.split(" ")) {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    wordSpan.setAttribute("aria-hidden", "true");

    for (const ch of word) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      wordSpan.appendChild(span);
      chars.push(span);
    }

    el.appendChild(wordSpan);
    // inter-word space lives outside the nowrap word wrapper
    el.appendChild(document.createTextNode("\u00A0"));
  }

  // drop the trailing nbsp
  if (el.lastChild && el.lastChild.nodeType === Node.TEXT_NODE) {
    el.removeChild(el.lastChild);
  }

  return chars;
}
