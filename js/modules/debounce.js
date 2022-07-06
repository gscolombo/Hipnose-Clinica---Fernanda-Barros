export default function debounce(f, wait) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(f, wait);
  };
}
