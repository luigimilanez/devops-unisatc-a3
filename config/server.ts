export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    //keys: env.array('APP_KEYS'),
    keys: ["ImJMpHjnCdJw4ii7jZzCXQ==","Jg239VoMach6Fh2LAH6ydA==","LAdmPTwE8oqyVjAV4pCkBQ==","f1gPGngKmE5xhyDktSpCVw=="]
  },
});
