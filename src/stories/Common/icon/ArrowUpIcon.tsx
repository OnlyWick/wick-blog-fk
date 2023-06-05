export default function ArrowUpIcon({ size = 28 }: { size?: number }) {
  console.log(size, 123);
  return (
    <svg fill="currentColor" width={size} height={size} viewBox="0 0 36 36">
      <path d="M2 25h32L18 9 2 25Z"></path>
    </svg>
  );
}
