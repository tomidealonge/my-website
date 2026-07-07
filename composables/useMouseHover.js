export function useMouseHover() {
  const increaseCursor = () => {
    document.querySelector(".cursor")?.classList.add("hover-state");
  };

  const decreaseCursor = () => {
    document.querySelector(".cursor")?.classList.remove("hover-state");
  };

  return { increaseCursor, decreaseCursor };
}
