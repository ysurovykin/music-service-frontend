export const calculateScrollY = (pageRef: React.RefObject<HTMLDivElement>) => {
  return Math.abs((pageRef?.current?.getBoundingClientRect().top || 0) - (pageRef?.current?.offsetTop || 0));
}