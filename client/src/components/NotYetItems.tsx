import type { NotYetProps } from '../types/types';
const NotYetItems = ({ item }: NotYetProps) => {
  return (
    <div className="w-full h-[320px] flex items-center justify-center">
      <h2
        className="font-orbitron uppercase text-2xl sm:text-3xl md:text-4xl font-bold text-center text-cyan-400 tracking-widest
                   [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
      >
        {item}
      </h2>
    </div>
  );
};

export default NotYetItems;
