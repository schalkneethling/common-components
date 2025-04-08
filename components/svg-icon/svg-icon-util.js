let svgSprite = null;

export const getIcon = async (name) => {
  if (!svgSprite) {
    const response = await fetch("sprite.svg");
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    svgSprite = doc.querySelector("svg");
  }
  const icon = svgSprite.querySelector(`#icon-${name}`);

  if (!icon) {
    throw new Error(`Icon not found: ${name}`);
  }

  return icon.cloneNode(true);
};
