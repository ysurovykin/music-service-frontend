export const calculateScrollY = (pageRef: React.RefObject<HTMLDivElement>) => {
  return Math.abs((pageRef?.current?.getBoundingClientRect().top || 0) - (pageRef?.current?.offsetTop || 0));
}

export const calculateIsReachedBottom = (pageRef: React.RefObject<HTMLDivElement>) => {
  if (pageRef?.current?.getBoundingClientRect().bottom) {
    return pageRef.current.getBoundingClientRect().bottom <= window.innerHeight;
  }
  return false;
}

export const getBackground = (color: string = 'rgba(70, 70, 70, 1)') => {
  return `linear-gradient(180deg, ${color}, rgba(33, 33, 33, 1) 200px, rgba(33, 33, 33, 1) 400px)`;
}