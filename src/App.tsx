import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Confetti from "react-confetti";

const Example = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenTooSmall(window.innerWidth < 1200 || window.innerHeight < 900);
    };

    // Check initially
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const imageUrls = ["/bg.jpeg", ...cards.map((card) => card.url)];

    const preloadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    const preloadAssets = async () => {
      try {
        await Promise.all(imageUrls.map(preloadImage));
        await document.fonts.ready;
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  if (isScreenTooSmall) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-neutral-900 p-4">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-2">Screen Too Small</h2>
          <p>Please use a device with minimum screen size of 1200x900 pixels</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-neutral-900">
        <motion.div
          className="text-white text-2xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

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
      <div className="sticky top-0 bg-pattern flex flex-col items-start gap-4 h-screen overflow-hidden">
        {confettiInView && (
          <Confetti
            className="absolute top-0 left-0"
            recycle={false}
            numberOfPieces={400}
          />
        )}
        <BirthdayWishes confettiInView={confettiInView} opacity={opacity} />
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

const BirthdayWishes = ({
  confettiInView,
  opacity,
}: {
  confettiInView: boolean;
  opacity: MotionValue;
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center">
      <motion.div
        className="w-full p-4 flex flex-col md:flex-row justify-center items-center gap-4"
        style={{ opacity }}
      >
        {confettiInView && (
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center md:items-end gap-10 md:gap-20">
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
        <div className="w-full md:w-1/2 h-[30rem] bg-white flex flex-col justify-center items-center wishes-border px-4">
          <h1 className="text-3xl md:text-5xl font-wishes text-center">
            Happy 21st Birthday
          </h1>
          <h1 className="text-5xl md:text-7xl font-name lowercase text-center whitespace-nowrap">
            <span className="text-7xl">&#127870;</span>
            <span className="text-7xl">roshini</span>
            <span className="text-7xl">&#127870;</span>
          </h1>
          <p className="text-2xl md:text-4xl">
            &#127866; &#127863; &#127864; &#128166; &#9749;
          </p>
        </div>
        {confettiInView && (
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center md:items-start gap-10 md:gap-20">
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
      {confettiInView && (
        <div className="absolute bottom-4 flex flex-col items-center gap-2">
          <a
            href="https://github.com/sujay1844/roshinichambers"
            target="_blank"
            className="text-blue-500 hover:underline flex items-center gap-1"
          >
            <span>GitHub</span>
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
      <p className="text-xs text-gray-600">
        &copy; 2024 Sujay R. All rights reserved
      </p>
        </div>
      )}
    </div>
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
      className="group relative h-[32vh] w-[30rem] overflow-hidden bg-neutral-900"
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
        <p className="text-6xl font-black uppercase text-white drop-shadow-xl">
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

type QuoteType = {
  content: string;
  author: string;
};

const cards: CardType[] = [
  {
    url: "/1.webp",
    title: "mayo",
    id: 1,
  },
  {
    url: "/2.jpeg",
    title: "niggi",
    id: 2,
  },
  {
    url: "/3.webp",
    title: "monkey",
    id: 3,
  },
  {
    url: "/4.jpeg",
    title: "they/them",
    id: 4,
  },
  {
    url: "/5.jpeg",
    title: "quirky",
    id: 5,
  },
  {
    url: "/6.webp",
    title: "weeb",
    id: 6,
  },
  {
    url: "/7.webp",
    title: "gay",
    id: 7,
  },
  {
    url: "/8.jpeg",
    title: "3rd wheel",
    id: 8,
  },
  {
    url: "/9.png",
    title: "nagarbhavi",
    id: 9,
  },
  {
    url: "/10.jpg",
    title: "grasshopper",
    id: 10,
  },
  {
    url: "/11.png",
    title: "roshini",
    id: 11,
  },
];

const quotesLeft: QuoteType[] = [
  {
    content: "She likes big black women",
    author: "Dakshath",
  },
  {
    content: "She is badly into threesome",
    author: "Geethz",
  },
  {
    content: "Our insta feeds are fucked",
    author: "Vanshika",
  },
  {
    content: "Full time 3rd wheeler",
    author: "Varshini",
  },
  {
    content: "Still considering starbucks date <3",
    author: "Kinera",
  },
];

const quotesRight: QuoteType[] = [
  {
    content: "Get a better helmet",
    author: "Shreya MP",
  },
  {
    content: "Buy me cold coffee",
    author: "Bhanuprabhas",
  },
  {
    content:
      "I will buy you a girl with your requirements (as described by yash)",
    author: "Torke",
  },
  {
    content: "Weeb who worships big boobs",
    author: "Yash nigga bar",
  },
  {
    content: "Get another girl, leave mine alone",
    author: "Sujay",
  },
];
