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
    <div className="flex flex-col gap-2 bg-neutral-200">
      <div className="flex h-screen items-center justify-center bg-[url(/bg.jpeg)] bg-cover bg-center bg-no-repeat">
        <span className="w-full h-screen text-center content-center text-6xl font-hero uppercase text-neutral-200 backdrop-brightness-75 drop-shadow-2xl backdrop-blur-sm">
          Welcome to Roshini Chambers
        </span>
        <motion.p
          className="absolute bottom-10 text-white text-9xl"
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          &#8964;
        </motion.p>
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
    <section ref={targetRef} className="relative h-[5000vh]">
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
            className="w-full p-4 flex flex-row justify-center items-center gap-4"
            style={{
              opacity,
            }}
          >
            {confettiInView && (
              <div className="w-1/4 flex flex-col justify-center items-end gap-20">
                {quotesLeft.map((quote, idx) => (
                  <Quote
                    key={quote.content}
                    content={quote.content}
                    author={quote.author}
                    idx={idx}
                  />
                ))}
              </div>
            )}
            <div className="w-1/2 h-[30rem] bg-white flex flex-col justify-center items-center wishes-border">
              <h1 className="text-5xl font-wishes">Happy 21st Birthday</h1>
              <h1 className="text-8xl font-name lowercase">
                &#127870;Roshini&#127870;
              </h1>
              <p className="text-4xl">
                &#127866; &#127863; &#127864; &#128166;
              </p>
              <p>&lt;Give me emojis to insert here&gt;</p>
            </div>
            {confettiInView && (
              <div className="w-1/4 flex flex-col justify-center items-start gap-20">
                {quotesRight.map((quote, idx) => (
                  <Quote
                    key={quote.content}
                    content={quote.content}
                    author={quote.author}
                    idx={idx}
                  />
                ))}
              </div>
            )}
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

const Quote = ({ content, author, idx }: QuoteType & { idx: number }) => {
  return (
    <motion.div
      className="p-4 w-full text-xl font-quote"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        delay: idx * 0.2 + 0.5,
      }}
    >
      <p>{content}</p>
      <p className="text-right">~&nbsp;{author}</p>
    </motion.div>
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
        <p className="text-6xl font-black uppercase text-white">{card.title}</p>
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

type QuoteType = {
  content: string;
  author: string;
};

const cards: CardType[] = [
  {
    url: "/1.jpg",
    title: "Suggest",
    id: 1,
  },
  {
    url: "/2.jpg",
    title: "me",
    id: 2,
  },
  {
    url: "/3.jpg",
    title: "words",
    id: 3,
  },
  {
    url: "/4.jpg",
    title: "words",
    id: 4,
  },
  {
    url: "/5.jpg",
    title: "that",
    id: 5,
  },
  {
    url: "/6.jpg",
    title: "describe",
    id: 6,
  },
  {
    url: "/7.jpg",
    title: "her",
    id: 7,
  },
  {
    url: "/8.jpg",
    title: "and",
    id: 8,
  },
  {
    url: "/9.jpg",
    title: "send",
    id: 9,
  },
  {
    url: "/10.jpg",
    title: "quirky",
    id: 10,
  },
  {
    url: "/11.jpg",
    title: "pics",
    id: 11,
  },
];

const quotesLeft: QuoteType[] = [
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
];

const quotesRight: QuoteType[] = [
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
  {
    content: "<Give me a quote to insert here>",
    author: "Author",
  },
];
