import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";
import Confetti from "react-confetti";

const Example = () => {
  return (
    <div className="bg-neutral-200">
      <div
        className="flex h-screen items-center justify-center"
        style={{
          background: "url(/bg.jpg)",
        }}
      >
        <span className="text-6xl font-black uppercase text-black backdrop-blur-lg">
          Welcome to Roshini Chambers
        </span>
        <p className="absolute bottom-10 text-black">Scroll down</p>
      </div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [confettiInView, setConfettiInView] = useState(false);

  const x = useTransform(scrollYProgress, [0, 0.9], ["1%", "-100%"]);
  const x2 = useTransform(scrollYProgress, [0, 0.9], ["-101%", "1%"]);
  const opacity = useTransform(scrollYProgress, [0.87, 1], ["0", "1"]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setConfettiInView(progress >= 0.9 ? true : false);
  });
  return (
    <section ref={targetRef} className="relative h-[5000vh] bg-neutral-200">
      <div className="sticky top-0 flex flex-col items-start gap-4 h-screen overflow-hidden">
        {confettiInView && (
          <Confetti
            className="absolute top-0 left-0"
            recycle={false}
            numberOfPieces={400}
          />
        )}
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center">
          <motion.div
            style={{
              opacity,
            }}
          >
            <div className="w-[60rem] h-[30rem] bg-white rounded-[1rem] flex flex-col justify-center items-center">
              <h1 className="text-5xl">Happy Birthday</h1>
              <h1 className="text-4xl">Roshini</h1>
            </div>
          </motion.div>
        </div>
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex gap-4 ml-[100vw]">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[20rem] w-[30rem] overflow-hidden bg-neutral-900"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/1.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/2.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/3.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/4.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/5.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/7.jpg",
    title: "Title 7",
    id: 7,
  },
  {
    url: "/8.jpg",
    title: "Title 8",
    id: 8,
  },
  {
    url: "/9.jpg",
    title: "Title 9",
    id: 9,
  },
  {
    url: "/10.jpg",
    title: "Title 10",
    id: 10,
  },
];
