export const videoPaths = [
  '/Weather-background/Cloud.mp4',
  '/Weather-background/Rain.mp4',
  '/Weather-background/Night.mp4',
];

export const preloadVideos = (): Promise<void[]> => {
  const promises = videoPaths.map(
    (path) =>
      new Promise<void>((resolve) => {
        const video = document.createElement('video');
        video.src = path;
        video.preload = 'auto';
        video.oncanplaythrough = () => resolve();
      })
  );
  return Promise.all(promises);
};
