import {build }from "./app"

const start = async () => {
  const app = build();
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    console.error('Server start error:', err);
    process.exit(1);
  }
};

start();
